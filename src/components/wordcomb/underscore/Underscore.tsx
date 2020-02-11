import React, { FC } from 'react'
import { Status, Item } from '@components/wordcomb'
import classNames from 'classnames'

interface Props {
    arr: Array<Item>
    status: Status
    onCallback: () => void
}

const Underscore: React.FC<Props> = ({ arr, status, onCallback }) => {

    return (
        <div className='ef-underscore' onClick={() => { onCallback() }}>
            {
                arr.map((item, index) => (
                    <div key={index} className={classNames('ef-underscore__item', {
                        'is-active': item.active,
                        'is-space': item.isSpace,
                        'is-success': status === Status.Success && item.active,
                        'is-error': status === Status.Error && item.active
                    })}>{item.t}</div>
                ))
            }
        </div>
    )
}

export default Underscore

