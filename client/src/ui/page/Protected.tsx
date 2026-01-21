import { useEffect, type ReactNode } from "react";
import { apiRoute } from "../../utils/api";
import axios from "axios";

export default function Protected({ children }: { children: ReactNode }) {
    useEffect(() => {
        const token = localStorage.getItem("token")
        const response = async () => {
            return await axios.get(apiRoute.exist, {
                headers: {
                    Authorization: token
                }
            })
        }
        console.log(response)
    }, [])

    return <>
        {children}
    </>
}