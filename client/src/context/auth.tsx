import { createContext, useContext, useState, type ReactNode, type SetStateAction } from "react"

type User = {
    username: string,
    _id: string
} | null

type Auth = {
    user: User,
    setUser: React.Dispatch<SetStateAction<User>>
}

const AuthContext = createContext<Auth | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User>(null)

    return <AuthContext value={{ user, setUser }}>
        {children}
    </AuthContext>
}

export const useAuth = () => {
    const authContext = useContext(AuthContext)
    if (authContext === undefined)
        throw new Error("No context provided")
    return authContext
}