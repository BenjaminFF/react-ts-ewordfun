import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { login } from '@utils/api'
import { randomStr } from '@utils/util'
import Card, { Front, Back, CardInstance, CardType } from '@components/card'
import Form, { FormItem } from '@components/form'
import Input from '@components/input'
import Button, { ButtonType, ButtonSize } from '@components/button'
import { useTranslation } from '@locale/I18n'

const Login = () => {

    const cardRef = useRef(), formRef = useRef(), [t, changeLang] = useTranslation(), [form, setForm] = useState({ email: '', password: '' }),
        rules = {
            email: [
                { required: true, trigger: 'blur', message: t('login:emailValidate')[0] },
                { type: 'email', trigger: 'blur', message: t('login:emailValidate')[1] }
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
                const timestamp = Date.now(), nonce = randomStr(12), { email, password } = form
                Login(timestamp, nonce, email, password).then((res) => {
                    console.log(res)
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
                            <Input prefixIcon='rte-password' type='password' placeholder={t('login:pwplaceholder')} value={form.pw} onChange={onChange} name='password'></Input>
                        </FormItem>
                    </Form>
                    <Button matchParent type={ButtonType.Primary} onClick={validateForm} loading>{t('login:signup')}</Button>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type={ButtonType.Text}>{t('login:forgetpw')}</Button>
                        <Button type={ButtonType.Text} onClick={() => { cardRef.current.flip() }}>{t('login:signin')}</Button>
                    </div>
                </Front>
                <Back>
                </Back>
            </Card>
        </div >
    )
}

export default Login