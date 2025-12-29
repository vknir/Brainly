import useContent from "../../context"

export default function Dashboard() {
    const { displayContent } = useContent()

    return <div className="w-full h-dvh bg-black">
        <p className="text-white">{displayContent}</p>
    </div>
}