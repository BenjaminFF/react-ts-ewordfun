import React, { useState, FormEvent } from 'react'
import styles from './index.module.scss'
import { Form, FormItem } from '@components/form'
import Input from '@components/input'

const Home = () => {
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setForm({ ...form, [e.currentTarget.name]: e.currentTarget.value })
    }

    return <div className={styles.home}>
        <Form model={form} rules='rules'>
            <FormItem>
                <Input value={form.email} onChange={handleChange} name='email'>
                </Input>
            </FormItem>
            <FormItem>
                <Input value={form.email} onChange={handleChange} name='password'>
                </Input>
            </FormItem>
        </Form>
    </div >
}

export default Home