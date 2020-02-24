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
        [{ orientation: Orientation.Vertical, animateType: AnimateType.Slide }, { attr: 'dx', start: 0, end: -offsetX }],
        [{ orientation: Orientation.Vertical, animateType: AnimateType.Zoom }, { attr: 'scaley', start: 1, end: 0 }],
        [{ orientation: Orientation.Horizontal, animateType: AnimateType.Slide }, { attr: 'dy', start: 0, end: offsetY }],
        [{ orientation: Orientation.Horizontal, animateType: AnimateType.Zoom }, { attr: 'scalex', start: 1, end: 0 }]
    ])
    return Array.from(mMap).filter(([key, value]) => (key.orientation === orientation && key.animateType === animateType))[0][1]
}

const Animlist: React.FC<Props> = ({ orientation = Orientation.Vertical, animateType = AnimateType.Slide, children, easing = TWEEN.Easing.Linear, duration = 400 }, ref) => {

    const [mArr, setMArr] = useState(Array.from(Children.toArray(children), (child, i) => ({ dx: 0, dy: 0, scalex: 1, scaley: 1, opacity: 1, ref: createRef<HTMLDivElement>(), child }))),
        [notify, setNotify] = useState({ type: 'delete', index: -1 })

    useEffect(() => {
        if (notify.index >= 0 && notify.index < children.length) {
            notify.type === 'delete' ? deleteTransition(notify.index) : appendTransition(notify.index)
        }
    }, [children])

    useEffect(() => {
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

        const transInfo = getTransitionInfo(orientation, animateType, offsetX, offsetY)

        new TWEEN.Tween().from({ [transInfo.attr]: transInfo.start }).to({ [transInfo.attr]: transInfo.end }, duration).easing(easing).onUpdate((value) => {
            mArr[curIndex] = { ...mArr[curIndex], ...value }
            setMArr([...mArr])
        }).onStop(() => {
            mArr[curIndex].opacity = 0
            setMArr([...mArr])
        }).start()

        const delayTime = animateType === AnimateType.Zoom ? 0 : duration
        new TWEEN.Tween().from({ dy: 0, dx: 0 }).to({ dy: -offsetY, dx: -offsetX }, duration).delay(delayTime).easing(easing).onUpdate(({ dy, dx }) => {
            mArr.forEach((item, index) => {
                if (index > curIndex) {
                    orientation === Orientation.Vertical ? item.dy = dy : item.dx = dx
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

            const transInfo = getTransitionInfo(orientation, animateType, offsetX, offsetY)

            // 防止闪烁
            mArr.forEach((item, index) => {
                if (index > curIndex) {
                    orientation === Orientation.Vertical ? item.dy = -offsetY : item.dx = -offsetX
                }
            })
            mArr[curIndex] = {
                ...mArr[curIndex], ...{ [transInfo.attr]: transInfo.end, opacity: transInfo.attr === 'scalex' || transInfo.attr === 'scaley' ? 1 : 0 }
            }
            setMArr([...mArr])

            new TWEEN.Tween().from({ dy: -offsetY, dx: -offsetX }).to({ dy: 0, dx: 0 }, duration).easing(easing).onUpdate(({ dy, dx }) => {
                mArr.forEach((item, index) => {
                    if (index > curIndex) {
                        orientation === Orientation.Vertical ? item.dy = dy : item.dx = dx
                    }
                })
                setMArr([...mArr])
            }).onStop(() => {
                mArr[curIndex].opacity = 1
                setMArr([...mArr])
            }).start()

            const delayTime = animateType === AnimateType.Zoom || curIndex === mArr.length - 1 ? 0 : duration
            new TWEEN.Tween().from({ [transInfo.attr]: transInfo.end }).to({ [transInfo.attr]: transInfo.start }, duration).delay(delayTime).easing(easing).onUpdate((value) => {
                mArr[curIndex] = { ...mArr[curIndex], ...value }
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
                <div ref={item.ref} key={index} className='ef-animlist__item' style={{ transform: `translate3d(${item.dx}px,${item.dy}px,0px) scaleX(${item.scalex}) scaleY(${item.scaley})`, opacity: item.opacity, transformOrigin: '0 0 0' }}>
                    {item.child}
                </div>
            ))
            }
        </div >
    )
}

export default forwardRef<AnimListInstance, Props>(Animlist)
