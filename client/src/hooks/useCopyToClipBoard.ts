import { useEffect, useState } from "react";

export default function useCopyToClipBoard(resetDuration: number = 2000) {
    const [isCopied, setIsCopied] = useState<boolean>(false)

    useEffect(() => {
        if (isCopied) {
            const reference = setTimeout(() => {
                setIsCopied(false)
            }, resetDuration)

            return () => clearTimeout(reference)
        }   
    }, [isCopied])


    if (!navigator?.clipboard) {
        alert('Clipboard not found')
    }

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setIsCopied(true)
        } catch (e) {
            console.error(e)
        }
    }

    return { isCopied, copy }
}