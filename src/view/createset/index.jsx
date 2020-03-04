import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Test from '@view/test'
import Button from '@components/button'


const Createset = () => {

    return (
        <div className={styles.home}>
           <Test></Test>
           <Test></Test>
           <Test></Test>
           <Test></Test>
        </div>
    )
}

export default Createset