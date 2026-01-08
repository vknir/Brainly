import Auth from "./Auth";
import { Blob1, Blob2, Blob3, Blob4 } from "../icons";


export default function Landing() {
    return <>
        <div className="flex overflow-clip">
            <div className="w-3/5 h-dvh bg-slate-800 relative text-white">

                <Blob1 className="size-35  rotate-25 -left-15 -top-10 absolute" />
                <Blob2 className="size-35 right-0 -top-10 absolute" />
                <Blob3 className="size-35  absolute -bottom-5 " />
                <Blob4 className="size-40 absolute  -bottom-20 right-0" />
                <div className="flex flex-col gap-2 absolute left-24 bottom-1/2 translate-y-1/2">
                    <h1 className="text-6xl font-semibold ">MediaShare</h1>
                    <p className="text-2xl">Your Unified Content Hub</p>

                    <ul className="mt-10 text-lg list-disc pl-5 flex flex-col gap-1 ">
                        <li>Save & organize content</li>
                        <li>Share your collection easily</li>
                        <li>Supports X, Youtube, Github and more</li>
                        <li>Query your collection using AI to find your saved content</li>
                    </ul>
                </div>


            </div>
            <div className="w-2/5 h-dvh absolute right-0">
                <Auth />
            </div>
        </div>
    </>
}