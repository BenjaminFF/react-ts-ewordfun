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

const cardList = [1, 2, 3, 4, 5, 6, 7]

const Home: FC = () => {
    const [form, setForm] = useState({ email: '', password: '' }), formRef = useRef<FormInstance>(null), cardRef = useRef<CardInstance>(null)

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
            <Cardstack width='20rem' height='20rem' blur={false}>
                {
                    cardList.map((cardItem) => (
                        <Card className={styles.card} ref={cardRef} type={CardType.Flip} flip={FlipType.Click} key={cardItem} shadow={ShandowType.Never}>
                            <Front>
                                <div style={{ fontSize: '5rem' }}>{cardItem}</div>
                            </Front>
                            <Back>Back</Back>
                        </Card>
                    ))
                }
            </Cardstack>
        </div>
    )
}

export default Home