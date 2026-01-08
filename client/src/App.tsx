
import { ContentContexProvider } from './context'
import Landing from './ui/page/Landing'


export default function App() {

    return <>
        <ContentContexProvider  >
            <Landing />
        </ContentContexProvider>
    </>
}

