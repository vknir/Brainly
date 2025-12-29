import {  type ReactNode } from "react"


interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    startIcon?: ReactNode,
    variant: "primary" | "selected" | "unselected" | "none"
}

const defaultStyle = "p-2 w-full rounded-md border border-transparent transition-all duration-150 ease-in group flex justify-center items-center gap-4 hover:cursor-pointer"

const variantStyle = {
    primary: "bg-blue-400 text-white",
    selected: "bg-slate-800 text-zinc-100 hover:border-white ",
    unselected: "bg-white text-slate-800 hover:border-slate-800 ",
    none:""
}

const Button = ({ text, startIcon, variant, onClick,...props }: ButtonProps) => {
    return  <button 
            type={onClick ? "button" : "submit"} 
            onClick={onClick} 
            className={`${defaultStyle} ${variantStyle[variant]}`} 
            {...props}
            >
                {startIcon} {text}
            
            </button>
}

export { Button }

