import React, { useEffect } from 'react'
import styles from './index.module.scss'
import { useParams } from 'react-router-dom'
import useStore from '@model/learn'
import Button from '@components/button'
import Card from '@components/card'
import Input from '@components/input'
import { useTranslation } from '@locale/I18n'
import Progress from '@components/progress'
import Wordcomb from '@components/pagecomps/wordcomb'
import Combword from './combword'


const Learn = () => {
    const { origin_id, sid } = useParams(), [states, actions] = useStore(), { terms, playList } = states, { init, onInputFocus, onInputBlur, onInputChange, setPlay } = actions,
        [t] = useTranslation(), { combword } = playList

    useEffect(() => {
        init(sid, origin_id)
    }, [])

    return (
        <div className={styles.learn}>
            <div className={styles.tool}>
                <Button retangle icon='rte-add' shandow onClick={() => { setPlay('combword', true) }}></Button>
                <Button retangle icon='rte-close' shandow></Button>
                <Button retangle icon='rte-loading' shandow></Button>
                <Button retangle icon='rte-password' shandow></Button>
                <Button retangle icon='rte-add' shandow></Button>
            </div>
            <div className={styles.listContainer}>
                {terms && terms.map((item, index) => (
                    <Card className={styles.item} key={index}>
                        <Input value={item.term} editable={item.editable[0]} style={{ fontSize: '16px', padding: '4px 4px', lineHeight: '20px' }} onFocus={() => { onInputFocus(index, 'term') }} onBlur={() => { onInputBlur(index, 'term', t) }} onChange={(e) => { onInputChange(index, 'term', e) }}></Input>
                        <Input style={{ resize: 'none', fontSize: '16px', padding: '4px 4px' }} textarea value={item.definition} editable={item.editable[1]} onFocus={() => { onInputFocus(index, 'definition') }} onBlur={() => { onInputBlur(index, 'definition', t) }} onChange={(e) => { onInputChange(index, 'definition', e) }}></Input>
                    </Card>
                ))}
                {combword && <Combword></Combword>}
            </div>
        </div>
    )
}

export default Learn