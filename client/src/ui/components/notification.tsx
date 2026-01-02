import { useEffect } from "react"

export const Notification = (
    {
        text,

        setIsVisble
    }
        :
        {
            text: string,

            setIsVisble: React.Dispatch<React.SetStateAction<boolean>>
        }) => {
    useEffect(() => {
        const timeOutRef = setTimeout(() => {
            setIsVisble(false)
        }, 2000)

        return () => clearTimeout(timeOutRef)
    }, [])



    return <p className="absolute z-50 bg-white py-2 px-4 rounded-md bottom-8 right-4 animate-slide ">{text}</p>
}