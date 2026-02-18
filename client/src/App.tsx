
import { Route, Routes } from 'react-router'
import { UserContextProvider, ContentContexProvider } from './context'
import Landing from './ui/page/Landing'
import Home from './ui/page/Home'

import Protected from './ui/page/Protected'
import SharedDashboard from './ui/page/SharedDashboard'
import Login from './ui/page/Login'
import Signup from './ui/page/Signup'



export default function App() {


    return <>

        <UserContextProvider>
            <ContentContexProvider>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path='login' element={<Login/>}/>
                    <Route path='signup' element={<Signup />} />
                    <Route path="home" element={<Protected> <Home /></Protected>} />
                    <Route path="share/:hash" element={<Protected><SharedDashboard /></Protected>} />
                </Routes>
            </ContentContexProvider>
        </UserContextProvider>

    </>
}

