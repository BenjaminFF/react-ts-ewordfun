import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'

interface Props {

}

const Back: FC<Props> = ({ children }) => {

    const classes = classNames('ef-card__back')

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Back

