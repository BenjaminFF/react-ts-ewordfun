import createStore from '@model/statebox/createStore'
import { shuffle } from '@utils/util'

const states = {
    options: [],
    term: '',
    status: 'normal'
}

const actions = {
    init(store, otherOptions, term) {
        const options = Array.from(otherOptions, (option) => ({ text: option, active: false }))
        options.push({ text: term, active: false })
        store.setState({ term, options: shuffle(options) })

    },
    onOptionClick(store, index, callBack) {
        const { options, term } = store.states, status = options[index].text === term ? 'success' : 'error'
        options.forEach((option) => option.active = false)
        options[index].active = true
        store.setState({ status, options: [...options] })
        if (callBack) callBack(status)
    }
}

export default createStore(states, actions)