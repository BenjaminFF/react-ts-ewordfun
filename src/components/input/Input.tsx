import React, { FC, FormEvent } from 'react'
import classNames from 'classnames'

interface Props {
    value?: string
    onChange?: any
    name?: string
    disabled?: boolean
}


//后面还要添加focus,blur,input等事件
const Input: FC<Props> = ({ value, onChange, name, disabled }) => {

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        if (onChange) onChange(e)
    }

    return (
        <div className={`ef-input ${disabled ? 'is-disabled' : ''}`}>
            <input onChange={handleChange} name={name} className="ef-input__inner" autoComplete="off" disabled={disabled} />
        </div>
    )
}

export default Input

