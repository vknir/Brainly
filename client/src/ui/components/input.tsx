import { useState } from "react"

import { type UseFormRegister } from "react-hook-form"
import { Eye, EyeSlash } from "../icons"

interface IFormValues {
    "username": string,
    "password": string,
    "Confirm Password": string
}


interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    type: string,
    error?: string,
    inputName: "username" | "password" | "Confirm Password",
    register: UseFormRegister<IFormValues>,
    watch?: string,
    required: boolean
}

const Input = ({ className, inputName, type, register, watch, required, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState<Boolean>(false)

    const handleClick = () => {
        setShowPassword(prev => !prev)
    }

    const defaultStyle = "w-full  bg-white p-1 flex justify-between items-center rounded-md border-transparent "

    return type === "password" ?
        <div className={`${defaultStyle} ${className}`}>
            <input
                className="outline-0 bg-white"
                placeholder={inputName}
                type={showPassword ? "text" : "password"}
                {...register(inputName, {
                    required: required,
                    validate: (val: string) => {
                        if (watch != undefined && watch != val)
                            return "Passwords do not match"
                    }
                })}
                {...props}
            />
            <button className="hover:cursor-pointer " onClick={handleClick}>{showPassword ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}</button>
        </div> :
        <div className={`${defaultStyle} ${className}`}>
            <input
                className="outline-0 bg-white"
                placeholder={inputName}
                type={type}
                {...register(inputName, { required:required, validate : (val:string)=>{
                    if( !(/^.{3,11}$/.test(val)) )
                        return "Username should be between 3-11 characters"
                } })}
                {...props}
            >

            </input>
        </div>

}

export { Input }