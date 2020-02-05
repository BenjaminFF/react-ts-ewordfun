import React, { FC, FormEvent, useMemo, useState } from 'react'
import classNames from 'classnames'

export enum GridStatus {
    Success,
    Error,
    Normal
}

interface Item {
    active: boolean
    t: string | number
}

interface Props {
    arr: Array<string | number>
    cellSize: string
    row: number
    status: GridStatus
    onItemCallback?: (item: string | number) => void
}


//后面还要添加focus,blur,input等事件
const Squaregrid: FC<Props> = ({ arr, cellSize, row, status, onItemCallback }) => {

    const [mArr, setmArr] = useState<Array<Item>>(Array.from(arr, t => ({ t, active: false })))

    const onItemClick = (index: number) => {
        if (mArr[index].active || status !== GridStatus.Normal) return

        if (onItemCallback) onItemCallback(mArr[index].t)
        mArr[index].active = true
        setmArr([...mArr])
    }

    return (
        <div style={{ grid: `repeat(${row},${cellSize})/repeat(${row},${cellSize})` }} className='ef-squaregrid'>
            {mArr.map((item, i) => (
                <div key={i} className={classNames('ef-squaregrid__item', {
                    'is-active': status === GridStatus.Normal && item.active,
                    'is-success': status === GridStatus.Success && item.active,
                    'is-error': status === GridStatus.Error && item.active,
                    'is-disable-hover': status !== GridStatus.Normal
                })} onClick={() => { onItemClick(i) }} > {item.t}</div>
            ))
            }
        </div >
    )
}

export default Squaregrid

