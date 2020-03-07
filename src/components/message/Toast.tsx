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

    const classes = classNames('ef-message-box__toast', 'ef-message-box__toast--' + type)

    useEffect(() => {
        const timer = setTimeout(() => {
            willUnMount()
        }, duration >= 1000 ? duration : 1000)
    }, [])

    return (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Toast

