import React, { useContext, useEffect, useState } from 'react'
import { FormContext, Model, Rules } from './Form'
import AsyncValidator from 'async-validator'
import classNames from 'classnames'

interface Props {
    prop?: string
    children?: any
}

const validate = (trigger: string, rules?: Rules, prop?: string, model?: Model, cb?: Function): void => {
    if (rules && prop && model && rules.hasOwnProperty(prop) && model.hasOwnProperty(prop)) {
        const filteredRules = rules[prop].filter((rule: any) => {
            return !rule.trigger || !trigger || trigger === rule.trigger
        })

        if (filteredRules.length === 0) {
            return
        }

        const validator = new AsyncValidator({ [prop]: filteredRules })
        validator.validate({ [prop]: model[prop] }).then(() => {
            if (cb) cb(true)
        }).catch(({ errors }) => {
            if (cb) cb(false, errors[0].message)
        })
    }
}

const FormItem: React.FC<Props> = ({ children, prop }) => {

    const { model, rules, triggerValidate } = useContext(FormContext),
        [triggerChange, setTriggerChange] = useState<number>(0),
        [valid, setValid] = useState<boolean | null>(null),
        [errMsg, setErrMsg] = useState<string | undefined>('')

    const classes = classNames('ef-form-item',
        {
            'is-error': !valid && valid != null
        }
    )


    useEffect(() => {
        if (triggerValidate > 0) {
            validate('', rules, prop, model, (valid: boolean, errMsg: string) => {
                setValid(valid)
                setErrMsg(errMsg)
            })
        }
    }, [triggerValidate])

    // 在这里处理onChange时的验证（因为onChange的值延迟）
    useEffect(() => {
        if (triggerChange > 0) {
            validate('change', rules, prop, model, (valid: boolean, errMsg: string) => {
                setValid(valid)
                setErrMsg(errMsg)
            })
        }
    }, [triggerChange])

    return (
        <div onBlur={() => {
            validate('blur', rules, prop, model, (valid: boolean, errMsg: string) => {
                setValid(valid)
                setErrMsg(errMsg)
            })
        }} className={classes}
            onChange={() => { setTriggerChange(triggerChange + 1) }}>
            {children}
            <div className="ef-form-item__error-msg"> {!valid && valid != null ? errMsg : ''}</div>
        </div>
    )
}

export default FormItem


