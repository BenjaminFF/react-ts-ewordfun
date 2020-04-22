import React, { FC, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

interface Props {
    className?: string | Object
    style?: Object
    duration?: number
    easing?: string
    onClick?: () => void
    onLongClick?: () => void
    onLongPress?: () => void
    pressDuration?: number
    rippleColor?: string
}

interface Pos {
    dx: number
    dy: number
}

const Ripple: FC<Props> = ({ children, className, style, duration = 1000, easing = 'linear', onLongPress, pressDuration = 500, onClick, onLongClick, rippleColor = 'lightgray' }) => {

    const [isRippling, setRippling] = useState(false), [pos, setPos] = useState<Pos>({ dx: 0, dy: 0 }),
        rippleRef = useRef(null), isPressing = useRef(false), hasPressed = useRef(false), isMountedRef = useRef(false)

    useEffect(() => {
        isMountedRef.current = true
        return () => { isMountedRef.current = false }
    }, [])

    const onMouseDown = (e: React.MouseEvent) => {
        if (!isRippling) {
            // @ts-ignore
            const { offsetLeft, offsetTop, clientWidth, clientHeight } = rippleRef.current, { pageX, pageY } = e
            setRippling(true)
            isPressing.current = true
            setPos({ dx: pageX - offsetLeft - clientWidth / 2, dy: pageY - offsetTop - clientHeight / 2 })
            setTimeout(() => {
                if (isMountedRef.current) setRippling(false)
            }, duration)
            setTimeout(() => {
                if (isPressing.current) {
                    if (onLongPress) onLongPress()
                    hasPressed.current = true
                }
            }, pressDuration)
        }
    }

    const onMouseUp = () => {
        isPressing.current = false
        if (hasPressed.current) {
            if (!onLongPress && onLongClick) onLongClick()
            hasPressed.current = false
        } else {
            if (onClick) onClick()
        }
    }

    return (
        <div onMouseUp={() => { onMouseUp() }} className={`ef-ripple`} style={style} ref={rippleRef}>
            {children}
            <div className='ef-ripple__shandow-container' onMouseDown={(e: React.MouseEvent) => { onMouseDown(e) }}>
                <div className={classNames('ef-ripple__shandow', {
                    'is-rippling': isRippling
                })} style={{
                    left: `${pos.dx}px`, top: `${pos.dy}px`,
                    animationDuration: duration / 1000 + 's',
                    animationTimingFunction: easing,
                    backgroundColor: rippleColor
                }}>
                </div>
            </div>
        </div>
    )
}

export default Ripple

