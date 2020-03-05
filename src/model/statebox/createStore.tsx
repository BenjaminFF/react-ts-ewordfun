import { useEffect, useState } from "react"

interface Actions {
    [index: string]: Function
}

interface States {
    [index: string]: any
}

class Model {
    private listeners: Array<Function>
    public states: States
    public actions: Actions


    constructor(initStates: States, actions: Actions) {
        this.listeners = []
        this.states = initStates
        Object.keys(actions).forEach(key => {
            if (typeof actions[key] === 'function') {
                actions[key] = actions[key].bind(null, this)
            }
        })
        this.actions = actions
    }

    setState(newStates: States) {
        let shandowEqual = true
        Object.keys(newStates).forEach(key => {
            if (newStates[key] !== this.states[key]) {
                shandowEqual = false
            }
        })
        this.states = shandowEqual ? this.states : { ...this.states, ...newStates }
        this.listeners.forEach((listener) => {
            listener(this.states)
        })
    }

    useStore() {
        const [, newListener] = useState(this.states)
        useEffect(() => {
            this.listeners.push(newListener)
            return () => {
                this.listeners = this.listeners.filter((listener) => listener !== newListener)
            }
        }, [])
        return [this.states, this.actions, this]
    }
}

const createStore = (states: States, actions: Actions) => {
    const model = new Model(states, actions)
    return model.useStore.bind(model)
}

export default createStore