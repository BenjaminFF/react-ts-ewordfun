import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import useStore from '@model/learn'
import Button, { ButtonType } from '@components/button'
import Card from '@components/card'
import Input from '@components/input'
import { useTranslation } from '@locale/I18n'
import Progress from '@components/progress'
import Wordcomb from '@components/pagecomps/wordcomb'
import Combword from './combword'
import { cleanup } from '@testing-library/react'
import Animlist, { AnimateType } from '@components/animlist'


const Learn = () => {
    const { origin_id, sid } = useParams(), [states, actions] = useStore(), { terms, loading, playList } = states, { init, onInputFocus, onInputBlur, onInputChange, setPlay, addItem } = actions,
        [t] = useTranslation(), { combword } = playList, listRef = useRef()

    useEffect(() => {
        init(sid, origin_id, listRef)
    }, [])

    return !loading ? (
        <div className={styles.learn}>
            <div className={styles.tool}>
                <Button retangle icon='rte-add' shandow onClick={() => { setPlay('combword', true) }}></Button>
                <Button retangle icon='rte-close' shandow></Button>
                <Button retangle icon='rte-loading' shandow></Button>
                <Button retangle icon='rte-password' shandow></Button>
                <Button retangle icon='rte-add' shandow></Button>
            </div>
            <div className={styles.listContainer}>
                <Animlist ref={listRef} animateType={AnimateType.Zoom}>
                    {terms && terms.map((item, index) => (
                        <Card className={styles.item} key={item.tid}>
                            <Input value={item.term} editable={item.editable[0]} style={{ fontSize: '16px', padding: '4px 4px', lineHeight: '20px', marginBottom: '8px' }} onFocus={() => { onInputFocus(index, 'term') }} onBlur={() => { onInputBlur(index, 'term', t) }} onChange={(e) => { onInputChange(index, 'term', e) }}></Input>
                            <Input style={{ resize: 'none', fontSize: '16px', padding: '4px 4px' }} textarea value={item.definition} editable={item.editable[1]} onFocus={() => { onInputFocus(index, 'definition') }} onBlur={() => { onInputBlur(index, 'definition', t) }} onChange={(e) => { onInputChange(index, 'definition', e) }}></Input>
                        </Card>
                    ))}
                </Animlist>
            </div>
            <div className={styles.buttonContainer}>
                <Button type={ButtonType.Primary} matchParent shandow onClick={() => { addItem(0, listRef) }}>添加</Button>
            </div>
            {combword && <Combword></Combword>}
        </div>
    ) : null
}

export default Learn