import home from '@view/home/index'
import set from '@view/set/index'

let routes = [
    {
        path: '/',
        component: home,
        exact: true
    },
    {
        path: '/set',
        component: set,
        exact: true
    }
]

export default routes