import React, { FC, useRef, useEffect, useState, Children, createRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { useSprings } from 'react-spring'
import TWEEN, { EasingFunc } from '@utils/tween'
import Message from '@components/message'

export enum Orientation {
    Vertical,
    Horizontal
}

export enum AnimateType {
    Zoom,
    Slide
}

interface Props {
    duration?: number
    animateType?: AnimateType
    easing?: EasingFunc
    orientation?: Orientation
    children?: any
}

export interface AnimListInstance {
    deleteNotify: (key: number | string) => void
    appendNotify: (pos: number) => void
}

export const AnimListInstance = undefined

const getTransitionInfo = (orientation: Orientation, animateType: AnimateType, offsetX: number, offsetY: number) => {
    const mMap = new Map([
        [{ orientation: Orientation.Vertical, animateType: AnimateType.Slide }, { dx: 0 }],
        [{ orientation: Orientation.Vertical, animateType: AnimateType.Zoom }],
        [{ orientation: Orientation.Horizontal, animateType: AnimateType.Slide }, { name: 'dy', from: { dy: 0 }, to: { dy: -offsetY }, result: { dy } }],
        [{ orientation: Orientation.Horizontal, animateType: AnimateType.Slide }, { name: 'dy', from: { dy: -offsetY }, to: { dy: 0 }, result: { dy } }]
    ])
}

const Animlist: React.FC<Props> = ({ orientation = Orientation.Horizontal, animateType = AnimateType.Zoom, children, easing = TWEEN.Easing.Linear, duration = 400 }, ref) => {

    const [mArr, setMArr] = useState(Array.from(Children.toArray(children), (child, i) => ({ dx: 0, dy: 0, scalex: 1, scaley: 1, opacity: 1, ref: createRef<HTMLDivElement>(), child }))),
        [notify, setNotify] = useState({ type: 'delete', index: -1 })

    useLayoutEffect(() => {
        if (notify.index >= 0 && notify.index < children.length) {
            notify.type === 'delete' ? deleteTransition(notify.index) : appendTransition(notify.index)
        }
    }, [children])

    useLayoutEffect(() => {
        if (notify.index >= 0 && notify.index < mArr.length && notify.type === 'append') {
            appendTransition(notify.index)
        }
    }, [mArr.length])

    const deleteTransition = (curIndex: number) => {
        if (mArr.length === 0) throw new Error(('children count is zero'))
        const curNode = mArr[curIndex].ref.current
        let offsetX = 0, offsetY = 0
        if (curNode) {
            offsetX = curNode.offsetWidth
            offsetY = curNode.offsetHeight
        }

        new TWEEN.Tween().from({ dx: 0, opacity: 1, dy: 0 }).to({ dx: offsetX, opacity: 0, dy: -offsetY }, duration).easing(easing).onUpdate(({ dx, opacity, dy }) => {

            setMArr([...mArr])
        }).start()

        const delayTime = animateType === AnimateType.Zoom ? 0 : duration
        new TWEEN.Tween().from({ dy: 0, dx: 0 }).to({ dy: -offsetY, dx: -offsetX }, duration).delay(delayTime).easing(easing).onUpdate(({ dy, dx }) => {
            mArr.forEach((item, index) => {
                if (orientation === Orientation.Vertical) {
                    item.dy = index > curIndex ? dy : item.dy
                } else {
                    item.dx = index > curIndex ? dx : item.dx
                }
            })
            setMArr([...mArr])
        }).onStop(() => {
            mArr.forEach((item, index) => {
                item.dx = 0
                item.dy = 0
            })
            mArr.splice(curIndex, 1)
            setMArr([...mArr])
        }).start()
    }

    const appendTransition = (curIndex: number) => {
        if (mArr.length !== Children.count(children)) {
            const arr = [...mArr]
            arr.splice(curIndex, 0, { dx: 0, dy: 0, scalex: 1, scaley: 1, opacity: 0, ref: createRef<HTMLDivElement>(), child: Children.toArray(children)[curIndex] })
            setMArr([...arr])
        } else {
            const curNode = mArr[curIndex].ref.current
            let offsetX = 0, offsetY = 0
            if (curNode) {
                offsetX = curNode.offsetWidth
                offsetY = curNode.offsetHeight
            }

            // 防止闪烁
            mArr.forEach((item, index) => {
                if (index > curIndex) {
                    item.dy = -offsetY
                }
            })
            setMArr([...mArr])

            new TWEEN.Tween().from({ dy: -offsetY }).to({ dy: 0 }, duration).easing(easing).onUpdate(({ dy }) => {
                mArr.forEach((item, index) => {
                    if (index > curIndex) {
                        item.dy = dy
                    }
                })
                setMArr([...mArr])
            }).start()
            new TWEEN.Tween().from({ dx: -offsetX, opacity: 0 }).to({ dx: 0, opacity: 1 }, duration).delay(curIndex === mArr.length - 1 ? 0 : duration).easing(easing).onUpdate(({ dx, opacity }) => {
                mArr.forEach((item, index) => {
                    if (index === curIndex) {
                        item.dx = dx
                        item.opacity = opacity
                    }
                })
                setMArr([...mArr])
            }).start()
        }
    }

    useImperativeHandle(ref, () => ({
        deleteNotify: (pos: number) => {
            setNotify({ type: 'delete', index: pos })
        },
        appendNotify: (pos: number) => {
            setNotify({ type: 'append', index: pos })
        }
    }))

    const classes = classNames('ef-animlist', {
        'is-vertical': orientation === Orientation.Vertical,
        'is-horizontal': orientation === Orientation.Horizontal
    })

    return (
        <div className={classes}>
            {mArr.map((item, index) => (
                <div ref={item.ref} key={index} style={{ transform: `translate3d(${item.dx}px,${item.dy}px,0px) scaleX(${item.scalex}) scaleY(${item.scaley})`, opacity: item.opacity, transformOrigin: '0 0 0' }}>
                    {item.child}
                </div>
            ))
            }
        </div >
    )
}

export default forwardRef<AnimListInstance, Props>(Animlist)

