import React, { useState, FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Message from '@components/message'
import Button from '@components/button'
import { login } from '@utils/api'
import I18n, { useTranslation } from '@locale/I18n'


const Home = () => {
    const [count, setCount] = useState(0), [t, changeLang] = useTranslation()

    return (
        <div className={styles.home}>
            <Button onClick={() => { changeLang('en') }}>{t('login:signin')}</Button>
            {/* <animated.div style={props}>
                <Wordcomb term={list[curIndex].term} definition={list[curIndex].definition} row={3} callBack={wcCallback}></Wordcomb>
            </animated.div> */}
        </div>
    )
}

export default Home