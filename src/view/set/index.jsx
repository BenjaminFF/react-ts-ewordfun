import React, { useEffect } from 'react'
import { acquireSet } from '@utils/api'
import style from './index.module.scss'
import Wordcomb from '@components/pagecomps/wordcomb'
import Multichoice from '@components/pagecomps/multichoice'

const Set = () => {

    const options = ['term1', 'term2', 'term3']

    return (
        <div className={style.set}>
            <Multichoice otherOptions={options} term='hello world' definition='你好,世界' callBack={(status) => { console.log(status) }}></Multichoice>
        </div>
    )
}

export default Set