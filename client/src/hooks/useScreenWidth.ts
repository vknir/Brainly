import { useEffect, useState } from "react";

type Size = "mobile" | "desktop"

export default function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState<Size>(window.innerWidth > 768 ? "desktop" : "mobile")

    useEffect(() => {

        const changeWidth = () => {
            setScreenWidth(window.innerWidth > 768 ? "desktop" : "mobile")
        }

        addEventListener('resize', changeWidth)

        return () => {
            removeEventListener('resize', changeWidth)
        }
    }, [])

    return screenWidth;

}
