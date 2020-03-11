import React, { ComponentFactory, useState, useEffect } from 'react'
import Underscore from './underscore'
import Squaregrid from './squaregrid'
import useStore from '@model/wordcomb'

export enum Status {
    Success = 'success',
    Error = 'error',
    Normal = 'normal'
}

interface Props {
    term: string
    definition: string
    row?: number
    callBack?: (status: Status) => void
}

const Wordcomb: React.FC<Props> = ({ term, definition, row = 3, callBack }) => {

    const [states, actions] = useStore(), { usArr, sgArr } = states, { init, cleanup } = actions

    useEffect(() => {
        init(row, term, callBack)
        return () => {
            cleanup()
        }
    }, [term, row])

    return (
        <div className='ef-wordcomb'>
            {usArr && <Underscore></Underscore>}
            <div className='ef-wordcomb__def'>{definition}</div>
            {sgArr && <Squaregrid cellSize='4.5rem' row={row}></Squaregrid>}
        </div>
    )
}

export default Wordcomb

