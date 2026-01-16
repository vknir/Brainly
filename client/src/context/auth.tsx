import { createContext, useContext, useEffect, useState, type ReactNode } from "react"



type AuthToken = {
    token: string,
    user: {
        username: string,
        _id: string
    }
} | null

const Auth = createContext<AuthToken | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {

    const [auth, setAuth] = useState<AuthToken>(null)

    useEffect(() => {
        const authCheck = localStorage.getItem("auth")
        if (authCheck) {
            const newAuth: AuthToken = JSON.parse(authCheck) as AuthToken
            setAuth(newAuth)
        }
    }, [])

    if (auth) {
        let { token, user } = auth
        return <Auth value={{ token, user }}>
            {children}
        </Auth>
    } else {
        return <Auth value={null}>
            {children}
        </Auth>
    }


}

export const useAuth = () => {

    const authContext = useContext(Auth)
    if (authContext === undefined)
        throw new Error("Context not defined")

    return authContext
}