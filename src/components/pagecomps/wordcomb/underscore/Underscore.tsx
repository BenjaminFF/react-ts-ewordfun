import React, { FC } from 'react'
import { Status } from '@components/pagecomps/wordcomb'
import classNames from 'classnames'
import useStore from '@model/wordcomb'

interface Item {
    active: boolean
    t: string
    isSpace?: boolean
}

interface Props {

}

const Underscore: React.FC<Props> = () => {

    const [states, actions] = useStore(), { usArr, status } = states, { onUSClick } = actions

    return (
        <div className='ef-underscore' onClick={() => { onUSClick() }}>
            {
                usArr.map((item: Item, index: number) => (
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

