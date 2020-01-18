import React, { FC, FormEvent } from 'react'
require('./style.scss')

interface Props {
    value?: string
    onChange?: any
    name?: string
}

const Input: FC<Props> = ({ value, onChange, name }) => {

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        if (onChange) onChange(e)
    }

    return (
        <div className="ef-input-container">
            <input onChange={handleChange} name={name} className="ef-input" autoComplete="off" />
        </div>
    )
}

export default Input

