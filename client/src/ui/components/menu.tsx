import { useContent, useUser } from "../../context";
import { Close, Logout, Share, Twitter, User, YouTube } from "../icons";
import { Button } from "./button";

export default function Menu({ setDisplayMenu }: { setDisplayMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { dispatch } = useContent()
    const handleClick = (media: string) => {
        setDisplayMenu(false)
        switch (media) {
            case "Twitter":
                dispatch({ type: "Select Twitter" })
                break;
            case "Youtube":
                dispatch({ type: "Select Youtube" })
                break;
        }
    }

    const { user } = useUser()
    return <div className="w-dvw absolute z-10 text-white bg-black/90 backdrop-blur-xl h-dvh md:hidden">
        <div className="h-full w-full flex flex-col  pt-5 pb-10 px-8">
            <div className="w-full  flex justify-between">
                <div className="flex items-center gap-2">
                    <Share className="size-8" />
                    <p>MediaShare</p>
                </div>
                <Button onClick={() => setDisplayMenu(false)} className="w-fit" variant="none" startIcon={<Close className="size-6" />} />
            </div>
            <div className="flex flex-col gap-6 mt-20 pl-2">
                <Button onClick={()=>handleClick("Twitter")} className="w-fit flex gap-4 items-center text-sm " variant="none" startIcon={<Twitter className="size-5" />} text="X (Twitter)" />
                <Button onClick={()=>handleClick("Youtube")} className="w-fit flex gap-4 items-center text-sm" variant="none" startIcon={<YouTube className="size-6" />} text="Youtube" />
            </div>
            <div className="flex items-center mt-auto justify-between">
                <div className="flex items-center gap-2">
                    <User className="size-6" />
                    <p>{user?.username}</p>
                </div>
                <Button variant="none" className="w-fit" startIcon={<Logout className="size-4" />} />

            </div>
        </div>
    </div>
}