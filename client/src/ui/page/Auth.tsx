import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios from "axios";


export default function Auth() {

    interface IFormValues {
        "username": string,
        "password": string,
        "Confirm Password": string
    }


    const [variant, setVariant] = useState<boolean>(true)
    // variant --> true --> LogIn
    // variant --> false --> SignUp


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormValues>()


    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        const { username, password } = data
        const response = await axios.post('http://localhost:3000/api/v1/login', {
            username, password
        })
        console.log(response)
    }

    const watchResult = watch("password")

    return <>
        <div className="h-full w-full bg-slate-200 flex flex-col justify-center items-center p-10">
            <div className="w-100 flex flex-col gap-8">
                <div className="w-full flex gap-4">
                    <Button onClick={() => setVariant(true)} variant={variant ? "selected" : "unselected"} text="Log In" />
                    <Button onClick={() => setVariant(false)} variant={variant ? "unselected" : "selected"} text="Sign Up" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" >
                    <Input className="py-2 px-4" type="text" inputName="username" required={true} register={register} />


                    <Input className="py-2 px-4" type="password" inputName="password" required={true} register={register} />

                    {variant ? <></> : <Input watch={watchResult} className={`py-2 px-4  ${errors["Confirm Password"] ? " border-red-500  " : ""} `} type="password" inputName="Confirm Password" required={true} register={register} />}
                    <Button variant="primary" text="Submit" />
                </form>
                <div >
                    <p className={`${errors.username ?
                        "opacity-100 animate-appear text-red-500 " :
                        "opacity-0 "}`} >
                        Username should be between 3-11 characters.
                    </p>
                    {
                        !variant &&
                        <p className={`${errors["Confirm Password"] ?
                            "opacity-100 animate-appear text-red-500 " :
                            "opacity-0"}`}>
                            Your passwords do not match.
                        </p>
                    }
                </div>

            </div>
        </div>
    </>
}