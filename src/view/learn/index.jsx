import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import useStore from '@model/learn'
import Button from '@components/button'
import Card from '@components/card'
import Input from '@components/input'


const Learn = () => {
    const { origin_id, sid } = useParams(), [states, actions] = useStore(), { terms } = states, { init, onInputFocus, onInputBlur, onInputChange } = actions

    useEffect(() => {
        init(sid, origin_id)
    }, [])

    return (
        <div className={styles.learn}>
            <div className={styles.tool}>
                <Button retangle icon='rte-add' shandow></Button>
                <Button retangle icon='rte-close' shandow></Button>
                <Button retangle icon='rte-loading' shandow></Button>
                <Button retangle icon='rte-password' shandow></Button>
                <Button retangle icon='rte-add' shandow></Button>
            </div>
            <div className={styles.listContainer}>
                {terms && terms.map((item, index) => (
                    <Card className={styles.item} key={index}>
                        <Input value={item.term} editable={item.editable[0]} style={{ fontSize: '18px' }} onFocus={() => { onInputFocus(index, 'term') }} onBlur={() => { onInputBlur(index, 'term') }} onChange={(e) => { onInputChange(index, 'term', e) }}></Input>
                        <Input style={{ resize: 'none', fontSize: '17px' }} textarea value={item.definition} editable={item.editable[1]} onFocus={() => { onInputFocus(index, 'definition') }} onBlur={() => { onInputBlur(index, 'definition') }} onChange={(e) => { onInputChange(index, 'definition', e) }}></Input>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Learn