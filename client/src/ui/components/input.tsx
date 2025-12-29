import { useState } from "react"
import Eye from "../icons/eye"
import EyeSlash from "../icons/eyeslash"
import { type UseFormRegister } from "react-hook-form"

interface IFormValues {
    "Username": string,
    "Password": string,
}


interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string,
    error?: string,
    inputName: "Username" | "Password",
    register: UseFormRegister<IFormValues>,
    required: boolean
}

const Input = ({ className, inputName, type, register, required, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState<Boolean>(false)

    const handleClick = () => {
        setShowPassword(prev => !prev)
    }

    const defaultStyle = "w-full border-md bg-white p-1 flex justify-between items-center rounded-md hover:cursor-pointer"

    return type === "password" ?
        <div className={`${defaultStyle} ${className}`}>
            <input
                className="outline-0"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register(inputName, { required })}
                {...props}
            />
            <button className="hover:cursor-pointer" onClick={handleClick}>{showPassword ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}</button>
        </div> :
        <div className={`${defaultStyle} ${className}`}>
            <input
                className="outline-0"
                placeholder={inputName}
                type={type}
                {...register(inputName, { required })}
                {...props}
            >

            </input>
        </div>

}

export { Input }