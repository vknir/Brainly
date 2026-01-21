import { useState } from "react";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { apiRoute } from "../../utils/api";
import { Notification } from "../components/notification";
import { useAuth } from "../../context";
import { useNavigate } from "react-router";


interface IFormValues {
    "username": string,
    "password": string,
    "Confirm Password": string
}

type Data = {
    message: string,
    token: string,
    user: {
        _id: string,
        username: string
    }
}


const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export default function Auth() {



    

    const [isLogin, setIsLogin] = useState<boolean>(true)
    // isLogin --> true --> LogIn
    // isLogin --> false --> SignUp


    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormValues>()
    const { setUser } = useAuth()
    const [visible, setVisible] = useState<boolean>(false)
    const [notificationText, setNotificationText] = useState<string>("")
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<IFormValues> = async (data) => {

        const { username, password } = data

        try {
            const response = await axios.post(isLogin ? apiRoute.login : apiRoute.signup, { username, password }, config)
            const data = response.data as Data
            setNotificationText(data.message)
            localStorage.setItem("token", data.token)
            setVisible(true)
            setUser(data.user)
            navigate("/home")

        } catch (e) {
            if (isAxiosError(e) && e.response) {
                setNotificationText(e.response.data.message);
                setVisible(true)
            }
        }

    }



    const watchResult = watch("password")

    return <>
        <div className="h-full w-full bg-slate-200 flex flex-col justify-center items-center p-10">
            <div className="w-100 flex flex-col gap-8">
                <div className="w-full flex gap-4">
                    <Button onClick={() => setIsLogin(true)} variant={isLogin ? "selected" : "unselected"} text="Log In" />
                    <Button onClick={() => setIsLogin(false)} variant={isLogin ? "unselected" : "selected"} text="Sign Up" />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" >
                    <Input className="py-2 px-4" type="text" inputName="username" required={true} register={register} />


                    <Input className="py-2 px-4" type="password" inputName="password" required={true} register={register} />

                    {
                        isLogin ?
                            <></>
                            :
                            <Input watch={watchResult}
                                className={`py-2 px-4  ${errors["Confirm Password"] ? " border-red-500  " : ""} `}
                                type="password"
                                inputName="Confirm Password" required={true} register={register}
                            />
                    }

                    <Button variant="primary" text="Submit" />
                </form>
                <div >
                    <p className={`${errors.username ?
                        "opacity-100 animate-appear text-sm text-red-500 " :
                        "hidden "}`} >
                        Username should be between 3-20 characters.
                    </p>
                    {
                        !isLogin &&
                        <div className={errors.password ? "text-red-500 animate-appear text-sm " : "hidden"}>
                            <p >
                                Password must contain atleast one:
                            </p>
                            <ul className="list-disc pl-4">
                                <li>Capital letter</li>
                                <li>Small letter</li>
                                <li>Digit</li>
                                <li>Special character</li>
                                <li>Less than 18 characters</li>
                            </ul>
                        </div>
                    }

                    {
                        !isLogin &&
                        <p className={`${errors["Confirm Password"] ?
                            "opacity-100 animate-appear text-sm text-red-500 " :
                            "hidden"}`}>
                            Your passwords do not match.
                        </p>
                    }
                </div>

            </div>
            {visible && <Notification setIsVisble={setVisible} text={notificationText} />}
        </div>
    </>
}