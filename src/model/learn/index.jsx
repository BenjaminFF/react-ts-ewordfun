import { acquireSet } from "@utils/api"
import { createStore } from "@model/statebox"

const states = {
    terms: []
}

const actions = {
    init(store, sid, origin_id) {
        acquireSet(sid, origin_id).then((res) => {
            console.log(res.data)
        })
    }
}

export default createStore(states, actions)

