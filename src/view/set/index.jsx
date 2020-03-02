import React, { useEffect } from 'react'
import { acquireSet } from '@utils/api'
import Setcreate from '@components/pagecomps/setcreate'
import style from './index.module.scss'

const state = {
    items: [],

}

const Set = () => {

    return (
        <div className={style.set}>
            <Setcreate></Setcreate>
        </div>
    )
}

export default Set