import { useState } from "react";
import { Button } from "../components/button";
import useContent from "../../context";
import { ShareModal } from "../components/modals/shareModal";
import { Close, Plus, Share } from "../icons";
import { CreateModal } from "../components/modals/createModal";
import { Card } from "../components/card";


export default function Dashboard() {
    const [displayShareModal, setDisplayShareModal] = useState<boolean>(false)
    const [displayCreateModal, setDisplayCreateModal] = useState<boolean>(false)


    const handleShareClick = () => setDisplayShareModal(true)



    const handleCreateClick = () => setDisplayCreateModal(true)

    const { state, dispatch } = useContent()




    return <div className="w-full h-dvh overflow-clip  bg-black flex flex-col relative">
        <ShareModal hash="aakak" sharingEnabled={displayShareModal} handleSharing={setDisplayShareModal} />


        {displayCreateModal && <CreateModal setIsVisble={setDisplayCreateModal} />}

        <div className="border-b  bg-black w-full border-b-white  text-white py-6 items-center px-8 flex justify-between ">
            <h1>Username's Collection</h1>
            <div className="flex gap-4">
                <input type="text" className="bg-white rounded-md text-black px-4 outline-0 " placeholder="Search using AI" />
                <Button text="Search" variant="unselected"></Button>
            </div>
            <div className="flex gap-4" >
                <Button onClick={handleCreateClick} text="Create" variant="selected" startIcon={<Plus className="size-4" />} ></Button>
                <Button onClick={handleShareClick} text="Share" variant="unselected" startIcon={<Share className="size-4" />}></Button>
            </div>
        </div>
        <div className="w-full px-6 pt-4">
            {
                state.displayButton ?
                <Button variant="none"
                    onClick={()=>dispatch({type:"Select None"})}
                    className="bg-gray-100 flex items-center p-2 rounded-md w-min gap-4"
                    text={state.displayContent}
                    endIcon={
                        <Close className="size-3 hover:cursor-pointer" />
                    }
                />:
                <div className="w-full h-10"></div>
            }
        </div>
        <div className="overflow-clip h-dvh px-6 py-4 " >
            <div className="w-full h-dvh py-2 bg-gray-300  grid overflow-auto  [&::-webkit-scrollbar]:w-0 grid-cols-4  ">
                <Card title="123456789123456789" link="https://www.youtube.com/watch?v=kQRuFQ9Qqps" description="cats are awesome anajaja ajaajaja  aaaajisjkcnsncfvhbkmm,dib b bdbdobd mcxcvn" type="Youtube" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />
                <Card title="ahahaha aaaajajah" link="https://x.com/mannupaaji/status/2007848270215938257" description="aajajaaanan" type="Twitter" />

            </div>

        </div>

    </div>
}