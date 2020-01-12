import React, { useContext, useEffect } from 'react'
import { FormContext } from './Form'

interface Props {

}


const FormItem: React.FC<Props> = ({ children }) => {

    const formContext = useContext(FormContext)

    useEffect(() => {
        //处理验证
    }, [formContext.model])

    return <div>{children}</div>
}

export default FormItem


