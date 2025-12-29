
import { useEffect, useState, type ReactNode } from "react"
import { SidebarItems } from "./sidebarItems"
import type { ContentType } from "../../context"

export type ItemListType = {
    startIcon: ReactNode
    label?: ContentType,
    username?: string,
    endIcon?: ReactNode,
    handleClick?: () => void,
    style?: string
}






interface SidebarProps {
    itemList: ItemListType[],
    logo: ReactNode,
    brandName: string,
}

const Sidebar = ({ itemList, logo, brandName }: SidebarProps) => {

    const [open, setOpen] = useState<boolean>(false)
    const [visible, setVisible] = useState<boolean>(false)

    useEffect(() => {
        if (open) {
            const timeoutRef = setTimeout(() => {
                setVisible(true)
            }, 200);

            return () => clearInterval(timeoutRef)
        } else {
            setVisible(false)
        }
    }, [open])

    const mouseEventHandler = () => {
        setOpen(prev => !prev)
    }



    return <div onMouseEnter={mouseEventHandler} onMouseLeave={mouseEventHandler}
        className={`h-dvh group  transition-all duration-150 ease-in p-4 flex flex-col gap-4 ${open ? 'w-1/6' : 'w-20'} `}>
        <div className="flex items-center gap-4 ">
            {logo}
            {visible && <p className="text-2xl animate-appear leading-none  ">{brandName}</p>}
        </div>
        <div className="flex flex-col py-10 w-full gap-6 h-full  ">
            {itemList.map((item, index) =>
                <SidebarItems
                    key={index}
                    startIcon={item.startIcon}
                    label={item.label}
                    visible={visible}
                    endIcon={item.endIcon}
                    style={item.style}
                    username={item.username}
                    handleClick={item.handleClick}
                />)}
        </div>

    </div>
}


export { Sidebar }