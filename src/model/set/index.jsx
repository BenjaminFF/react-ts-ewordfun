import createStore from '@model/statebox/createStore'
import { listSets } from '@utils/api'
import Message from '@components/message'
import { Type } from '@components/message/Message'

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
            const { errno, data, errmsg } = res.data
            if (errno === 0) {
                sets = data.sets
                total = sets.length
                num = Math.ceil(total / numPerPage)
                const curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
                store.setState({ sets, curSets, page: { ...page, num, total, } })
            } else {
                Message({ message: errmsg, type: Type.Error })
            }
        }).catch((err) => {
            console.log(err)
            Message({ message: '请连接网络', type: Type.Error })
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