import React, { FC, FormEvent, Children, useState, useEffect } from 'react'
import classNames from 'classnames'

interface Props {
    cur: number
    num: number
    className?: string | Object
    style: Object
    onCurChange?: (cur: number) => void
}

interface Item {
    active: boolean
}

const Pagination: FC<Props> = ({ className, cur = 0, num, style, onCurChange }) => {

    const classes = classNames('ef-pagination__item', className), [items, setItems] = useState<Array<Item>>([])

    useEffect(() => {
        const items = []
        while (items.length < num && num > 1) {
            items.push({ active: false })
        }
        if (cur < items.length) items[cur].active = true
        setItems(items)
    }, [num])

    const curChange = (cur: number) => {
        if (items[cur].active) return
        items.forEach((item, index) => {
            index === cur ? item.active = true : item.active = false
        })
        setItems([...items])
        if (onCurChange) onCurChange(cur)
    }

    return (
        <div className='ef-pagination' style={style}>
            {items && items.map((item, index) => (
                <div className={classNames('ef-pagination__item', {
                    'is-active': item.active
                })} key={index} onClick={() => { curChange(index) }}></div>
            ))}
        </div>
    )
}

export default Pagination

