import { useState } from "react";
import { Button } from "../components/button";
import { Notification } from "../components/notification";
import { ShareModal } from "../components/modals/shareModal";
import { Plus, Share } from "../icons";
import { CreateModal } from "../components/modals/createModal";


export default function Dashboard() {
    const [displayShareModal, setDisplayShareModal] = useState<boolean>(false)
    const [displayUnshareNotification, setDisplayUnshareNotification] = useState<boolean>(false)
    const [displayCreateModal, setDisplayCreateModal] = useState<boolean>(false)

    const handleShareClick = () => setDisplayShareModal(true)

    const handleUnshareClick = () => setDisplayUnshareNotification(true)

    const handleCreateClick = () => setDisplayCreateModal(true)


    return <div className="w-full h-dvh bg-black flex flex-col relative">
        <ShareModal hash="aakak" sharingEnabled={displayShareModal} handleSharing={setDisplayShareModal} />
        
        {displayUnshareNotification && <Notification text="Your content is now private" setIsVisble={setDisplayUnshareNotification} />}
        {displayCreateModal && <CreateModal setIsVisble={setDisplayCreateModal} />}

        <div className="border-b border-b-white w-full text-white py-6 items-center px-8 flex justify-between ">
            <h1>Username's Collection</h1>
            <div className="flex gap-4">
                <input type="text" className="bg-white rounded-md text-black px-2 outline-0 " placeholder="Search using AI" />
                <Button text="Search" variant="unselected"></Button>
            </div>
            <div className="flex gap-4" >
                <Button onClick={handleCreateClick} text="Create" variant="selected" startIcon={<Plus className="size-4" />} ></Button>
                <Button onClick={handleShareClick} text="Share" variant="unselected" startIcon={<Share className="size-4" />}></Button>
                <Button onClick={handleUnshareClick} variant="selected" text="Unshare" />
            </div>
        </div>
        <div></div>
    </div>
}