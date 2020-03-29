import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import Test from '@view/test'
import Setcreate from '@components/pagecomps/setcreate'
import { useHistory } from 'react-router-dom'


const Createset = () => {

  const history = useHistory()

  return (
    <div className={styles.createSet} onDoubleClick={(e) => {
      if (e.target.className === 'ef-setcreate') {
        history.goBack(-1)
      }
    }}>
      <Setcreate></Setcreate>
    </div>
  )
}

export default Createset