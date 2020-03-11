import { randomStr } from '@utils/util'
import { createStore } from '@model/statebox'
import Message from '@components/message'
import { Type } from '@components/message/Message'
import { createSet } from '@utils/api'

const createNewItem = () => {
    return {
        id: randomStr(12),
        term: '',
        definition: '',
        focus: [false, false]
    }
}

const checkEmpty = (items) => {
    let curTerms = []
    for (let i = 0; i < items.length; i++) {
        if (items[i].term === '') return { hasEmpty: true, type: 'term', index: i }
        if (items[i].definition === '') return { hasEmpty: true, type: 'definition', index: i }

        if (curTerms.filter((term) => items[i].term === term).length > 0) {
            return { hasEmpty: true, type: 'duplicate', index: i }
        }

        curTerms.push(items[i].term)
    }
    return { hasEmpty: false }
}

const states = {
    name: '',
    description: '',
    items: [],
    initCount: 3,
    uploading: false,
    inputUpdater: 0
}

const actions = {
    init(store, listRef) {
        const { initCount } = store.states
        let items = []
        while (items.length < initCount) {
            items.push(createNewItem())
        }
        items[0].focus[0] = true
        store.setState({ items })
        listRef.current.initNotify()
    },
    setItems(store, items) {
        store.setState({ items: [...items] })
    },
    addItem(store, pos, listRef) {
        const { items } = store.states
        items.splice(pos, 0, createNewItem())
        items.forEach((item) => { item.focus = [false, false] })
        items[pos].focus[0] = true
        store.setState({ items: [...items] })
        listRef.current.appendNotify(pos)
    },
    deleteItem(store, pos, listRef, errMsg) {
        const { items } = store.states
        if (items.length <= 3) {
            Message({ type: Type.Error, message: errMsg, duration: 1500 })
            return
        }
        items.splice(pos, 1)
        store.setState({ items: [...items] })
        listRef.current.deleteNotify(pos)
    },
    onTextChange(store, e, id, type) {
        const { items } = store.states
        items.filter((item) => item.id === id)[0][type] = e.currentTarget.value
        store.setState({ items: [...items] })
    },
    openDialog(store, t, dialogRef) {
        const { items, inputUpdater } = store.states, checkInfo = checkEmpty(items)

        if (checkInfo.hasEmpty) {
            if (checkInfo.type === 'duplicate') {
                Message({ type: Type.Error, duration: 1500, message: t('setcreate:item')[3] })
            } else {
                Message({ type: Type.Error, duration: 1500, message: t('setcreate:item', { pos: checkInfo.index + 1 })[checkInfo.type === 'term' ? 1 : 2] })
            }
            items.forEach((item) => { item.focus = [false, false] })
            items[checkInfo.index].focus[checkInfo.type === 'definition' ? 1 : 0] = true
            store.setState({ items: [...items], inputUpdater: inputUpdater + 1 })
            return
        }

        dialogRef.current.setVisible(true)
    },
    onDialogTextChange(store, e, type, history) {
        store.setState({ [type]: e.currentTarget.value })
    },
    createSetToServer(store, t, dialogRef, history) {
        const { name, description, items } = store.states, terms = Array.from(items, (item) => ({ term: item.term, definition: item.definition }))
        if (name === '') {
            Message({ type: Type.Error, duration: 1500, message: t('setcreate:dialog')['err'][0] })
            return
        }
        store.setState({ uploading: true })
        dialogRef.current.setClickDisabled(true)
        createSet(name, description, JSON.stringify(terms)).then((res) => {
            const { errno, errmsg } = res.data
            if (errno === 0) {
                store.setState({ uploading: false })
                dialogRef.current.setClickDisabled(false)
                Message({ type: Type.Success, duration: 1500, message: t('setcreate:dialog')['createSuccess'] })
                history.push('/set')
            } else {
                Message({ type: Type.Error, duration: 1500, message: errmsg })
            }
        }).catch((err) => {
            store.setState({ uploading: false })
            dialogRef.current.setClickDisabled(false)
            Message({ type: Type.Error, duration: 1500, message: '创建失败' })
        })
    }
}

export default createStore(states, actions)