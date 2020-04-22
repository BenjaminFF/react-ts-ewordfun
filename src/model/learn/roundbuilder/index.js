import { createStore } from "@model/statebox"
import { updateTermRecord, updateSetRecord } from "@utils/api"
import { shuffle } from '@utils/util'

const states = {
    progress: {
        cur: 0,
        total: 0
    },
    curTerms: null,
    errTerms: [],
    setRecordProp: '',
    termRecordProp: '',
    set: null,
    showRoundEnd: false
}

const actions = {
    init(store, terms, modeProps, set) {
        const { setRecordProp, termRecordProp } = modeProps
        if (terms.filter((term) => !term[termRecordProp]).length === 0) {
            updateTermRecord(JSON.stringify({ sid: set.sid, [termRecordProp]: 0 }))
            terms.forEach((term) => term[termRecordProp] = 0)
        }
        let unLearnedTerms = [], learnedTerms = []
        terms.forEach((term) => {
            term[termRecordProp] ? learnedTerms.push(term) : unLearnedTerms.push(term)
        })
        store.setState({
            set,
            setRecordProp,
            termRecordProp,
            errTerms: [],
            showRoundEnd: learnedTerms.length === terms.length,
            progress: { cur: learnedTerms.length, total: terms.length },
            curTerms: [...learnedTerms, ...shuffle(unLearnedTerms)]
        })
    },
    goNext(store, status) {
        const { progress, curTerms, errTerms, set, setRecordProp, termRecordProp } = store.states, { sid } = set, { cur, total } = progress, curTerm = curTerms[cur]
        if (status === 'success') {
            updateTermRecord(JSON.stringify({ sid, tid: curTerm.tid, [termRecordProp]: 1 }))
            curTerm[termRecordProp] = 1
            if (errTerms.length === 0 && cur === curTerms.length - 1) {
                set[setRecordProp] = set[setRecordProp] + 1
                updateSetRecord(JSON.stringify({ sid, [setRecordProp]: set[setRecordProp], latestlearntime: Date.now() }))
            }
        } else {
            errTerms.push(curTerm)
            store.setState({ errTerms: [...errTerms] })
        }
        if (cur < curTerms.length) {
            setTimeout(() => {
                store.setState({ progress: { ...progress, cur: cur + 1 } })
            }, 1500)
        }
        if (cur === curTerms.length - 1) {
            setTimeout(() => {
                store.setState({ showRoundEnd: true })
            }, 2500)
        }
    },
    onRoundClick(store, terms) {
        let { errTerms, set, setRecordProp, termRecordProp } = store.states, curTerms = [], { sid } = set
        if (errTerms.length === 0) {
            updateTermRecord(JSON.stringify({ sid, [termRecordProp]: 0 }))
            terms.forEach((term) => { term[termRecordProp] = false })
            curTerms = [...shuffle(terms)]
        } else {
            terms.forEach((item) => { if (!item[termRecordProp]) curTerms.push(item) })
        }
        store.setState({ curTerms, errTerms: [], progress: { cur: 0, total: curTerms.length }, showRoundEnd: false })
    },
    cleanup(store) {
        store.setState({
            progress: {
                cur: 0,
                total: 0
            },
        })
    }
}

export default createStore(states, actions)