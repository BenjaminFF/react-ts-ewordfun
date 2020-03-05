import { randomStr } from '@utils/util'
import { createStore } from '@model/statebox'

const createNewItem = () => {
    return {
        id: randomStr(12),
        term: '',
        definition: '',
        addVisible: false
    }
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
    deleteItem(store, pos, listRef) {
        const { items } = store.states
        items.splice(pos, 1)
        store.setState({ items: [...items] })
        listRef.current.deleteNotify(pos)
    },
    setAddVisible(store, pos, addVisible) {
        const { items } = store.states
        if (items[pos]) {
            items[pos].addVisible = addVisible
            store.setState({ items: [...items] })
        }
    },
    onTextChange(store, e, id, type) {
        const { items } = store.states
        items.filter((item) => item.id === id)[0][type] = e.currentTarget.value
        store.setState({ items: [...items] })
    }
}

export default createStore(states, actions)