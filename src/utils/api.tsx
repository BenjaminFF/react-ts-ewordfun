import config from './config'
import axios from 'axios'

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
        const { errno } = config.data
        if (errno === 402) {
            
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

const post = (url: string, params: Object): Promise<Object> => {
    return new Promise((resolve, reject) => {
        service.post(url, params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}


// api
const Login = (timestamp: string, nonce: string, email: string, password: string) => post('/api/user/login', { timestamp, nonce, email, password })


export {
    Login
}



