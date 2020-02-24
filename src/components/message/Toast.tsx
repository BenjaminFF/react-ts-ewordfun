import React, { FC, useEffect, useState } from 'react'
import { Type } from './Message'
import classNames from 'classnames'

interface Props {
    message: string
    type?: Type
    duration?: number
    willUnMount: () => void
}

const Toast: FC<Props> = ({ message, type = Type.Info, willUnMount, duration = 1000 }) => {

    const classes = classNames('ef-message-box__toast', 'ef-message-box__toast--' + type), [visible, setVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            // setVisible(false)
            willUnMount()
        }, duration >= 1000 ? duration : 1000)
    }, [])

    return visible ? (
        <div className={classes}>
            {message}
        </div>
    ) : null
}

export default Toast

