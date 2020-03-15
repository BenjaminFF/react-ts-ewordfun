import { acquireSet, updateTerm } from "@utils/api"
import { createStore } from "@model/statebox"

const states = {
    terms: []
}

const actions = {
    init(store, sid, origin_id) {
        acquireSet(sid, origin_id).then((res) => {
            const { data } = res.data, { terms } = data
            terms.forEach((item) => { item.editable = [false, false] })
            store.setState({ terms })
        })
    },
    onInputFocus(store, cur, type) {
        const { terms } = store.states
        terms[cur].editable[type === 'term' ? 0 : 1] = true
        store.setState({ terms: [...terms] })
    },
    onInputBlur(store, cur, type) {
        const { terms } = store.states, { tid, term, definition } = terms[cur]
        terms[cur].editable[type === 'term' ? 0 : 1] = false
        updateTerm(tid, term, definition)
        store.setState({ terms: [...terms] })
    },
    onInputChange(store, cur, type, e) {
        const { terms } = store.states, { value } = e.currentTarget
        terms[cur][type] = value
        store.setState({ terms: [...terms] })
    }
}

export default createStore(states, actions)

