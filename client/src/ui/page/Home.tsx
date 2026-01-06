
import { Sidebar, type ItemListType } from "../components/sidebar";
import Dashboard from "./Dashboard";

import { Logout, Share, Twitter, User, YouTube } from '../icons/'
import useContent from "../../context";



export default function Home() {

    const { dispatch } = useContent()

    const itemList: ItemListType[] = [
        { startIcon: <Twitter className="size-4" />, label: "Twitter", handleClick: () => dispatch({ type: "Select Twitter" }) },
        { startIcon: <YouTube className="size-4" />, label: "Youtube", handleClick: () => dispatch({ type: "Select Youtube" }) },
        { startIcon: <User className="size-5" />, username: "Username", endIcon: <Logout className="size-4 animate-appear hover:translate-x-1 transition-all duration-100 ease-in " />, style: "mt-auto" }
    ]




    return <div className="w-full h-full flex overflow-clip">
        <Sidebar brandName="MediaShare" logo={<Share className="size-8" />} itemList={itemList} />
        <Dashboard />
    </div>
}