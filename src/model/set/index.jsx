import createStore from '@model/statebox/createStore'
import { listSets } from '@utils/api'
import Message, { Type } from '@components/message'
import { isLearnByDate } from '@utils/util'

const states = {
    sets: [],
    originSets: [],
    curSets: [],
    filterText: '',
    page: {
        cur: 0,
        num: 0,
        total: 0,
        numPerPage: 9
    }
}

const actions = {
    init(store) {
        let { page, filterText } = store.states, { cur, num, total, numPerPage } = page, sets = []
        listSets().then((res) => {
            const { data } = res.data
            sets = data.sets
            total = sets.length
            num = Math.ceil(total / numPerPage)
            const curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
            store.setState({ sets, curSets, originSets: [...sets], page: { ...page, num, total } })
        })
    },
    onCurChange(store, cur) {
        const { page, sets } = store.states
        let { num, total, numPerPage } = page
        const curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
        store.setState({ curSets, page: { ...page, cur } })
    },
    onInputChange(store, e) {
        const { value } = e.currentTarget
        store.setState({ filterText: value })
    },
    filterSets(store) {
        let { originSets, page, filterText } = store.states, { numPerPage } = page, sets = []
        if (filterText.length === 0) {
            sets = [...originSets]
        }
        if (filterText.substring(0, 1) === '$') {
            if (filterText.includes('plan')) {
                sets = originSets.filter((set) => isLearnByDate(set.startplantime))
            } else {
                //没有找到的指令暂时为originSets
                sets = [...originSets]
            }
        } else {
            sets = originSets.filter((set) => set.name.includes(filterText))
        }
        const total = sets.length, num = Math.ceil(total / numPerPage), cur = 0,
            curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
        store.setState({ sets, curSets, page: { cur, num, total, numPerPage } })
    }
}

export default createStore(states, actions)