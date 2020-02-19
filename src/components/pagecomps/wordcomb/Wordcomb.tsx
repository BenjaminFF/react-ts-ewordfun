import React, { ComponentFactory, useState, useEffect } from 'react'
import Underscore from './underscore'
import Squaregrid from './squaregrid'
import { splitStr, mixStr, shuffle } from '@utils/util'

export enum Status {
    Success,
    Error,
    Normal
}

export interface Item {
    active: boolean
    t: string
    isSpace?: boolean
}

export const Item = undefined

interface Props {
    term: string
    definition: string
    row: number
    callBack?: (status: Status) => void
}

const Wordcomb: React.FC<Props> = ({ term, definition, row, callBack }) => {

    let [usArr, setUSArr] = useState(), [sgArr, setSGArr] = useState(),
        [status, setStatus] = useState(Status.Normal), [curIndex, setCurIndex] = useState(0)


    useEffect(() => {
        let termArr = term.split(/\s+/), arr: Array<string> = []
        if (termArr.length > 3 || term.length > 30) throw new Error('请使用句子模块')
        while (true) {
            arr = []
            termArr.forEach((term, index) => {
                arr.push(...splitStr(term, Math.floor(row * row / termArr.length)))
                if (index !== termArr.length - 1) arr.push("~~is-space~~")
            })
            if ((arr.length - termArr.length) < row * row) break
        }

        setUSArr(Array.from(arr, item => ({ t: "", active: false, isSpace: item === "~~is-space~~" })))

        arr = arr.filter((item) => item !== "~~is-space~~")
        let mSgArr = Array.from(arr, t => ({ t, active: false }))
        while (mSgArr.length < row * row) {
            mSgArr.push({ t: mixStr(arr[Math.floor(Math.random() * arr.length)]), active: false })
        }
        setSGArr(shuffle(mSgArr))
        return () => {
            setCurIndex(0)
            setStatus(Status.Normal)
        }
    }, [term, row])

    const onItemCallBack = (index: number) => {
        if (curIndex === usArr.length) return
        sgArr[index].active = true
        if (usArr[curIndex].isSpace) curIndex++
        usArr[curIndex] = { isSpace: false, ...sgArr[index] }
        if (curIndex++ === usArr.length - 1) {
            let answer = ""
            usArr.forEach((item: Item) => {
                if (!item.isSpace) answer += item.t
            })
            status = answer === term.replace(/\s/ig, "") ? Status.Success : Status.Error
            setStatus(status)
            if (callBack) callBack(status)
        }
        setCurIndex(curIndex)
        setSGArr([...sgArr])
        setUSArr([...usArr])
    }

    const onUSCallback = () => {
        if (curIndex === 0 || status !== Status.Normal) return
        curIndex = usArr[curIndex - 1].isSpace ? curIndex - 2 : curIndex - 1
        sgArr.forEach((item: Item) => {
            if (item.t === usArr[curIndex].t) item.active = false
        })
        usArr[curIndex] = { active: false, t: "", isSpace: false }
        setCurIndex(curIndex)
        setSGArr([...sgArr])
        setUSArr([...usArr])
    }

    return (
        <div className='ef-wordcomb'>
            {usArr && <Underscore arr={usArr} status={status} onCallback={onUSCallback}></Underscore>}
            <div className='ef-wordcomb__def'>{definition}</div>
            {sgArr && <Squaregrid arr={sgArr} status={status} cellSize='4.5rem' row={row} onItemCallBack={onItemCallBack}></Squaregrid>}
        </div>
    )
}

export default Wordcomb

