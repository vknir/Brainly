

import { ContentContexProvider } from './context'
import Home from './ui/page/Home'

export default function App() {

    return <>
        <ContentContexProvider  >
            <Home />
        </ContentContexProvider>
    </>
}

