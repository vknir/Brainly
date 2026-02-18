
import { Twitter, YouTube, Facebook, Folder, LinkedIn, Close, Logout, Bars3 } from "../icons";
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
                <div className="max-w-7xl mx-auto px-6 md:px-8">
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


                        <div className="hidden md:flex items-center space-x-3">
                            <div>
                                <Button variant="none" className="hover:bg-gray-900 p-2" text="Log In" />
                            </div>
                            <div>
                                <Button variant="none" text="Get Started" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Slide slideVisible={slideVisible} setSlideVisible={setSlideVisible} />
            <section className="pt-28 ">
                <div className=" max-w-7xl px-6 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
                        <div className="text-center lg:text-left order-1 ">
                            <h1 className="text-4xl font-bold mb-2">MediaShare</h1>
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
                                <Button onClick={()=>navigate("/signup")} variant="primary" text="Get Started" endIcon={<Logout className="size-4" />} />
                            </div>
                        </div>

                        <div className=" hidden relative h-105  w-full order-2 border border-white  lg:flex items-center justify-center ">
                            <YouTube className=" size-13 absolute -rotate-17 bottom-12/20 right-7/20" />
                            <Twitter className="size-8 absolute rotate-15 bottom-10/20 right-11/20" />
                            <Facebook className="size-10 absolute -rotate-20 bottom-9/20 right-7/20" />
                            <Instagram className="size-7 absolute rotate-20 bottom-8/20 right-11/20" />
                            <LinkedIn className="size-6 absolute -rotate-25 bottom-7/20 right-8/20 " />
                            <Folder className="size-35 absolute bottom-0/20 left-1/2 -translate-x-1/2" />
                        </div>
                    </div>
                </div>

            </section>


        </main>

    </>
}


