import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'

interface Props {
    className?: string | Object
    percentage?: number
    strokeWidth?: number
    style?: Object
}

const Progress: FC<Props> = ({ children, className, percentage = 0, strokeWidth = 10, style }) => {

    return (
        <div className={`ef-progress ${className}`} style={{ height: strokeWidth + 'px', ...style }}>
            <div className='ef-progress__bg'>
                <div className='ef-progress__bar' style={{ width: `${percentage > 100 ? 100 : percentage}%` }}></div>
            </div>

        </div>
    )
}

export default Progress

