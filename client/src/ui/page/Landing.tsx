
import { Twitter, YouTube, Facebook, Folder, LinkedIn, Logout, Bars3 } from "../icons";
import { Share } from "../icons";
import { Button } from "../components/button";
import { Instagram } from "../icons/instagram";
import { useState } from "react";
import Slide from "./Slide";
import { useNavigate } from "react-router";


export default function Landing() {
    const [slideVisible, setSlideVisible] = useState<boolean>(false)
    const navigate = useNavigate()

    return <>

        <main className="w-dvw h-dvh overflow-hidden bg-black relative text-white [&::-webkit-scrollbar]:w-0 ">

            <header className="w-full fixed bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto py-4 px-6 md:px-8">
                    <div className="flex justify-between items-center h-16 sm:h-20 ">
                        <a className="flex items-center gap-3" href="/">
                            <Share className="size-8" />
                            <span className="text-lg">Media Share</span>
                        </a>

                        <div>
                            <Button className="md:hidden"
                                onClick={() => setSlideVisible(prev => !prev)}
                                variant="none"
                                startIcon={<Bars3 className="size-8" />}
                            />
                        </div>


                        <div className="hidden md:flex items-center text-black space-x-6">
                            <div>
                                <Button
                                    onClick={() => navigate("/login")}
                                    variant="none"
                                    className="text-white hover:cursor-pointer transform duration-150 ease-in hover:bg-gray-900 px-4 py-2 rounded-md"
                                    text="Log In" />
                            </div>
                            <div>
                                <Button
                                    onClick={() => navigate("/signup")}
                                    variant="none"
                                    className="bg-white font-normal px-4 py-2 rounded-md hover:scale-110 transform duration-150 ease-in hover:shadow-white/50 hover:shadow-md hover:cursor-pointer"
                                    text="Get Started" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Slide slideVisible={slideVisible} setSlideVisible={setSlideVisible} />
            <section className="pt-28 h-full">
                <div className=" max-w-7xl h-full mx-auto px-6 md:px-8">
                    <div className="grid grid-cols-1 h-full md:grid-cols-2 justify-items-center items-center justify-center   ">
                        <div className="text-center h-full  flex flex-col justify-center  lg:text-left order-1 ">
                            <h1 className=" text-4xl md:text-5xl font-bold mb-2">MediaShare</h1>
                            <p className="text-2xl mb-6">Your Unified Content Hub</p>
                            <p className="leading-relaxed mb-6 text">
                                Organize your content from <span>X, YouTube , GitHub </span> and many more to make a
                                library and <span> share </span> your curated collections with others.
                            </p>
                            <p className="leading-relaxed text mb-16">
                                Query your collection via AI to get the information you need, ensuring your saved content is
                                always at your fingertips.
                            </p>

                            <div>
                                <Button onClick={() => navigate("/signup")} variant="primary" text="Get Started" endIcon={<Logout className="size-4" />} />
                            </div>
                        </div>

                        <div className=" hidden relative h-full  w-full order-2  md:flex items-center justify-center ">
                            <YouTube className=" size-18 absolute right-44 bottom-104 rotate-10" />
                            <Twitter className="size-12 absolute right-77 bottom-96 -rotate-14" />
                            <Facebook className="size-17 absolute right-50 bottom-88 rotate-14" />
                            <Instagram className="size-12 absolute right-72 bottom-77 -rotate-16" />
                            <LinkedIn className="size-9 absolute  right-58 bottom-70 rotate-18" />
                            <Folder className="size-42 absolute right-50 bottom-34" />
                        </div>
                    </div>
                </div>

            </section>


        </main>

    </>
}


