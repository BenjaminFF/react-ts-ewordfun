import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'

interface Props {
    className?: string | Object
}

const Back: FC<Props> = ({ children, className }) => {

    const classes = classNames('ef-card__back', className)

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Back

