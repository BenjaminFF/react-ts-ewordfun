import { useEffect, useState } from "react"

interface Actions {
    [index: string]: Function
}

class Model {
    private listeners: Array<Function>
    private states: Object
    private actions: Actions


    constructor(initStates: Object, actions: Actions) {
        this.listeners = []
        this.states = initStates
        Object.keys(actions).forEach(key => {
            if (typeof actions[key] === 'function') {
                actions[key] = actions[key].bind(null, this)
            }
        })
        this.actions = actions
    }

    setState(newStates: Object) {
        this.states = { ...this.states, ...newStates }
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
                console.log('gg')
            }
        }, [])
        return [this.states, this.actions]
    }
}

const createStore = (states: Object, actions: Actions) => {
    const model = new Model(states, actions)
    return model.useStore.bind(model)
}

export default createStore