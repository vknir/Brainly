import { createContext, useContext, useReducer, type ReactNode } from "react"

export type Content = "Youtube" | "Twitter" | "All"

type Action = { type: "Select Youtube" } | { type: "Select Twitter" } | { type: "Select All" } | { type: "Select None" }

type State = {
    displayButton: boolean,
    displayContent: Content
}

type StateProp = {
    state: State,
    dispatch: React.ActionDispatch<[action: Action]>
}

const StateContex = createContext<StateProp | undefined>(undefined)

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "Select All":
            return { displayButton: true, displayContent: "All" }
        case "Select Twitter":
            return { displayButton: true, displayContent: "Twitter" }
        case "Select Youtube":
            return { displayButton: true, displayContent: "Youtube" }
        case "Select None":
            return { displayButton: false, displayContent: "All" }
        default:
            return state
    }
}


export function ContentContexProvider({ children }: { children: ReactNode }) {


    const [state, dispatch] = useReducer(reducer, { displayButton: false, displayContent: "All" })

    return <StateContex value={{ state, dispatch }}>
        {children}
    </StateContex>
}

export  function useContent() {
    const contentContext = useContext(StateContex)
    if (contentContext === undefined)
        throw new Error("No context")
    return contentContext

}