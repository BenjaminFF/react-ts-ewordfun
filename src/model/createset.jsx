import { createStore } from "./store"

const states = {
    counter: 0,
    num: 0
}

const actions = {
    addCounter: (store, newCounter) => {
        store.setState({ counter: 1 })
    }
}

const useStore = createStore(states, actions)

export default useStore

