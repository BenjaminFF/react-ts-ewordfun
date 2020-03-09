import React, { FC, FormEvent, Children, useState, useEffect, forwardRef, useImperativeHandle } from 'react'
import classNames from 'classnames'
import { types } from '@babel/core'
import TWEEN from '@utils/tween'
import { on } from 'cluster'

interface Props {
    className?: string | Object
    closeOnClickModel?: boolean
}

export interface DialogInstance {
    setVisible: (visible: boolean) => void
    setClickDisabled: (disabled: boolean) => void
}

export const DialogInstance = undefined

const Dialog: FC<Props> = ({ children, className, closeOnClickModel = true }, ref) => {

    const classes = classNames(className, 'ef-dialog'), [visible, setMVisible] = useState(false),
        [opacity, setOpacity] = useState(0), [offsetY, setOffsetY] = useState(0), [clickDisabled, setMClickDisabled] = useState(false)

    useImperativeHandle(ref, () => ({
        setVisible: (visible: boolean) => {
            startTransition(visible ? 'enter' : 'leave')
        },
        setClickDisabled: (disabled: boolean) => {
            setMClickDisabled(disabled)
        }
    }))

    const onModelClick = (event: React.MouseEvent<HTMLElement>) => {
        if (event.target === event.currentTarget && closeOnClickModel && !clickDisabled) {
            startTransition('leave')
        }
    }

    const startTransition = (type: string, onStopCallback?: Function) => {
        const opacity = type === 'enter' ? 0 : 1, offsetY = type === 'enter' ? 0 : 20
        if (type === 'enter') setMVisible(true)
        new TWEEN.Tween().from({ opacity, offsetY }).to({ opacity: Math.abs(opacity - 1), offsetY: Math.abs(offsetY - 20) }, 150).easing(TWEEN.Easing.Linear).onUpdate(({ opacity, offsetY }) => {
            setOpacity(opacity)
            setOffsetY(offsetY)
        }).onStop(() => {
            if (type === 'leave') setMVisible(false)
        }).start()
    }

    return visible ? (
        <div className='ef-model' onClick={onModelClick} style={{ opacity }}>
            <div className={classes} style={{ transform: `translateY(${offsetY}px)`, opacity, pointerEvents: clickDisabled ? 'none' : 'auto' }}>
                {children}
                <i className={`ef-dialog__close ewordfun rte-close`} onClick={() => { startTransition('leave') }}></i>
            </div>
        </div>
    ) : null
}

export default forwardRef<DialogInstance, Props>(Dialog)

