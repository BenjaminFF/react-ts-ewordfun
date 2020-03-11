import React, { ComponentFactory, useState, useEffect } from 'react'
import useStore from '@model/multichoice'
import classNames from 'classnames'

export enum Status {
    Success = 'success',
    Error = 'error',
    Normal = 'normal'
}

interface Option {
    active: boolean
    text: string
}

interface Props {
    term: string
    definition: string
    otherOptions: Array<string>
    callBack?: (status: Status) => void
}

const Multichoice: React.FC<Props> = ({ term, definition, otherOptions, callBack }) => {

    const [states, actions] = useStore(), { options } = states, { init, onOptionClick } = actions

    useEffect(() => {
        init(otherOptions, term)
    }, [term])

    return (
        <div className='ef-multichoice'>
            <div className='ef-multichoice__definition'>{definition}</div>
            {options && options.map((option: Option, index: number) => (
                <div className={classNames('ef-multichoice__option', { 'is-active': option.active })} key={index} onClick={() => { onOptionClick(index, callBack) }}>
                    {option.text}
                </div>
            ))}
        </div>
    )
}

export default Multichoice

