import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from './Form'
import AsyncValidator from 'async-validator'

interface Props {
    prop?: string
}

interface Rules {
    [key: string]: Array<Object>
}

const FormItem: React.FC<Props> = ({ children, prop }) => {

    const { model, rules } = useContext(FormContext),
        value = (prop && model && model[prop]) || '',
        [valid, setValid] = useState<boolean | null>(null),
        [errMsg, setErrMsg] = useState<string>('')

    const validate = (trigger: string): void | undefined => {
        if (rules && prop && model && rules[prop] && model[prop]) {
            const filteredRules = rules[prop].filter((rule: any) => {
                return !rule.trigger || !trigger || trigger === rule.trigger
            })

            const validator = new AsyncValidator({ [prop]: filteredRules })
            validator.validate({ [prop]: model[prop] }).then(() => {
                setValid(true)
            }).catch(({ errors }) => {
                setValid(false)
                setErrMsg(errors[0].message)
            })
        }
    }

    // 在这里处理onChange时的验证（因为onChange的值延迟）
    useEffect(() => {
        validate('change')
    }, [value])

    return (
        <div onBlur={() => { validate('blur') }}>
            {children}
            <div>{!valid ? errMsg : ''}</div>
        </div>
    )
}

export default FormItem


