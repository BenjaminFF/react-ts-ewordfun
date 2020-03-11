import config from './config'
import axios from 'axios'
import Message from '@components/message'

// ## errno for service

// - 0 业务请求成功
// - 401 业务请求失败
// - 402 数据格式或者请求方法错误
// - 403 数据库异常
// - 405 没有权限
// - 406 非法请求

const service = axios.create(config)

service.interceptors.request.use(
    config => {
        //做重复请求限制
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    config => {
        const { errno } = config.data,
            { pathname } = window.location,
            isProtectedPage = pathname.indexOf('user') !== -1

        if (errno === 405 && isProtectedPage) {
            window.location.replace('/login')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const post = (url: string, params?: Object): Promise<Object> => {
    return new Promise((resolve, reject) => {
        service.post(url, params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

const get = (url: string, params?: Object): Promise<Object> => {
    return new Promise((resolve, reject) => {
        service.get(url, { params }).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


// api

// user
const login = (timestamp: string, nonce: string, email: string, password: string) => post('/api/user/login', { timestamp, nonce, email, password })
const logout = () => post('/api/user/logout')

// set
const listSets = () => get('/api/set/list')
const acquireSet = (sid: number, origin_id: string) => get('/api/set/acquire', { sid, origin_id })
const createSet = (name: string, description: string, terms: string) => post('/api/set/create', { name, description, terms })

export {
    login,
    logout,
    listSets,
    acquireSet,
    createSet
}



