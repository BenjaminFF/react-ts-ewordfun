import createStore from '@model/statebox/createStore'
import { shuffle } from '@utils/util'

const states = {
    options: [],
    term: ''
}

const actions = {
    init(store, otherOptions, term) {
        const options = Array.from(otherOptions, (option) => ({ text: option, active: false }))
        options.push({ text: term, active: false })
        store.setState({ term, options: shuffle(options) })

    },
    onOptionClick(store, index, callBack) {
        const { options, term } = store.states
        options.forEach((option) => option.active = false)
        options[index].active = true
        store.setState({ options: [...options] })
        if (callBack) callBack(options[index].text === term)
    }
}

export default createStore(states, actions)