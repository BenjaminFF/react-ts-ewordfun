import React, { FC } from 'react'
import { Status, Item } from '@components/pagecomps/wordcomb'
import classNames from 'classnames'

interface Props {
    arr: Array<Item>
    cellSize: string
    row: number
    status: Status
    onItemCallBack?: (index: number) => void
}

const Squaregrid: FC<Props> = ({ arr, cellSize, row, status, onItemCallBack }) => {

    const onItemClick = (index: number) => {
        if (arr[index].active || status !== Status.Normal) return

        if (onItemCallBack) onItemCallBack(index)
    }

    return (
        <div style={{ grid: `repeat(${row},${cellSize})/repeat(${row},${cellSize})` }} className='ef-squaregrid'>
            {arr.map((item, i) => (
                <div key={i} className={classNames('ef-squaregrid__item', {
                    'is-active': status === Status.Normal && item.active,
                    'is-success': status === Status.Success && item.active,
                    'is-error': status === Status.Error && item.active,
                    'is-disable-hover': status !== Status.Normal
                })} onClick={() => { onItemClick(i) }} > {item.t}</div>
            ))
            }
        </div>
    )
}

export default Squaregrid

