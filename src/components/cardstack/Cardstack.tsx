import React, { FC, FormEvent, MouseEvent, useState, Children, useEffect, useRef, useMemo } from 'react'
import classNames from 'classnames'
import TWEEN from '@utils/tween'

export enum StackedOption {
    Top = -1,
    Bottom = 1,
    None = 0
}

interface Props {
    stackedOption?: StackedOption
    rotate?: Boolean
    blur?: Boolean
    visibleCardNum?: number
    width: string
    height: string
    slideLimit?: number
}

//后面还要添加focus,blur,input等事件
const Cardstack: FC<Props> = ({ children, stackedOption = StackedOption.Top, rotate = true, blur = true, visibleCardNum = 3, width, height, slideLimit = 200 }) => {

    const childrenCount = Children.count(children),
        [pos, setPos] = useState({ x: 0, y: 0, dx: 0, dy: 0, dz: 0 }),
        [isDraging, setDraging] = useState(false),
        [curIndex, setCurIndex] = useState(childrenCount - 1)

    const isCurCard = useMemo(() => {
        return (index: number) => (index === visibleCardNum - 1 || curIndex < visibleCardNum && index === curIndex)
    }, [curIndex])

    const cardScale = useMemo(() => {
        return (index: number) => (visibleCardNum > curIndex ? 1 - (curIndex - index) * 0.05 : 1 - (visibleCardNum - 1 - index) * 0.05)
    }, [curIndex])

    const cardStartMove = (index: number, x: number, y: number) => {
        if (isCurCard(index)) {
            setDraging(true)
            setPos({
                ...pos, x, y,
                dx: 0,
                dy: 0

            })
        }
    }

    const cardOnMove = (index: number, x: number, y: number) => {
        if (isDraging && isCurCard(index)) {
            setPos({
                ...pos,
                dx: x - pos.x,
                dy: y - pos.y
            })
        }
    }

    const cardMoveOver = (index: number) => {
        if (isCurCard(index) && isDraging) {
            if (Math.abs(pos.dx) > slideLimit) {
                const start = pos.dx, end = pos.dx > 0 ? pos.dx + 200 : pos.dx - 200
                new TWEEN.Tween().from({ dx: start }).to({ dx: end }, 200).easing(TWEEN.Easing.Linear).onUpdate(({ dx }) => {
                    setPos({
                        ...pos,
                        dx,
                        dz: (start - dx) / (start - end) * 0.05
                    })
                }).onStop(() => {
                    setPos({
                        ...pos,
                        dx: 0,
                        dy: 0,
                        dz: 0
                    })
                    setCurIndex(curIndex - 1)
                }).start()
            } else {
                new TWEEN.Tween().from({ dx: pos.dx, dy: pos.dy }).to({ dx: 0, dy: 0 }, 200).easing(TWEEN.Easing.Linear).onUpdate(({ dx, dy }) => {
                    setPos({
                        ...pos,
                        dx,
                        dy
                    })
                }).start()
            }
            setDraging(false)
        }
    }

    const onClickCapture = (event: MouseEvent) => {
        pos.dx !== 0 && event.stopPropagation()
    }

    return (
        <div className='ef-cardstack' style={{ width, height }}>
            {React.Children.toArray(children).slice(curIndex - visibleCardNum + 1 > 0 ? curIndex - visibleCardNum + 1 : 0, curIndex + 1).map((child, i) => (
                <div className='ef-cardstack__child-container' key={i}
                    style={{
                        transform: isCurCard(i) ?
                            `translate3D(${pos.dx}px, ${pos.dy}px, 0) 
                            rotate(${rotate ? (Math.abs(pos.dx) > slideLimit ? slideLimit * pos.dx / Math.abs(pos.dx) : pos.dx) / 10 : 0}deg)
                            ` : `translateY(${stackedOption * (1 - cardScale(i) - pos.dz) * 100}%) scale3d(${cardScale(i) + pos.dz},${cardScale(i) + pos.dz},1)`,
                        filter: !isCurCard(i) && blur && isDraging ? 'blur(4px)' : ''
                    }}
                    onMouseDown={(event) => { cardStartMove(i, event.clientX, event.clientY) }}
                    onMouseMove={(event) => { cardOnMove(i, event.clientX, event.clientY) }}
                    onMouseUp={(event) => { cardMoveOver(i) }}
                    onMouseOut={(event) => { cardMoveOver(i) }}
                    onClickCapture={onClickCapture}
                    onTouchStart={(event) => { cardStartMove(i, event.touches[0].clientX, event.touches[0].clientY)}}
                    onTouchMove={(event) => { cardOnMove(i, event.touches[0].clientX, event.touches[0].clientY) }}
                    onTouchEnd={(event) => { cardMoveOver(i) }}>
                    {child}
                </div>
            ))
            }
        </div >
    )
}

export default Cardstack

