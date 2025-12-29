
import { ContentContextProvider } from './context'
import Home from './ui/page/Home'

export default function App() {

    return <><ContentContextProvider>
        <Home />
    </ContentContextProvider>
    </>
}

