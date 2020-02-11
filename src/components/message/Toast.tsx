import React, { FC, useEffect } from 'react'
import { Type } from './Message'
import classNames from 'classnames'

interface Props {
    message: string
    type?: Type
    duration?: string
    willUnMount: () => void
}

const Toast: FC<Props> = ({ message, type = Type.Info, willUnMount, duration }) => {

    const classes = classNames('ef-message-box__toast', 'ef-message-box__toast--' + type)

    return (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Toast

