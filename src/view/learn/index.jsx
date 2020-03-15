import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import useStore from '@model/learn'


const Learn = () => {
    const { origin_id, sid } = useParams(), [states, actions] = useStore(), { sets } = states, { init } = actions

    useEffect(() => {
        init(sid, origin_id)
    }, [])

    return (
        <div className={styles.learn}>
            
        </div>
    )
}

export default Learn