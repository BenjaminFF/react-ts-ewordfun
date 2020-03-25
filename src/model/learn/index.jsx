import { acquireSet, updateTerm, addTerm } from "@utils/api"
import { createStore } from "@model/statebox"
import Message, { Type } from "@components/message"
import { randomStr } from '@utils/util'

const createNewItem = () => {
    return {
        tid: randomStr(12),
        term: '',
        definition: '',
        stared: 0,
        write_learned: 0,
        spell_comb_learned: 0,
        editable: [true, false],
        isNewTerm: true,
        updating: false
    }
}

const states = {
    originTerms: [],
    terms: [],
    set: null,
    loading: true,
    playList: {
        combword: false
    }
}

const actions = {
    init(store, sid, origin_id, listRef) {
        acquireSet(sid, origin_id).then((res) => {
            const { data } = res.data, { terms, set } = data, originTerms = []
            terms.forEach((item) => {
                const { tid, term, definition } = item
                item.editable = [false, false]
                item.isNewTerm = false
                item.updating = false
                originTerms.push({ tid, originTerm: term, originDefinition: definition })
            })
            store.setState({ originTerms, terms, set, loading: false })
            listRef.current.initNotify()
        })
    },
    onInputFocus(store, cur, type) {
        const { terms } = store.states
        terms.forEach((item) => { item.editable = [false, false] })
        terms[cur].editable[type === 'term' ? 0 : 1] = true
        store.setState({ terms: [...terms] })
    },
    onInputBlur(store, cur, type, t) {
        const { terms, set, originTerms } = store.states, { tid, term, definition, isNewTerm, updating } = terms[cur],
            originItem = originTerms.filter((item) => item.tid === tid)[0], { originTerm, originDefinition } = originItem
        terms[cur].editable[type === 'term' ? 0 : 1] = false
        if (term === '' || definition === '') {
            Message({ type: Type.Error, message: term === '' ? t('learn:termEmpty') : t('learn:defEmpty') })
            if (!isNewTerm) {
                terms[cur].term = originTerm
                terms[cur].definition = originDefinition
            }
            store.setState({ terms: [...terms] })
            return
        }
        if ((term === originTerm && definition === originDefinition) || updating) {
            store.setState({ terms: [...terms] })
            return
        }
        const hasSameTerm = originTerms.filter((item) => item.tid !== tid && item.originTerm === term).length > 0
        if (hasSameTerm) {
            Message({ type: Type.Error, message: '不能有重复的术语' })
            if (!isNewTerm) {
                terms[cur].term = originTerm
                terms[cur].definition = originDefinition
            }
            store.setState({ terms: [...terms] })
            return
        }
        terms[cur].updating = true
        !isNewTerm ? updateTerm(tid, term, definition).then(() => {
            terms[cur].updating = false
            originItem.originTerm = term
            originItem.originDefinition = definition
            store.setState({ terms: [...terms], originTerms })
        }) : addTerm(set.origin_id, term, definition).then((res) => {
            const { data } = res.data, { tid } = data
            terms[cur].tid = tid
            terms[cur].isNewTerm = false
            terms[cur].updating = false
            originItem.tid = tid
            originItem.originTerm = term
            originItem.originDefinition = definition
            store.setState({ terms: [...terms], originTerms })
        })
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
    },
    addItem(store, pos, listRef) {
        const { terms, originTerms } = store.states, newTerm = createNewItem(), { tid } = newTerm
        terms.splice(pos, 0, newTerm)
        originTerms.splice(pos, 0, { tid, originTerm: '', originDefinition: '' })
        store.setState({ terms: [...terms], originTerms })
        listRef.current.appendNotify(pos)
    }
}

export default createStore(states, actions)

