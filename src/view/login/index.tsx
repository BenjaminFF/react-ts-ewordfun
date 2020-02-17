import React, { FC, FormEvent, useEffect, useRef } from 'react'
import style from './index.module.scss'
import { login } from '@utils/api'
import Card, { Front, Back, CardInstance, CardType } from '@components/card'
import Form, { FormItem } from '@components/form'
import Input from '@components/input'
import Button, { ButtonType, ButtonSize } from '@components/button'

const Login: FC = () => {

    const cardRef = useRef<CardInstance>(null)

    return (
        <div className={style.login}>
            <Card className={style.card} ref={cardRef} type={CardType.Flip}>
                <Front>
                    <div className={style.title}>EWORDFUN</div>
                    <Form>
                        <FormItem>
                            <Input></Input>
                        </FormItem>
                        <FormItem>
                            <Input></Input>
                        </FormItem>
                    </Form>
                    <Button matchParent type={ButtonType.Primary}>SIGN UP</Button>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type={ButtonType.Text}>FORGET PW?</Button>
                        <Button type={ButtonType.Text} onClick={() => { cardRef.current?.flip() }}>SIGN IN</Button>
                    </div>
                </Front>
                <Back>

                </Back>
            </Card>
        </div>
    )
}

export default Login