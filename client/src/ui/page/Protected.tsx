import { useEffect, useState, type ReactNode } from "react";
import { apiRoute } from "../../utils/api";
import axios from "axios";
import { useUser } from "../../context";

export default function Protected({ children }: { children: ReactNode }) {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { user, setUser, setContent } = useUser()

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
        const response = async () => {
            return await axios.get(apiRoute.content, {
                headers: {
                    Authorization: token
                }
            }).then((data) => {
                setContent(data.data.content)
                setIsLoading(false)
            }
            ).catch(e => console.log(e))
        }
        response()
    }, [])
    if (isLoading)
        return <div className="h-dvh w-dvw bg-amber-400"></div>

    return <>
        {children}
    </>
}