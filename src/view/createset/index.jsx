import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Test from '@view/test'
import useStore from '@model/createset'
import Button from '@components/button'


const Createset = () => {

    const [counter, addCounter] = useState(0)

    useEffect(() => {
        console.log('createset')
    })

    return (
        <div className={styles.home}>
            <Test></Test>
            <Test></Test>
            {counter}
            <Button onClick={() => { addCounter(1) }}>add</Button>
        </div>
    )
}

export default Createset