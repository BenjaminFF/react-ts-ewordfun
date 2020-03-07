import { randomStr } from '@utils/util'
import { createStore } from '@model/statebox'
import Message from '@components/message'
import { Type } from '@components/message/Message'

const createNewItem = () => {
    return {
        id: randomStr(12),
        term: '',
        definition: '',
        focus: [false, false]
    }
}

const checkEmpty = (items) => {
    for (let i = 0; i < items.length; i++) {
        if (items[i].term === '') return { hasEmpty: true, type: 'term' }
        if (items[i].definition === '') return { hasEmpty: true, type: 'definition' }
    }
    return { hasEmpty: false }
}

const states = {
    items: [],
    initCount: 3
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
    createSet(store) {
        const { items } = store.states
        if (checkEmpty(items).hasEmpty) {
            // Message({ type: Type.Error, duration: 1500 })   
        }
    }
}

export default createStore(states, actions)