import React, { FC, useEffect } from 'react'
import classNames from 'classnames'
import Input from '@components/input'
import useStore from '@model/wordspell'

export enum Status {
    Success = 'success',
    Error = 'error',
    Normal = 'normal'
}

interface Props {
    term: string
    definition: string
    callBack?: (status: Status) => void
}

const Wordspell: FC<Props> = ({ term, definition, callBack }) => {

    const [states, actions] = useStore(), { value, status, validated } = states, { onInputChange, validateAnswer, cleanup } = actions

    useEffect(() => {
        return () => { cleanup() }
    }, [term, definition])

    return (
        <div className={classNames('ef-wordspell', {
            'is-success': status === 'success',
            'is-error': status === 'error'
        })}>
            <div className='ef-wordspell__def'>{definition}</div>
            <Input value={value} onChange={(e: Event) => { onInputChange(e) }} focus={true} suffixIcon={classNames('ewordfun', {
                'rte-tick': validated && status === 'success',
                'rte-close': validated && status === 'error'
            })} onKeyUp={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') validateAnswer(term, callBack)
            }} underline>
            </Input>
        </div>
    )
}

export default Wordspell

