import { acquireSet, updateTermRecord, updateSetRecord } from "@utils/api"
import { createStore } from "@model/statebox"
import { shuffle } from '@utils/util'

const states = {
    progress: {
        cur: 0,
        total: 0
    },
    curTerms: null,
    errTerms: []
}

const actions = {
    init(store, terms) {
        let unLearnedTerms = [], learnedTerms = []
        terms.forEach((term) => {
            term.spell_comb_learned ? learnedTerms.push(term) : unLearnedTerms.push(term)
        })
        store.setState({ progress: { cur: learnedTerms.length, total: terms.length }, curTerms: [...learnedTerms, ...shuffle(unLearnedTerms)] })
    },
    goNext(store, status, sid, spell_comb_learncount) {
        const { progress, curTerms, errTerms } = store.states, { cur, total } = progress
        if (status === 'success') {
            //上传到服务器
            updateTermRecord(JSON.stringify({ sid, tid: curTerms[cur].tid, spell_comb_learned: 1 }))
            curTerms[cur].spell_comb_learned = true
            if (errTerms.length === 0 && cur === curTerms.length - 1) updateSetRecord(JSON.stringify({ sid, spell_comb_learncount: spell_comb_learncount + 1 }))
        } else {
            errTerms.push(curTerms[cur])
            store.setState({ errTerms: [...errTerms] })
        }
        if (cur < curTerms.length) {
            setTimeout(() => {
                store.setState({ progress: { ...progress, cur: cur + 1 } })
            }, 1500)
        }
    },
    onRoundClick(store, terms, sid) {
        let { progress, errTerms } = store.states, curTerms = []
        if (errTerms.length === 0) {
            //服务器术语初始化
            updateTermRecord(JSON.stringify({ sid, spell_comb_learned: 0 }))
            terms.forEach((term) => { term.spell_comb_learned = false })
            curTerms = [...shuffle(terms)]
        } else {
            terms.forEach((item) => { if (!item.spell_comb_learned) curTerms.push(item) })
        }
        store.setState({ curTerms, errTerms: [], progress: { cur: 0, total: curTerms.length } })
    }
}

export default createStore(states, actions)

