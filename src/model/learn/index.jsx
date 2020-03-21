import { acquireSet, updateTerm } from "@utils/api"
import { createStore } from "@model/statebox"
import Message, { Type } from "@components/message"

const states = {
    terms: [],
    set: null,
    playList: {
        combword: false
    }
}

const actions = {
    init(store, sid, origin_id) {
        acquireSet(sid, origin_id).then((res) => {
            const { data } = res.data, { terms, set } = data
            terms.forEach((item) => { item.editable = [false, false] })
            store.setState({ terms, set })
        })
    },
    onInputFocus(store, cur, type) {
        const { terms } = store.states
        terms[cur].editable[type === 'term' ? 0 : 1] = true
        store.setState({ terms: [...terms] })
    },
    onInputBlur(store, cur, type, t) {
        const { terms } = store.states, { tid, term, definition } = terms[cur]
        if (term === '' || definition === '') {
            Message({ type: Type.Error, message: term === '' ? t('learn:termEmpty') : t('learn:defEmpty') })
            return
        }
        terms[cur].editable[type === 'term' ? 0 : 1] = false
        updateTerm(tid, term, definition)
        store.setState({ terms: [...terms] })
    },
    onInputChange(store, cur, type, e) {
        const { terms } = store.states, { value } = e.currentTarget
        terms[cur][type] = value
        store.setState({ terms: [...terms] })
    },
    setPlay(store, type, isShow) {
        const { playList } = store.states
        playList[type] = isShow
        store.setState({ playList: { ...playList } })
    }
}

export default createStore(states, actions)

