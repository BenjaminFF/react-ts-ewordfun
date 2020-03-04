import { createStore } from "./store"

const states = {
    counter: 0,
    b: { a: 1 }
}

const actions = {
    addCounter: (store, newCounter) => {
        store.setState({ b: { a: 2 } })
    }
}

const useStore = createStore(states, actions)

export default useStore

