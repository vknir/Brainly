import { useState } from "react"
import { Close } from "../../icons"
import { Button } from "../button"
import { useForm, type SubmitHandler } from "react-hook-form"

export const CreateModal = (
    {
        setIsVisble
    }:
        {
            setIsVisble: React.Dispatch<React.SetStateAction<boolean>>
        }) => {

    type Mode = "auto" | "manual"
    const [mode, setMode] = useState<Mode>("auto")


    type FormFields = {
        title?: string,
        link: string,
        description?: string,
        type: "Youtube" | "Twitter",
        tags?: string[]
    }



    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormFields>()


    const onSubmit: SubmitHandler<FormFields> = (data) => console.log(data)

    const inputStyle = "bg-white p-2 outline-0 rounded-md"

    return <div className="w-full h-dvh absolute z-10 bg-white/50 animate-appear flex justify-center">
        <div className="mt-6 w-150 bg-gray-200 rounded-md p-4 h-min flex flex-col gap-4 translate-all duration-100 ease-in">
            <div className="flex items-center justify-between">
                <p>Add your content</p>
                <div>
                    <Button onClick={() => setIsVisble(false)} startIcon={<Close className="size-4" />} variant="none" />
                </div>

            </div>
            <div className="flex px-8 gap-4">
                <Button onClick={() => setMode("auto")} variant={`${mode === "auto" ? "selected" : "unselected"}`} text="Automatic" />
                <Button onClick={() => setMode("manual")} variant={`${mode === "manual" ? "selected" : "unselected"}`} text="Manual" />
            </div>
            {mode === "auto" ?
                <>
                    <div className="px-8">
                        <p>Adding content automaticaly gets the title and generates description for
                            the content using AI (only available for Youtube and X).</p>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-8 gap-4  text-sm">
                        <label className="leading-none" htmlFor="Link">Link</label>
                        <input className={inputStyle} type="text" id="Link"
                            placeholder="eg. https://www.youtube.com/watch?v=kQRuFQ9Qqps"
                            {...register("link", { required: true })}></input>

                        <label htmlFor="Type">Type of content</label>
                        <select className={inputStyle} name="Type" id="Type"
                            {...register("type")}
                        >
                            <option value="Youtube">Youtube</option>
                            <option value="Twitter">X</option>
                        </select>

                        <label className="leading-none" htmlFor="Tags">Tags</label>
                        <input className={inputStyle} type="text" placeholder="eg. #fun" {...register("tags")} />

                        <Button variant="selected" type="submit" text="Submit" />
                    </form>
                </>
                :
                <>
                    <form className="flex flex-col px-8 gap-4 text-sm" onSubmit={handleSubmit(onSubmit)}>
                        <label className="leading-none" htmlFor="Title">Title</label>
                        <input placeholder="eg. A Video about Cats" className={inputStyle} type="text" id="Title"
                            {...register("title", { required: true })} ></input>

                        <label className="leading-none" htmlFor="Description">Description</label>
                        <textarea placeholder="eg. Cats are awesome" className={inputStyle + " resize-none"} id="Description"
                            {...register("description", { required: true })} ></textarea>

                        <label className="leading-none" htmlFor="Link">Link</label>
                        <input className={inputStyle} type="text" id="Link" placeholder="eg. https://www.youtube.com/watch?v=kQRuFQ9Qqps"
                            {...register("link", { required: true })}></input>

                        <label className="leading-none" htmlFor="Type">Type of content</label>
                        <select className={inputStyle} id="Type" {...register("type")}  >
                            <option value="Youtube">Youtube</option>
                            <option value="Twitter">Twitter</option>
                        </select>

                        <label className="leading-none" htmlFor="Tags">Tags</label>
                        <input className={inputStyle} type="text" placeholder="eg. #fun" {...register("tags")} />

                        <Button type="submit" variant="selected" text="Submit" />
                    </form>
                </>}
        </div>
    </div>

}