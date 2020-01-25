import React, { FC, createContext, useState, forwardRef, useImperativeHandle } from 'react'
import AsyncValidator from 'async-validator'

export interface Model {
    [key: string]: string | number
}

export interface Rules {
    [key: string]: Array<Object>
}

interface Props {
    model?: Model
    rules?: Rules
    children?: any
}

interface Context {
    model?: Model
    rules?: Rules
    triggerValidate: number
}

export interface FormInstance {
    validate: (cb?: Function) => void
}

export const FormInstance = undefined

export const FormContext = createContext<Context>({ model: undefined, rules: undefined, triggerValidate: 0 })

const Form: FC<Props> = ({ model, rules, children }, ref) => {

    const [triggerValidate, setTriggerValidate] = useState<number>(0)

    useImperativeHandle(ref, () => ({
        validate: (cb?: Function) => {
            if (rules && model) {
                const validator = new AsyncValidator(rules)
                validator.validate(model).then(() => {
                    if (cb) {
                        cb(true)
                    }
                }).catch((error) => {
                    setTriggerValidate(triggerValidate + 1)
                    if (cb) {
                        cb(false)
                    }
                })
            }
        }
    }))

    return (
        <FormContext.Provider value={{ model, rules, triggerValidate }}>
            <div className="ef-form"> {children}</div>
        </FormContext.Provider >
    )
}

export default forwardRef<FormInstance, Props>(Form)


