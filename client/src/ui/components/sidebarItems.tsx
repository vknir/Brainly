import type { ReactNode } from "react"

interface SidebarItemsProp {
    startIcon: ReactNode,
    visible: boolean,
    label?: string,
    endIcon?: ReactNode,
    style?: string,
    username?: string,
    handleClick?: () => void
}

const defaultStyle = "flex w-full pl-3 items-center gap-5 hover:cursor-pointer w-min"

export const SidebarItems = ({ startIcon, visible, label, endIcon, style, username, handleClick }: SidebarItemsProp) => {
    return <div onClick={handleClick} className={`${defaultStyle} ${style}`}>
        {startIcon}
        {label && visible && <p className="text-sm leading-none animate-appear hover:translate-x-1 transition-all duration-100 ease-in">{label}</p>}
        {username && visible && <p className="text-sm leading-none animate-appear">{username}</p>}
        {visible && endIcon}
    </div>
}