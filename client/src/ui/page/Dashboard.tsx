import { useState } from "react";
import { Button } from "../components/button";
import { useContent, useUser } from "../../context"
import { ShareModal } from "../components/modals/shareModal";
import { Close, Plus, Share } from "../icons";
import { CreateModal } from "../components/modals/createModal";
import { Card } from "../components/card";
import { useForm, type SubmitHandler } from "react-hook-form"
import { axiosClient } from "../../api/axiosClient";
import { useNavigate } from "react-router";

type Inputs = {
    query: string
}

interface Content {
    title: string,
    description: string,
    tags?: string[],
    link: string,
    type: "Youtube" | "Twitter",
    _id: string,
    userId: string
}

export default function Dashboard({ otherUser = false, otherUsername, otherUsersContent }: { otherUser: boolean, otherUsername?: string, otherUsersContent?: Content[] }) {
    const [displayShareModal, setDisplayShareModal] = useState<boolean>(false)
    const [displayCreateModal, setDisplayCreateModal] = useState<boolean>(false)
    const [searchedPosts, setSharedPosts] = useState<string[] | null>(null)


    const { user, content } = useUser()


    const handleShareClick = () => setDisplayShareModal(true)
    const handleCreateClick = () => setDisplayCreateModal(true)

    const { state, dispatch } = useContent()

    const { register, handleSubmit } = useForm<Inputs>()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.query) {
            try {
                const response = await axiosClient.post('/query', { query: data.query })

                setSharedPosts(response.data.postIds.reverse())

            } catch (e) {
                console.error(e)
            }
        }
    }

    return <div className="w-full h-dvh overflow-clip  bg-black flex flex-col relative">


        {displayShareModal && <ShareModal setIsVisible={setDisplayShareModal} />}


        {displayCreateModal && <CreateModal setIsVisble={setDisplayCreateModal} />}

        <div className="border-b  bg-black w-full border-b-white  text-white py-6 items-center px-8 flex justify-between ">
            {otherUsername ? <h1  > {otherUsername}'s Collection  </h1> : <h1> {user?.username}'s Collection  </h1>}
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
                <input {...register("query")} type="text" className="bg-white rounded-md text-black px-4 outline-0 "
                    placeholder="Search using AI" ></input>
                <Button text="Search" variant="unselected"></Button>
            </form>
            {
                !otherUser ?
                    <div className="flex gap-4" >
                        <Button
                            onClick={handleCreateClick}
                            text="Create" variant="selected"
                            startIcon={<Plus className="size-4" />}
                        />
                        <Button onClick={handleShareClick}
                            text="Share" variant="unselected"
                            startIcon={<Share className="size-4" />}
                        />
                    </div>
                    :
                    <div className="flex gap-4" >
                        <Button
                            onClick={() => { navigate("/home") }}
                            text="Your Collection" variant="selected"

                        />
                    </div>

            }
        </div>
        <div className="w-full px-6 pt-4">
            {
                state.displayButton ?
                    <Button variant="none"

                        onClick={() => dispatch({ type: "Select None" })}
                        className="bg-gray-100 flex items-center p-2 rounded-md w-min gap-4"
                        text={state.displayContent}
                        endIcon={
                            <Close className="size-3 hover:cursor-pointer" />
                        }
                    /> :
                    <div className="w-full h-10"></div>
            }
        </div>
        <div className="overflow-clip h-dvh px-6 py-4 " >
            <div className="w-full h-screen py-2 bg-gray-300  grid overflow-auto  [&::-webkit-scrollbar]:w-0 grid-cols-4  ">
                {

                    otherUsersContent ? otherUsersContent.map((item) => {
                        if (searchedPosts) {
                            if (searchedPosts?.includes(item._id)) {

                                return <Card _id={item._id} key={item._id} title={item.title}
                                    description={item.description} link={item.link}
                                    type={item.type} />
                            }
                        } else {
                            if (state.displayContent === "All") {

                                return <Card _id={item._id} key={item._id} title={item.title}
                                    description={item.description} link={item.link}
                                    type={item.type} />
                            }

                            else if (state.displayContent === item.type) {

                                return <Card _id={item._id} key={item._id} title={item.title}
                                    description={item.description} link={item.link}
                                    type={item.type} />
                            }
                        }
                    }).reverse() :

                        content.map((item) => {
                            if (searchedPosts) {
                                if (searchedPosts?.includes(item._id)) {

                                    return <Card _id={item._id} key={item._id} title={item.title}
                                        description={item.description} link={item.link}
                                        type={item.type} />
                                }
                            } else {
                                if (state.displayContent === "All") {

                                    return <Card _id={item._id} key={item._id} title={item.title}
                                        description={item.description} link={item.link}
                                        type={item.type} />
                                }

                                else if (state.displayContent === item.type) {

                                    return <Card _id={item._id} key={item._id} title={item.title}
                                        description={item.description} link={item.link}
                                        type={item.type} />
                                }
                            }
                        }).reverse()

                }
                <div className="block h-screen w-full"></div>
            </div>

        </div>

    </div>
}