import React, { FC, FormEvent, useEffect, useRef } from 'react'
import { login } from '@utils/api'
import Card, { Front, Back, CardInstance, CardType } from '@components/card'
import Form, { FormItem } from '@components/form'
import Input from '@components/input'
import Button, { ButtonType, ButtonSize } from '@components/button'

interface Props {
    
}

const Login: FC<Props> = () => {

    const cardRef = useRef<CardInstance>(null)

    return (
        <div className='ef-login'>
            <Card className='ef-login__card' ref={cardRef} type={CardType.Flip}>
                <Front>
                    <div className='ef-login__title'>EWORDFUN</div>
                    <Form>
                        <FormItem>
                            <Input prefixIcon='rte-mine'></Input>
                        </FormItem>
                        <FormItem>
                            <Input prefixIcon='rte-password' type='password'></Input>
                        </FormItem>
                    </Form>
                    <Button matchParent type={ButtonType.Primary}>SIGN IN</Button>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Button type={ButtonType.Text}>FORGET PW?</Button>
                        <Button type={ButtonType.Text} onClick={() => { cardRef.current?.flip() }}>SIGN UP</Button>
                    </div>
                </Front>
                <Back>
                </Back>
            </Card>
        </div>
    )
}

export default Login