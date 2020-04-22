import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import { useParams, useHistory } from 'react-router-dom'
import useStore from '@model/learn'
import Button, { ButtonType } from '@components/button'
import Card from '@components/card'
import Input from '@components/input'
import { useTranslation } from '@locale/I18n'
import Animlist, { AnimateType } from '@components/animlist'
import RoundBuilder from './roundbuilder'


const Learn = () => {
    const { origin_id, sid } = useParams(), [states, actions] = useStore(), { terms, loading, showPlay } = states, { init, onInputFocus, onInputBlur, onInputChange, setPlay, addItem, filterTerms, cleanup } = actions,
        [t] = useTranslation(), listRef = useRef(), history = useHistory()

    useEffect(() => {
        init(sid, origin_id, listRef)
        return () => { cleanup() }
    }, [])

    return !loading ? (
        <div className={styles.learn} onDoubleClick={(e) => {
            if (e.target.className.includes('learn_learn')) {
                history.goBack(-1)
            }
        }}>
            <div className={styles.tool}>
                <Button retangle icon='rte-add' shandow onClick={() => { setPlay('wordcomb', true); filterTerms(listRef) }}></Button>
                <Button retangle icon='rte-close' shandow onClick={() => { setPlay('multichoice', true); filterTerms(listRef) }}></Button>
                <Button retangle icon='rte-loading' shandow onClick={() => { setPlay('wordspell', true); filterTerms(listRef) }}></Button>
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
            <div className={styles.tid}>{terms.length}</div>
            <div className={styles.buttonContainer}>
                <Button type={ButtonType.Primary} matchParent shandow onClick={() => { addItem(0, listRef) }}>添加</Button>
            </div>
            {showPlay && <RoundBuilder></RoundBuilder>}
        </div >
    ) : null
}

export default Learn