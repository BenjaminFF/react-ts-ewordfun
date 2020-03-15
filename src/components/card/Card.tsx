import React, { FC, FormEvent, Children, useState, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'

export enum CardType {
    Normal = 'normal',
    Flip = 'flip'
}

export enum ShandowType {
    Always = 'always',
    Hover = 'hover',
    Never = 'never'
}

export enum FlipType {
    Hover = 'hover',
    Click = 'click',
    Press = 'press',
    Manual = 'manual'
}

export interface CardInstance {
    flip: () => void
}

export const CardInstance = undefined

interface Props {
    type?: CardType
    shadow?: ShandowType
    style?: Object
    className?: string | Object
    flip?: FlipType
    children?: any
}

const Card: FC<Props> = ({ type = CardType.Normal, shadow = ShandowType.Always, children, style, className, flip = FlipType.Manual }, ref) => {

    const [fliped, setFlip] = useState<Boolean>(false)

    useImperativeHandle(ref, () => ({
        flip: () => {
            if (flip === FlipType.Manual && type === CardType.Flip) {
                setFlip(!fliped)
            }
        }
    }))

    const classes = classNames('ef-card'), sceneClasses = classNames('ef-card__scene', 'is-shadow-' + shadow, 'is-type-' + type, 'is-flip-' + flip, className, {
        'is-fliped': fliped
    })

    return (
        <div className={classes} style={style}>
            <div className={sceneClasses} onClick={() => { if (flip === FlipType.Click && type === CardType.Flip) setFlip(!fliped) }}>
                {children}
            </div>
        </div>
    )
}

export default forwardRef<CardInstance, Props>(Card)

