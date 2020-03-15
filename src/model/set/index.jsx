import createStore from '@model/statebox/createStore'
import { listSets } from '@utils/api'
import Message, { Type } from '@components/message'

const states = {
    sets: [],
    curSets: [],
    page: {
        cur: 0,
        num: 0,
        total: 0,
        numPerPage: 9
    }
}

const actions = {
    init(store) {
        let { page } = store.states, sets = []
        let { cur, num, total, numPerPage } = page
        listSets().then((res) => {
            const { data } = res.data
            sets = data.sets
            total = sets.length
            num = Math.ceil(total / numPerPage)
            const curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
            store.setState({ sets, curSets, page: { ...page, num, total, } })
        })
    },
    onCurChange(store, cur) {
        const { page, sets } = store.states
        let { num, total, numPerPage } = page
        const curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
        store.setState({ curSets, page: { ...page, cur } })
    }
}

export default createStore(states, actions)