import React, { FC, useRef, useEffect, useState, Children, createRef, forwardRef, useImperativeHandle, useLayoutEffect } from 'react'
import classNames from 'classnames'
import { useSprings } from 'react-spring'
import TWEEN from '@utils/tween'
import Message from '@components/message'

export enum Orientation {
    Vertical,
    Horizontal
}

interface Props {
    orientation?: Orientation
    children?: any
}

export interface AnimListInstance {
    deleteNotify: (key: number | string) => void
    appendNotify: (pos: number) => void
}

export const AnimListInstance = undefined

const Animlist: React.FC<Props> = ({ orientation, children }, ref) => {

    const [mArr, setMArr] = useState(Array.from(Children.toArray(children), (child, i) => ({ dx: 0, dy: 0, opacity: 1, ref: createRef<HTMLDivElement>(), child }))),
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
        const curNode = mArr[curIndex].ref.current
        let offsetX = 0, offsetY = 0
        if (curNode) {
            offsetX = curNode.offsetWidth
            const nextNode = curIndex === mArr.length - 1 ? undefined : mArr[curIndex + 1].ref.current
            nextNode ? offsetY = nextNode.offsetTop - curNode.offsetTop : offsetY = 0
        }
        new TWEEN.Tween().from({ dx: 0, opacity: 1 }).to({ dx: offsetX, opacity: 0 }, 500).easing(TWEEN.Easing.Linear).onUpdate(({ dx, opacity }) => {
            mArr.forEach((item, index) => {
                if (index === curIndex) {
                    item.dx = dx
                    item.opacity = opacity
                }
            })
            setMArr([...mArr])
        }).start()
        new TWEEN.Tween().from({ dy: 0 }).to({ dy: -offsetY }, 300).delay(400).easing(TWEEN.Easing.Linear).onUpdate(({ dy }) => {
            mArr.forEach((item, index) => {
                item.dy = index > curIndex ? dy : item.dy
            })
            setMArr([...mArr])
        }).onStop(() => {
            mArr.forEach((item, index) => {
                item.dy = 0
            })
            mArr.splice(curIndex, 1)
            setMArr([...mArr])
        }).start()
    }

    const appendTransition = (curIndex: number) => {
        if (mArr.length !== Children.count(children)) {
            const arr = [...mArr]
            arr.splice(curIndex, 0, { dx: 0, dy: 0, opacity: 0, ref: createRef<HTMLDivElement>(), child: Children.toArray(children)[curIndex] })
            setMArr([...arr])
        } else {
            const curNode = mArr[curIndex].ref.current
            let offsetX = 0, offsetY = 0
            if (curNode) {
                offsetX = curNode.offsetWidth
                const nextNode = curIndex === mArr.length - 1 ? undefined : mArr[curIndex + 1].ref.current
                nextNode ? offsetY = nextNode.offsetTop - curNode.offsetTop : offsetY = 0
            }
            
            // 防止闪烁
            mArr.forEach((item, index) => {
                if (index > curIndex) {
                    item.dy = -offsetY
                }
            })
            setMArr([...mArr])

            new TWEEN.Tween().from({ dy: -offsetY }).to({ dy: 0 }, 400).easing(TWEEN.Easing.Linear).onUpdate(({ dy }) => {
                mArr.forEach((item, index) => {
                    if (index > curIndex) {
                        item.dy = dy
                    }
                })
                setMArr([...mArr])
            }).start()
            new TWEEN.Tween().from({ dx: -offsetX, opacity: 0 }).to({ dx: 0, opacity: 1 }, 300).delay(curIndex === mArr.length - 1 ? 0 : 300).easing(TWEEN.Easing.Linear).onUpdate(({ dx, opacity }) => {
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

    return (
        <div>
            {mArr.map((item, index) => (
                <div ref={item.ref} key={index} style={{ transform: `translate3d(${item.dx}px,${item.dy}px,0px)`, opacity: item.opacity }}>
                    {item.child}
                </div>
            ))}
        </div>
    )
}

export default forwardRef<AnimListInstance, Props>(Animlist)

