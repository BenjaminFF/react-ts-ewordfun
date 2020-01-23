import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'

interface Props {

}


//后面还要添加focus,blur,input等事件
const Front: FC<Props> = ({ children }) => {

    const classes = classNames('ef-card__front')

    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Front

