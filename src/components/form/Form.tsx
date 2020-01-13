import React, { FC, createContext } from 'react'
import style from './style.module.scss'

interface Model {
    [key: string]: string | number
}

interface Rules {
    [key: string]: Array<Object>
}

interface Props {
    model?: Model
    rules?: Rules
}

export const FormContext = createContext<Props>({ model: undefined, rules: undefined })

const Form: FC<Props> = ({ model, rules, children }) => {

    return (
        <FormContext.Provider value={{ model, rules }}>
            <div className="ef-form"> {children}</div>
        </FormContext.Provider >
    )
}

export default Form


