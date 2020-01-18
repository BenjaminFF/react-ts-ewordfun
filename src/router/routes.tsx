import home from '@view/home'
import set from '@view/set'
import login from '@view/login'

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
    },
    {
        path: '/login',
        component: login,
        exact: true
    }
]

export default routes