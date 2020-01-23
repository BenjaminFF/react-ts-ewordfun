import React, { useState, FormEvent, useRef, FC } from 'react'
import styles from './index.module.scss'
import { Form, FormItem } from '@components/form'
import Input from '@components/input'
import { Login } from '@utils/api'
import Button, { ButtonType, ButtonSize } from '@components/button'
import Card, { Front, Back } from '@components/card'

interface FormInstance {
    validate: (cb?: Function) => void
}

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

const Home: FC = () => {
    const [form, setForm] = useState({ email: '', password: '' }), formRef = useRef<FormInstance>(null)

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

    return <div className={styles.home}>
        <Card className={styles.card}>
            <Front>
                <Form model={form} rules={rules} ref={formRef}>
                    <FormItem prop='email'>
                        <Input value={form.email} onChange={handleChange} name='email'>
                        </Input>
                    </FormItem>
                    <FormItem prop='password'>
                        <Input value={form.password} onChange={handleChange} name='password'>
                        </Input>
                    </FormItem>
                    <Button type={ButtonType.Primary} onClick={submit} matchParent> 提交</Button>
                </Form>
            </Front>
            <Back>Back</Back>
        </Card>
    </div>
}

export default Home