import React, { useContext, useEffect } from 'react'
import { FormContext } from './Form'
import AsyncValidator from 'async-validator'

interface Props {
    prop?: string
}


const FormItem: React.FC<Props> = ({ children, prop }) => {

    const { model, rules } = useContext(FormContext), value = (rules && model && prop && rules[prop] && model[prop]) || ''

    useEffect(() => {
        if (rules && prop && model) {
            const validator = new AsyncValidator({ [prop]: rules[prop] })
            validator.validate({ [prop]: model[prop] }).then(() => {

            }).catch(({ errors, fields }) => {
                console.log(errors[0].message)
            })
        }
    }, [value])

    return <div>{children}</div>
}

export default FormItem


