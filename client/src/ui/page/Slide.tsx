
import { Button } from "../components/button";
import { Close } from "../icons";

export default function Slide({ slideVisible, setSlideVisible }: { slideVisible: boolean, setSlideVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
    return <div className={` w-5/6 max-w-100 ${slideVisible ? 'animate-slide-from-right right-0': 'animate-slide-to-right  -right-full'} absolute  z-10 bg-black/80 backdrop-blur-md h-dvh md:hidden`}>
        <div className="w-full h-full border-l border-white flex justify-center items-center">

            <Button onClick={() =>{ setSlideVisible(false)}}
                variant="none"
                className="absolute right-6 top-4 animate-appear"
                startIcon={<Close className="size-8" />}
            />

            <div className="flex flex-col w-full gap-4 p-4 items-center">
                <a href="/login" className="font-medium text-gray-200" >Login</a>
                <div className="w-full relative overflow-clip rounded-[10px ] p-0.5">

                    <Button className="relative h-full text-lg font-medium bg-white text-black w-full p-2 rounded-lg"
                        variant="none"
                        text="Get Started" />
                </div>
            </div>


        </div>
    </div>
}