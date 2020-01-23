import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'

export enum CardType {
    Normal,
    Filp
}

export enum ShandowType {
    Always = 'always',
    Hover = 'hover',
    Never = 'never'
}

interface Props {
    type?: CardType,
    shadow?: ShandowType,
    style?: Object
    className?: string | Object
}

const Card: FC<Props> = ({ type = CardType.Normal, shadow = ShandowType.Always, children, style, className }) => {

    const classes = classNames('ef-card', 'is-shadow-' + shadow, className)

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}

export default Card

