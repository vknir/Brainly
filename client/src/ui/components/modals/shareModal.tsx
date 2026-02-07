import type { SetStateAction } from "react"
import { Close, Clipboard, Tick } from "../../icons"
import { Button } from "../button"
import useCopyToClipBoard from "../../../hooks/useCopyToClipBoard"
import QRCode from "react-qr-code"

export const ShareModal = ({ setIsVisible }:
    {
        setIsVisible: React.Dispatch<SetStateAction<boolean>>
    }) => {

    const textToCopy = window.location.href

    // const { isCopied, copy } = useCopyToClipBoard();


    return <>
        {

            <>
                <div className="bg-white/50 w-full h-dvh absolute z-10 animate-appear flex justify-center">
                    <div className="w-100 bg-amber-200 h-min p-4 rounded-md mt-6 flex flex-col gap-4">
                       
                            
                    </div>
                </div>
            </>
        }
    </>
}

