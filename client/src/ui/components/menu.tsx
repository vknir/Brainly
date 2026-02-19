import { useUser } from "../../context";
import { Close, Logout, Share, User } from "../icons";
import { Button } from "./button";

export default function Menu() {

    const { user } = useUser()
    return <div className="w-dvw absolute text-white h-dvh md:hidden">
        <div className="h-full w-full flex flex-col justify-between pt-4 pb-10 px-8">
            <div className="w-full  flex justify-between">
                <div className="flex items-center gap-2"> 
                    <Share className="size-10" />
                    <p>MediaShare</p>
                </div>
                <Button className="w-fit" variant="none" startIcon={<Close className="size-6"/>}/>
            </div>
            <div></div>
            <div className="flex items-center">
                <User className="size-4" />
                <p>{user?.username}</p>
                <Logout className="size-4" />
            </div>
        </div>
    </div>
}