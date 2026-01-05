import { createContext, useContext, useState, type ReactNode } from "react"

export type Content = "All" | "Twitter" | "Youtube"

type ContentContext = {
    displayContent: Content
    setDisplayContent: React.Dispatch<React.SetStateAction<Content>>
}


const ContentContext = createContext<ContentContext | undefined>(undefined)

export function ContentContextProvider({ children }: { children: ReactNode }) {

    const [displayContent, setDisplayContent] = useState<Content>("All")

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