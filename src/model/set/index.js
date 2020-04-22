import createStore from '@model/statebox/createStore'
import { listSets, updateSet, updateSetRecord } from '@utils/api'
import Message, { Type } from '@components/message'
import { isLearnByDate, isValidPlanDate } from '@utils/util'

const getFilteredSets = (originSets, filterText) => {
    let sets = []
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
    return sets
}

const states = {
    sets: [],
    curSets: [],
    originSets: [],
    filterText: '',
    page: {
        cur: 0,
        num: 0,
        total: 0,
        numPerPage: 9
    },
    uploading: false,
    curSet: null
}

const actions = {
    init(store) {
        let { page, filterText } = store.states, { cur, total, numPerPage } = page
        listSets().then((res) => {
            const { data } = res.data, originSets = data.sets, sets = getFilteredSets(originSets, filterText),
                total = sets.length, num = Math.ceil(total / numPerPage), curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
            store.setState({ sets, curSets, originSets, page: { ...page, num, total } })
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
    onEnterClick(store) {
        let { originSets, page, filterText } = store.states, { numPerPage } = page,
            sets = getFilteredSets(originSets, filterText)
        const total = sets.length, num = Math.ceil(total / numPerPage), cur = 0,
            curSets = sets.slice(cur * numPerPage, (cur + 1) * numPerPage)
        store.setState({ sets, curSets, page: { cur, num, total, numPerPage } })
    },
    onOpenDialog(store, set, dialogRef) {
        store.setState({ curSet: { ...set, date: new Intl.DateTimeFormat('en-US').format(set.startplantime) } })
        dialogRef.current.setVisible(true)
    },
    onDialogInputChange(store, e, name) {
        const { value } = e.currentTarget, { curSet } = store.states
        store.setState({ curSet: { ...curSet, [name]: value } })
    },
    updateSetToServer(store, dialogRef) {
        let { curSet, curSets } = store.states, { name, description, origin_id, date, sid, startplantime } = curSet
        if (name === '') {
            Message({ type: Type.Error, message: '不能为空' })
            return
        }
        if (!isValidPlanDate(date)) {
            Message({ type: Type.Error, message: '日期格式不正确' })
            return
        }
        store.setState({ uploading: true })
        name = name.trim()
        description = description.trim()
        startplantime = new Date(date).getTime()
        Promise.all([updateSet(JSON.stringify({ name, description, origin_id })), updateSetRecord(JSON.stringify({ sid, startplantime }))]).then((res, res2) => {
            let set = curSets.filter((set) => set.origin_id === origin_id)[0]
            set.name = name
            set.description = description
            set.startplantime = startplantime
            store.setState({ curSets: [...curSets] })
            dialogRef.current.setVisible(false)
        }).finally(() => { store.setState({ uploading: false }) })
    }
}

export default createStore(states, actions)