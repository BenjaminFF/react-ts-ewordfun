import React, { FC, FormEvent } from 'react'
import classNames from 'classnames'

interface Props {
    value?: string
    onChange?: any
    name?: string
    disabled?: boolean
    prefixIcon?: string
    suffixIcon?: string
    type?: string
    placeholder?: string
}


//后面还要添加focus,blur,input等事件
const Input: FC<Props> = ({ value, onChange, name, disabled, prefixIcon, suffixIcon, type = 'text', placeholder = '' }) => {

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        if (onChange) onChange(e)
    }

    const innerClasses = classNames('ef-input__inner', {
        'is-prefix-icon': prefixIcon,
        'is-suffix-icon': suffixIcon
    })

    return (
        <div className={`ef-input ${disabled ? 'is-disabled' : ''}`}>
            {prefixIcon && <i className={`ef-input__prefix-icon ewordfun ${prefixIcon}`}></i>}
            <input onChange={handleChange} name={name} className={innerClasses} autoComplete="off" disabled={disabled} type={type} placeholder={placeholder} value={value} />
            {suffixIcon && <i className={`ef-input__suffix-icon ewordfun ${suffixIcon}`}></i>}
        </div>
    )
}

export default Input

