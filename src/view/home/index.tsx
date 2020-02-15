import React, { useState, FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Wordcomb, { Status } from '@components/wordcomb'
import { animated, useSpring } from 'react-spring'
import Message from '@components/message'
import Animlist, { AnimListInstance } from '@components/animlist'
import Button from '@components/button'


const Home: FC = () => {

    const [arr, setArr] = useState([1, 2, 3, 4, 5, 6]), animListRef = useRef<AnimListInstance>(null)

    return (
        <div className={styles.home}>
            {/* <animated.div style={props}>
                <Wordcomb term={list[curIndex].term} definition={list[curIndex].definition} row={3} callBack={wcCallback}></Wordcomb>
            </animated.div> */}
            <Button onClick={() => { setArr([1, ...arr]); animListRef.current?.appendNotify(0) }}>splice</Button>
            <Animlist ref={animListRef}>
                {arr.map((item) => (
                    <div style={{ width: '5rem', height: item + 1 + 'rem', backgroundColor: 'black', margin: '1rem' }} key={item}></div>
                ))}
            </Animlist>
        </div >
    )
}

export default Home