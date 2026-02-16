
import { Route, Routes } from 'react-router'
import { UserContextProvider, ContentContexProvider } from './context'
import Landing from './ui/page/Landing'
import Home from './ui/page/Home'

import Protected from './ui/page/Protected'
import SharedDashboard from './ui/page/SharedDashboard'
import Auth from './ui/page/Auth'



export default function App() {


    return <>

        <UserContextProvider>
            <ContentContexProvider>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path='login' element={}/>
                    <Route path='signup' element={<Auth />} />
                    <Route path="home" element={<Protected> <Home /></Protected>} />
                    <Route path="share/:hash" element={<Protected><SharedDashboard /></Protected>} />
                </Routes>
            </ContentContexProvider>
        </UserContextProvider>

    </>
}

