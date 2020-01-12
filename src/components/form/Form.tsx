import React, { FC, createContext } from 'react'

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
            <div>{children}</div>
        </FormContext.Provider>
    )
}

export default Form


