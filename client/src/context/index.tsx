import { createContext, useContext, useState, type ReactNode } from "react"

export type ContentType = "All" | "Twitter" | "Youtube"

type ContentContextType = {
    displayContent: ContentType
    setDisplayContent: React.Dispatch<React.SetStateAction<ContentType>>
}


const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentContextProvider({ children }: { children: ReactNode }) {

    const [displayContent, setDisplayContent] = useState<ContentType>("All")

    return <>
        <ContentContext value={{ displayContent, setDisplayContent }} >
            {children}
        </ContentContext>

    </>
}

export default function useContent() {
    const context = useContext(ContentContext)
    if (!context)
        throw new Error("Context not defined")
    return context
}