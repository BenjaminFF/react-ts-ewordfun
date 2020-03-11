import { splitStr, mixStr, shuffle } from '@utils/util'
import createStore from '@model/statebox/createStore'

const states = {
    usArr: [],
    sgArr: [],
    curIndex: 0,
    status: 'normal',
    term: '',
    callBack: undefined
}

const actions = {
    init(store, row, term, callBack) {
        let termArr = term.split(/\s+/), arr = [], usArr = [], sgArr = []
        if (termArr.length > 3 || term.length > 30) throw new Error('请使用句子模块')
        while (true) {
            arr = []
            termArr.forEach((term, index) => {
                arr.push(...splitStr(term, Math.floor(row * row / termArr.length)))
                if (index !== termArr.length - 1) arr.push("~~is-space~~")
            })
            if ((arr.length - termArr.length) < row * row) break
        }
        usArr = Array.from(arr, item => ({ t: "", active: false, isSpace: item === "~~is-space~~" }))

        arr = arr.filter((item) => item !== "~~is-space~~")
        sgArr = Array.from(arr, t => ({ t, active: false }))
        while (sgArr.length < row * row) {
            sgArr.push({ t: mixStr(arr[Math.floor(Math.random() * arr.length)]), active: false })
        }
        store.setState({ usArr, term, callBack, sgArr: shuffle(sgArr) })
    },
    onCellClick(store, index) {
        let { usArr, sgArr, status, curIndex, term, callBack } = store.states
        if (sgArr[index].active || status !== 'normal') return
        sgArr[index].active = true
        if (usArr[curIndex].isSpace) curIndex++
        usArr[curIndex] = { isSpace: false, ...sgArr[index] }
        if (curIndex === usArr.length - 1) {
            let answer = ""
            usArr.forEach((item) => {
                if (!item.isSpace) answer += item.t
            })
            status = answer === term.replace(/\s/ig, "") ? "success" : "error"
            store.setState({ status })
            if (callBack) callBack(status)
            return
        }
        store.setState({ curIndex: curIndex + 1, usArr: [...usArr], sgArr: [...sgArr] })
    },
    onUSClick(store) {
        let { status, curIndex, sgArr, usArr } = store.states
        if (curIndex === 0 || status !== 'normal') return
        curIndex = usArr[curIndex - 1].isSpace ? curIndex - 2 : curIndex - 1
        sgArr.forEach((item) => {
            if (item.t === usArr[curIndex].t) item.active = false
        })
        usArr[curIndex] = { active: false, t: "", isSpace: false }
        store.setState({ curIndex, usArr: [...usArr], sgArr: [...sgArr] })
    },
    cleanup(store) {
        store.setState({ curIndex: 0, status: 'normal' })
    }
}

export default createStore(states, actions)