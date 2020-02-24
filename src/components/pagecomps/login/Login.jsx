import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { login } from '@utils/api'
import { randomStr } from '@utils/util'
import Card, { Front, Back, CardInstance, CardType } from '@components/card'
import Form, { FormItem } from '@components/form'
import Input from '@components/input'
import Button, { ButtonType, ButtonSize } from '@components/button'
import { useTranslation } from '@locale/I18n'
import Message from '@components/message'
import { Type } from '@components/message/Message'

const Login = () => {

    const cardRef = useRef(), formRef = useRef(), [t, changeLang] = useTranslation(), [form, setForm] = useState({ email: 'sadfjdsk@qq.com', password: 'dsafsafasf' }),
        [loading, setLoading] = useState(false),
        rules = {
            email: [
                { required: true, trigger: 'blur', message: t('login:emailValidate')[0] },
                { type: 'email', trigger: 'blur', message: t('login:emailValidate')[1] },
                {}
            ],
            password: [
                { required: true, trigger: 'blur', message: t('login:pwValidate')[0] },
                { min: 6, trigger: 'blur', message: t('login:pwValidate')[1] }
            ]
        }

    const onChange = (e) => {
        const { name, value } = e.currentTarget
        form[name] = value
        setForm({ ...form })
    }

    const validateForm = () => {
        formRef.current.validate((validate) => {
            if (validate) {
                setLoading(true)
                const timestamp = Date.now(), nonce = randomStr(12), { email, password } = form
                login(timestamp, nonce, email, password).then((res) => {
                    setLoading(false)
                    const { error, errmsg } = res.data
                    if (error === 0) {
                        //登录成功，跳转处理
                    } else {
                        Message({ message: errmsg, type: Type.Error, duration: 3000 })
                    }
                })
            }
        })
    }

    return (
        <div className='ef-login'>
            <Card className='ef-login__card' ref={cardRef} type={CardType.Flip}>
                <Front>
                    <div className='ef-login__title'>EWORDFUN</div>
                    <Form rules={rules} model={form} ref={formRef}>
                        <FormItem prop='email'>
                            <Input prefixIcon='rte-mine' placeholder={t('login:emailplaceholder')} value={form.email} onChange={onChange} name='email'></Input>
                        </FormItem>
                        <FormItem prop='password'>
                            <Input prefixIcon='rte-password' type='password' placeholder={t('login:pwplaceholder')} value={form.password} onChange={onChange} name='password'></Input>
                        </FormItem>
                    </Form>
                    <Button matchParent type={ButtonType.Primary} onClick={validateForm} loading={loading}>{t('login:signup')}</Button>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type={ButtonType.Text}>{t('login:forgetpw')}</Button>
                        <Button type={ButtonType.Text} onClick={() => { }}>{t('login:signin')}</Button>
                    </div>
                </Front>
                <Back>
                </Back>
            </Card>
        </div >
    )
}

export default Login