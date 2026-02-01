import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react"

type User = {
    username: string,
    _id: string
} | null

type Content = {
    title: string,
    description: string,
    tags?: string[],
    link: string,
    type: "Youtube" | "Twitter",
    _id: string,
    userId: string
}

type UserState = {
    user: User,
    content: Content[],
    setUser: React.Dispatch<SetStateAction<User>>
    setContent: React.Dispatch<SetStateAction<Content[]>>
}

const UserContext = createContext<UserState | undefined>(undefined)

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null)
    const [content, setContent] = useState<Content[]>([]);
    return <UserContext value={{ user, setUser, content, setContent }}>
        {children}
    </UserContext>
}

export const useUser = () => {
    const authContext = useContext(UserContext)
    if (authContext === undefined)
        throw new Error("No context provided")
    return authContext
}