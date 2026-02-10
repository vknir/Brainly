
import { Sidebar, type ItemListType } from "../components/sidebar";
import Dashboard from "./Dashboard";

import { Logout, Share, Twitter, User, YouTube } from '../icons/'
import { useUser, useContent } from "../../context";
import { useNavigate } from "react-router";



export default function Home() {
    const { user } = useUser();

    const { dispatch } = useContent()
    const navigate = useNavigate()
    const itemList: ItemListType[] = [
        {
            startIcon:
                <Twitter className="size-4" />,
            label: "Twitter",
            handleClick: () => dispatch({ type: "Select Twitter" })
        },
        {
            startIcon:
                <YouTube className="size-4" />,
            label: "Youtube",
            handleClick: () => dispatch({ type: "Select Youtube" })
        },
        {
            startIcon:
                <User className="size-5" />,
            username: user?.username, endIcon:
                <Logout

                    className="size-4 animate-appear hover:translate-x-1 transition-all duration-100 ease-in " />,
            style: "mt-auto",
            handleButtonClick: () => {
                localStorage.removeItem("token")
                localStorage.removeItem("hash")
                navigate("/")
            }

        }
    ]




    return <div className="w-full h-full flex overflow-clip">
        <Sidebar brandName="MediaShare" logo={<Share className="size-8" />} itemList={itemList} />
        <Dashboard />
    </div>
}