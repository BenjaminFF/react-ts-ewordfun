import React, { FC } from 'react'
import { Status } from '@components/pagecomps/wordcomb'
import classNames from 'classnames'
import useStore from '@model/wordcomb'

interface Props {
    cellSize: string
    row: number
}

interface Item {
    active: boolean
    t: string
}

const Squaregrid: FC<Props> = ({ cellSize, row }) => {

    const [states, actions] = useStore(), { sgArr, status } = states, { onCellClick } = actions

    return (
        <div style={{ grid: `repeat(${row},${cellSize})/repeat(${row},${cellSize})` }} className='ef-squaregrid'>
            {sgArr.map((item: Item, i: number) => (
                <div key={i} className={classNames('ef-squaregrid__item', {
                    'is-active': status === Status.Normal && item.active,
                    'is-success': status === Status.Success && item.active,
                    'is-error': status === Status.Error && item.active,
                    'is-disable-hover': status !== Status.Normal
                })} onClick={() => { onCellClick(i) }} > {item.t}</div>
            ))
            }
        </div>
    )
}

export default Squaregrid

