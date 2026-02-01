
import { Route, Routes, useNavigate } from 'react-router'
import { UserContextProvider, ContentContexProvider } from './context'
import Landing from './ui/page/Landing'
import Home from './ui/page/Home'
import { useEffect } from 'react'
import Protected from './ui/page/Protected'



export default function App() {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token)
            navigate("/home")
    }, [navigate])

    return <>

        <UserContextProvider>
            <ContentContexProvider>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path="home" element={<Protected> <Home /></Protected>} />
                </Routes>
            </ContentContexProvider>
        </UserContextProvider>

    </>
}

