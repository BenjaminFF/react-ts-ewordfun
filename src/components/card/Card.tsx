import React, { FC, FormEvent, Children, useState } from 'react'
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

export enum FilpType {
    Hover = 'hover',
    Click = 'click',
    Press = 'press'
}

interface Props {
    type?: CardType
    shadow?: ShandowType
    style?: Object
    className?: string | Object
    filp?: FilpType
}

const Card: FC<Props> = ({ type = CardType.Normal, shadow = ShandowType.Hover, children, style, className, filp = FilpType.Hover }) => {

    const [filped, setFilp] = useState<Boolean>(false)

    const classes = classNames('ef-card', className), sceneClasses = classNames('ef-card__scene', 'is-shadow-' + shadow, 'is-filp-' + filp, {
        'is-filped': filped
    })

    return (
        <div className={classes} style={style}>
            <div className={sceneClasses} onClick={() => { if (filp === FilpType.Click) setFilp(!filped) }}>
                {children}
            </div>
        </div>
    )
}

export default Card

