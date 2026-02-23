import axios, { isAxiosError } from "axios";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { Share } from "../icons";
import { useForm, type SubmitHandler } from "react-hook-form";
import { apiRoute } from "../../utils/api";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Notification } from "../components/notification";
import { useUser } from "../../context";

interface Input {
    "username": string,
    "password": string,
    "Confirm Password": string,
}

export default function Login() {

    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Input>()

    const navigate = useNavigate()

    const [notificationText, setNotificationText] = useState<string>('')
    const [isNotifiactionVisible, setIsNotificationVisible] = useState<boolean>(false)
    const {setUser} = useUser()


    const onSubmit: SubmitHandler<Input> = async (data) => {
        const {username, password} = data

        try {
            const response = await axios.post(apiRoute.login, { username, password }, {headers : { "Content-Type": "application/json"}})
            const data = response.data
            setNotificationText(data.message)
            localStorage.setItem("token", data.token)
            localStorage.setItem("user", data.user.username)
            localStorage.setItem("_id", data.user._id)
            setIsNotificationVisible(true)
            setUser(data.user)
            navigate("/home")

        } catch (e) {

            if (isAxiosError(e) && e.response) {

                setNotificationText(e.response.data.message);
                setIsNotificationVisible(true)
            }
        }

    }
    

    return <div className="bg-black text-white relative overflow-clip h-dvh w-dvw">
        <div className="p-2 h-full w-full gap-5 flex flex-col justify-center items-center ">
            <div className="flex justify-center gap-2 mb-5 ">
                <Share className="size-8" />
                <p className="text-xl font-medium">MediaShare</p>
            </div>
            <p className="text-2xl">Welcome Back!</p>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full px-6 grid grid-cols-1 gap-5 max-w-100" >
                <Input inputName="username" type="text" required={true} className={`text-black py-2 px-4`} register={register} />
                <Input inputName="password" type="password" required={true} className={`text-black py-2 px-4`} register={register} />
                <Button type="submit" showLoading={isSubmitting} variant="primary" text="Log In" />
            </form>
            <p className="text-sm">Don't have an account yet? <a className="underline text-blue-400" href="/signup">Sign up</a></p>
        </div>

        {isNotifiactionVisible && <Notification text={notificationText} setIsVisble={setIsNotificationVisible} />}
    </div>
}

