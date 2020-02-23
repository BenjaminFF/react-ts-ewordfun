import React, { FC, FormEvent, useEffect, useRef } from 'react'
import style from './index.module.scss'
import LoginComp from '@components/pagecomps/login'

const Login = () => {

    return (
        <div className={style.login}>
            <LoginComp></LoginComp>
        </div>
    )
}

export default Login