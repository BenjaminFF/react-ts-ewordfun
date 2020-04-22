import { createStore } from "@model/statebox"

const states = {
    value: '',
    status: 'normal',
    validated: false
}

const actions = {
    onInputChange(store, e) {
        const { validated } = store.states, { value } = e.currentTarget
        if (!validated) store.setState({ value })
    },
    validateAnswer(store, term, callBack) {
        const { value, validated } = store.states, status = term === value ? 'success' : 'error'
        if (validated) return
        if (callBack) callBack(status)
        store.setState({ status, validated: true })
    },
    cleanup(store) {
        store.setState({ validated: false, value: '', status: 'normal' })
    }
}

export default createStore(states, actions)