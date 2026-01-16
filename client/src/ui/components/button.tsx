import { type ReactNode } from "react"


interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string,
    startIcon?: ReactNode,
    endIcon?: ReactNode,
    variant: "primary" | "selected" | "unselected" | "none",
    className?: string
}

const defaultStyle = "p-2 w-full rounded-md border border-transparent transition-all duration-150 ease-in group flex justify-center items-center gap-2 hover:cursor-pointer"

const variantStyle = {
    primary: "bg-blue-400 text-white hover:border-white",
    selected: "bg-slate-800 text-zinc-100 hover:border-white ",
    unselected: "bg-white text-slate-800 hover:border-slate-800 ",
    none: ""
}

const Button = ({ text, startIcon, endIcon, variant, className, onClick, ...props }: ButtonProps) => {
    return <button
        type={onClick ? "button" : "submit"}
        onClick={onClick}
        className={className ? className : `${defaultStyle} ${variantStyle[variant]}`}
        {...props}
    >
        {startIcon} {text} {endIcon}

    </button>
}

export { Button }

