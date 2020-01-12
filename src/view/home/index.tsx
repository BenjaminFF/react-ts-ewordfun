import React, { useState, FormEvent } from 'react'
import styles from './index.module.scss'
import { Form, FormItem } from '@components/form'
import Input from '@components/input'

const Home = () => {
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    const rules = {
        email: [
            { required: true, message: '请输入正确的邮箱', type: 'email' }
        ],
        password: [
            { required: true, message: '请输入正确的密码格式', type: 'string' },
            { min: 6, message: '密码长度不低于6位' }
        ]
    }

    return <div className={styles.home}>
        <Form model={form} rules={rules}>
            <FormItem>
                <Input value={form.email} onChange={handleChange} name='email'>
                </Input>
            </FormItem>
            <FormItem prop='password'>
                <Input value={form.password} onChange={handleChange} name='password'>
                </Input>
            </FormItem>
        </Form>
    </div >
}

export default Home