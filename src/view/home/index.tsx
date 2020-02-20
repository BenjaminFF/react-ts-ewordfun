import React, { useState, FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Message from '@components/message'
import Button from '@components/button'
import { login } from '@utils/api'
import { useTranslation } from '@locale/I18n'


const Home: FC = () => {
    const [count, setCount] = useState(0), [t, i18n] = useTranslation()

    useEffect(() => {
        console.log(t)
        // login('aa', 'aa', 'aa', 'aa')
    }, [])

    return (
        <div className={styles.home}>
            <Button onClick={() => { Message({ message: 'gg' }); setCount(count + 1) }}>add</Button>
            {/* <animated.div style={props}>
                <Wordcomb term={list[curIndex].term} definition={list[curIndex].definition} row={3} callBack={wcCallback}></Wordcomb>
            </animated.div> */}
        </div>
    )
}

export default Home