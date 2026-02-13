import { useEffect, useState } from "react"
import { axiosClient } from "../../api/axiosClient"
import { useNavigate, useParams } from "react-router"
import { Sidebar, type ItemListType } from "../components/sidebar"
import { useContent, useUser } from "../../context"
import { Logout, Share, Twitter, User, YouTube } from "../icons"
import Dashboard from "./Dashboard"


interface Content {
    title: string,
    description: string,
    tags?: string[],
    link: string,
    type: "Youtube" | "Twitter",
    _id: string,
    userId: string
}


export default function SharedDashboard() {
    const params = useParams()
    const { user } = useUser();
    const [sharedContent, setShareContent] = useState<Content []| null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchDataWithRetry = async (timeout: number = 5000) => {

            if (params.hash) {

                const controller = new AbortController()
                const timeoutRef = setTimeout(() => {
                    controller.abort()
                    fetchDataWithRetry()
                }, timeout)



                try {

                    const response = await axiosClient.get(`/content/${params.hash}`, { signal: controller.signal })
                    if (!response)
                        throw "No response found for hash"
                    setUsername(response.data.username)
                    setShareContent(response.data.content)
                    clearTimeout(timeoutRef)
                } catch (e) {
                    console.log(e)
                } finally {
                    setIsLoading(false)
                }

            }
        }
        fetchDataWithRetry()
    }, [])


    const { dispatch } = useContent()
    const navigate = useNavigate()
    const itemList: ItemListType[] = [
        {
            startIcon:
                <Twitter className="size-4" />,
            label: "Twitter",
            handleClick: () => dispatch({ type: "Select Twitter" })
        },
        {
            startIcon:
                <YouTube className="size-4" />,
            label: "Youtube",
            handleClick: () => dispatch({ type: "Select Youtube" })
        },
        {
            startIcon:
                <User className="size-5" />,
            username: user?.username, endIcon:
                <Logout

                    className="size-4 animate-appear hover:translate-x-1 transition-all duration-100 ease-in " />,
            style: "mt-auto",
            handleButtonClick: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("hash")
                navigate("/")
            }

        }
    ]



    return <>
        <div className="flex">
            <Sidebar brandName="MediaShare" logo={<Share className="size-8" />} itemList={itemList} />
            { username && sharedContent && <Dashboard otherUser={true} otherUsername={username} otherUsersContent={sharedContent} />}
        </div>
    </>
}