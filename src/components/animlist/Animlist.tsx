import React, { FC, useRef, useEffect, useState, Children, createRef, forwardRef, useImperativeHandle, HtmlHTMLAttributes } from 'react'
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
    splice: (key: number | string) => void
}

export const AnimListInstance = undefined

const Animlist: React.FC<Props> = ({ orientation, children }, ref) => {

    const [mArr, setMArr] = useState(Array.from(Children.toArray(children), (child, i) => ({ dx: 0, dy: 0, opacity: 1, ref: createRef<HTMLDivElement>(), child })))

    useImperativeHandle(ref, () => ({
        splice: (key: number | string) => {
            const curIndex = mArr.findIndex((item) => item.child.key === '.$' + key)
            if (curIndex === -1) {
                return
                //处理没key值的情况
               
            }
            const curNode = mArr[curIndex].ref.current
            let offsetX = 0, offsetY = 0
            if (curNode) {
                offsetX = curNode.offsetWidth
                const nextNode = curIndex === mArr.length - 1 ? undefined : mArr[curIndex + 1].ref.current
                nextNode ? offsetY = nextNode.offsetTop - curNode.offsetTop : offsetY = 0
            }
            new TWEEN.Tween().from({ dx: 0, dy: 0, opacity: 1 }).to({ dx: offsetX, dy: -offsetY, opacity: 0 }, 500).easing(TWEEN.Easing.Linear).onUpdate(({ dx, dy, opacity }) => {
                mArr.forEach((item, index) => {
                    if (index === curIndex) {
                        item.dx = dx
                        item.opacity = opacity
                    }
                    // item.dy = index > curIndex ? dy : item.dy
                })
                setMArr([...mArr])
            }).start()
            new TWEEN.Tween().from({ dx: 0, dy: 0, opacity: 1 }).to({ dx: offsetX, dy: -offsetY, opacity: 0 }, 300).delay(400).easing(TWEEN.Easing.Linear).onUpdate(({ dx, dy, opacity }) => {
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
    }))

    return (
        <div>
            {mArr.map((item, index) => (
                <div ref={item.ref} key={index} style={{ transform: `translateX(${item.dx}px) translateY(${item.dy}px)`, opacity: item.opacity }}>{item.child}</div>
            ))}
        </div>
    )
}

export default forwardRef<AnimListInstance, Props>(Animlist)

