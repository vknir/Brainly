import { useEffect, useState, type ReactNode } from "react";
import { useUser } from "../../context";
import { useNavigate } from "react-router";
import { axiosClient } from "../../api/axiosClient";


export default function Protected({ children }: { children: ReactNode }) {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { user, setUser, setContent } = useUser()
    const navigate = useNavigate();

    useEffect(() => {

        if (user === null) {
            const username = localStorage.getItem("user")
            const _id = localStorage.getItem("_id")
            if (username && _id)
                setUser({ username, _id })
            else
                alert("User data unavailable, login again")

        }

        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/")
        }


        const fetchWithRetry = async (timeOutDuration: number = 5000) => {
            const controller = new AbortController();
            const timeOutRefernce = setTimeout(() => {
                controller.abort();
                fetchWithRetry()
            }, timeOutDuration)

            try {
                const response = await axiosClient.get('/content', {
                    signal: controller.signal
                })

                setIsLoading(false)
                setContent(response.data.content)
                clearTimeout(timeOutRefernce)
            } catch (e) {
                console.log(e)
            }

        }

        fetchWithRetry()



    }, [])
    if (isLoading)
        return <div className="h-dvh w-dvw bg-amber-400"></div>

    return <>
        {children}
    </>
}