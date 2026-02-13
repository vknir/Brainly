import { useEffect, useState, type SetStateAction } from "react"
import { Close, Clipboard, Tick } from "../../icons"
import { Button } from "../button"
import useCopyToClipBoard from "../../../hooks/useCopyToClipBoard"
import QRCode from "react-qr-code"
import { axiosClient } from "../../../api/axiosClient"
import { apiRoute } from "../../../utils/api"

export const ShareModal = ({ setIsVisible }:
    {
        setIsVisible: React.Dispatch<SetStateAction<boolean>>
    }) => {

    const textToCopy = 'http://localhost:5173/share'
    const { isCopied, copy } = useCopyToClipBoard();
    const [loading, setLoading] = useState<boolean>(false)
    const [hash, setHash] = useState<string | null>(null)

    const onClickClose = () => {
        setIsVisible(false)
    }

    const onCopyClick = () => {

        copy(`${textToCopy}/${hash}`)
    }

    const toggleLink = async (share: boolean) => {
        const response = await axiosClient.post('/content/share', { share })
        if (share) {

            setHash(response.data.hash)
            localStorage.setItem("hash", response.data.hash)
        } else {
            setHash(null)
            localStorage.removeItem("hash")
        }
    }

    useEffect(() => {

        const checkHash = localStorage.getItem("hash")
        if (checkHash) {
            setHash(checkHash)
        }

        const fetchShareDetails = async () => {
            if (hash === null) {
                const contoller = new AbortController()
                const timeoutRef = setTimeout(() => {
                    contoller.abort()
                    fetchShareDetails()
                }, 3000)


                try {
                    const response = await axiosClient.get('/content/share', { signal: contoller.signal })
                    if (response.data.status) {
                        setHash(response.data.hash)
                        localStorage.setItem("hash", response.data.hash)
                    }

                    clearTimeout(timeoutRef)
                } catch (e) {
                    console.log(e)
                }
            }

        }
        fetchShareDetails()
    }, [])

    return <>
        {

            <>
                <div className="bg-white/50 w-full h-dvh absolute z-10 animate-appear flex justify-center">
                    <div className="w-100 bg-amber-200 h-min p-4 rounded-md mt-6 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <p>Share your content as per your wish</p>
                            <Button variant="none" className="w-fit hover:cursor-pointer"
                                startIcon={<Close className="size-4" />} onClick={() => setIsVisible(false)} />
                        </div>

                        <Button variant="none" showLoading={loading}
                            text={hash === null ? `Get link for your collection` : `Unshare your collection`}
                            onClick={() => toggleLink(hash ? false : true)} />

                        {
                            hash &&
                            <>
                                <div className="w-full py-2 border flex items-center justify-between animate-appear ">
                                    {`${textToCopy}/${hash}`}
                                    <Button variant="none" className="border p-2"
                                        startIcon={isCopied ? <Tick className="size-4" /> : <Clipboard className="size-4" />}
                                        onClick={() => onCopyClick()}
                                    />
                                </div>
                            </>
                        }

                        {hash &&
                            <div className="flex justify-between animate-appear">
                                <div>
                                    <p>
                                        Scan this QR code to reach your collection
                                    </p>
                                </div>
                                <div>
                                    <QRCode size={70} value={`http://localhost/content/${hash}`} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </>
        }
    </>
}

