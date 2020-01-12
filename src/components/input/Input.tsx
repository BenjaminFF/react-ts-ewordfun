import React, { FC, createContext, FormEvent, useEffect, useState } from 'react'
import { on } from 'cluster'

interface Props {
    value?: string
    onChange?: any
    name?: string
}

const Input: React.FC<Props> = ({ value, onChange, name }) => {

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        if (onChange) onChange(e)
    }

    return (
        <div>
            <input onChange={handleChange} name={name} />
        </div>
    )
}

export default Input

