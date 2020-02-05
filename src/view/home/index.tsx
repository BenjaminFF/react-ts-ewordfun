import React, { useState, FormEvent, useRef, FC } from 'react'
import styles from './index.module.scss'
import Form, { FormItem, FormInstance } from '@components/form'
import Input from '@components/input'
import { Login } from '@utils/api'
import Button, { ButtonType, ButtonSize } from '@components/button'
import Card, { Front, Back, CardInstance } from '@components/card'
import { CardType, FlipType } from '@components/card'
import Cardstack from '@components/cardstack'
import { ShandowType } from '@components/card/Card'
import { shuffle, splitStr } from '@utils/util'
import Squaregrid, { GridStatus } from '@components/squaregrid'

const rules = {
    email: [
        { required: true, message: '请输入正确的邮箱', type: 'email', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入正确的密码格式', type: 'string' },
        { min: 6, message: '密码长度不低于6位' },
        {
            validator: (rule: Object, value: string, callback: Function) => {
                if (value === 'abcdefg') {
                    callback()
                } else {
                    callback(new Error('自定义规则不匹配'))
                }
            },
            trigger: 'blur'
        }
    ]
}

const cardList = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])

const Home: FC = () => {
    const [form, setForm] = useState({ email: '', password: '' }), formRef = useRef<FormInstance>(null), cardRef = useRef<CardInstance>(null),
        [status, setStatus] = useState(GridStatus.Normal)

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    const submit = (): void => {
        // Login('a', 'a', 'a', 'a').then((res) => { console.log('gg') })
        if (formRef.current) {
            formRef.current.validate((valid?: boolean) => {
                console.log(valid)
            })
        }
    }

    const flip = (): void => {
        if (cardRef.current) {
            cardRef.current.flip()
        }
    }

    return (
        <div className={styles.home}>
            <Squaregrid arr={cardList} cellSize={'4rem'} row={3} status={status} onItemCallback={(item) => { if (item === 9) setStatus(GridStatus.Error) }}></Squaregrid>
        </div >
    )
}

export default Home