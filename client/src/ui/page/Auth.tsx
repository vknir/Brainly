import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useForm, type SubmitHandler } from "react-hook-form";


export default function Auth() {

    interface IFormValues {
        "Username": string,
        "Password": string,
        "Confirm Password": string
    }


    const [variant, setVariant] = useState<boolean>(true)

    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormValues>()
    // variant --> true --> LogIn
    // variant --> false --> SignUp

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {
        console.log(data)
    }

    const watchResult = watch("Password")

    return <>
        <div className="h-full w-full bg-slate-200 flex flex-col justify-center items-center p-10">
            <div className="w-100 flex flex-col gap-8">
                <div className="w-full flex gap-4">
                    <Button onClick={() => setVariant(true)} variant={variant ? "selected" : "unselected"} text="Log In" />
                    <Button onClick={() => setVariant(false)} variant={variant ? "unselected" : "selected"} text="Sign Up" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" >
                    <Input className="py-2 px-4" type="text" inputName="Username" required={true} register={register} />


                    <Input className="py-2 px-4" type="password" inputName="Password" required={true} register={register} />

                    {variant ? <></> : <Input watch={watchResult} className={`py-2 px-4  ${errors["Confirm Password"] ? " border-red-500  " : ""} `} type="password" inputName="Confirm Password" required={true} register={register} />}
                    <Button variant="primary" text="Submit" />
                </form>
                <div >
                    <p className={`${errors.Username ?
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