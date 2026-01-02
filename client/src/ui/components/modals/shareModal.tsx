import type { SetStateAction } from "react"
import { Close, Clipboard, Tick } from "../../icons"
import { Button } from "../button"
import useCopyToClipBoard from "../../../hooks/useCopyToClipBoard"
import QRCode from "react-qr-code"

export const ShareModal = (
    {
        sharingEnabled,
        handleSharing,
        hash
    }:
        {
            sharingEnabled: boolean,
            handleSharing: React.Dispatch<SetStateAction<boolean>>
            hash: string,

        }) => {

    const textToCopy = window.location.href + hash

    const { isCopied, copy } = useCopyToClipBoard();


    return <>
        {
            sharingEnabled
            &&
            <>
                <div className="bg-white/50 w-full h-dvh absolute z-10 animate-appear flex justify-center">
                    <div className="w-100 bg-amber-200 h-min p-4 rounded-md mt-6 flex flex-col gap-4">
                        <div className="flex w-full justify-between items-center">
                            <p className="text-lg leading-none">Your collection is now sharable!</p>

                            <div>
                                <Button className="p-0 hover:cursor-pointer" onClick={() => handleSharing(false)} variant="none" startIcon={<Close className="size-4" />} />
                            </div>
                        </div>
                        <p className="font-medium">Here's a link your collection:</p>
                        <div className="border  rounded-md flex justify-between items-center bg-amber-300">
                            <p className="p-2">{textToCopy}</p>
                            <div className="border-l p-2">
                                <Button onClick={() => copy(textToCopy)} variant="none" className="p-0 hover:cursor-pointer" startIcon={isCopied ? <Tick className="size-4 animate-appear" /> : <Clipboard className="size-4 animate-appear" />} />
                            </div>

                        </div>
                        <p className="font-medium">Here's a QR code for the same:</p>
                        <div className="w-full flex justify-center">
                            <QRCode className="size-30" value={textToCopy} />
                        </div>
                    </div>
                </div>
            </>
        }
    </>
}

