import Auth from "./Auth";
import { Blob1, Blob2, Blob3, Blob4, Twitter, YouTube, Facebook, Folder, LinkedIn } from "../icons";
import { Instagram } from "../icons/instagram";


export default function Landing() {
    return <>
        <div className="flex overflow-clip">
            <div className="w-3/5 h-dvh bg-slate-800 relative text-white">

                <Blob1 className="size-35  rotate-25 -left-15 -top-10 absolute" />
                <Blob2 className="size-35 right-0 -top-10 absolute" />
                <Blob3 className="size-35  absolute -bottom-5 " />
                <Blob4 className="size-40 absolute  -bottom-20 right-0" />
                <div className="flex flex-col gap-2 absolute left-16 bottom-1/2 translate-y-1/2">
                    <h1 className="text-6xl font-semibold ">MediaShare</h1>
                    <p className="text-2xl">Your Unified Content Hub</p>

                    <ul className="mt-10 text-lg list-disc pl-5 flex flex-col gap-1 ">
                        <li>Save & organize content.</li>
                        <li>Share your collection easily.</li>
                        <li>Supports X, Youtube, Github and more.</li>
                        <li>Query your collection using AI to find your <br />saved content.</li>
                    </ul>
                </div>

                <Twitter className="size-4 absolute bottom-7/24 -translate-y-35 rotate-30 right-57 " />
                <YouTube className="size-8 absolute bottom-7/24 -translate-y-40 -rotate-30 right-65 " />
                <Facebook className="size-10 absolute bottom-7/24 -translate-y-45 rotate-20 right-50 " />
                <Instagram className="size-12 absolute bottom-7/24 -translate-y-55 -rotate-25 right-65 " />
                <Folder className="size-35 absolute bottom-7/24 right-45 " />
                <LinkedIn className="size-13 absolute  bottom-7/24 -translate-y-67 rotate-15 right-50" />

            </div>
            <div className="w-2/5 h-dvh absolute right-0">
                <Auth />
            </div>
        </div>
    </>
}