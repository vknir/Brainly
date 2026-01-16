
import { AuthContextProvider, ContentContexProvider } from './context'
import Landing from './ui/page/Landing'


export default function App() {

    return <>
        <AuthContextProvider>
            <ContentContexProvider  >
                <Landing />
            </ContentContexProvider>
        </AuthContextProvider>
    </>
}

