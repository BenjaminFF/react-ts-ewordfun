import home from '@view/home'
import set from '@view/set'
import login from '@view/login'
import createSet from '@view/createset'

let routes = [
    {
        path: '/',
        component: home,
        exact: true
    },
    {
        path: '/user/set',
        component: set,
        exact: true
    },
    {
        path: '/user/createSet',
        component: createSet,
        exact: true
    },
    {
        path: '/login',
        component: login,
        exact: true
    }
]

export default routes