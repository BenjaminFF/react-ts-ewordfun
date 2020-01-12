import React, { FC, createContext } from 'react'



interface Props {
    model?: Object
    rules?: string
}

export const FormContext = React.createContext<Props>({ model: undefined })

const Form: FC<Props> = ({ model, rules, children }) => {

    return <FormContext.Provider value={{ model, rules }}><div>{children}</div></FormContext.Provider>
}

export default Form


