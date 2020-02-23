import React, { useState, FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Message from '@components/message'
import Button from '@components/button'
import { login } from '@utils/api'
import I18n, { useTranslation } from '@locale/I18n'
import Animlist from '@components/animlist'


const Home = () => {
    const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8]), listRef = useRef()

    return (
        <div className={styles.home}>
            <Animlist ref={listRef}>
                {arr.map((item, index) => (
                    <div style={{ width: '10rem', height: '3rem', backgroundColor: 'black', margin: '0.5rem' }} key={index}></div>
                ))}
            </Animlist>
            <Button onClick={() => { setArr([1, ...arr]); listRef.current.appendNotify(0) }}>add</Button>
            <Button onClick={() => {setArr(arr.slice(0, arr.length - 1)); listRef.current.deleteNotify(0) }}>delete</Button>
        </div>
    )
}

export default Home