import React, { useState, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import useLearnStore from '@model/learn'
import useStore from '@model/learn/combword'
import Progress from '@components/progress'
import Wordcomb from '@components/pagecomps/wordcomb'
import Card from '@components/card'
import { useTranslation } from '@locale/I18n'
import Button, { ButtonType } from '@components/button'

const Combword = () => {

    const [{ terms, set }, { setPlay }] = useLearnStore(), [{ progress, curTerms, errTerms }, { init, goNext, onRoundClick }] = useStore(),
        { cur, total } = progress, [t] = useTranslation()

    useEffect(() => {
        init(terms)
    }, [])

    return (
        <div className={styles.combword}>
            {curTerms && cur < curTerms.length && <div className={styles.toolbar}>
                <i className={`ewordfun rte-close ${styles.close}`} onClick={() => { setPlay('combword', false) }}></i>
                <Progress percentage={cur / total * 100} className={styles.progress}></Progress>
                {cur + '/' + total}
            </div>}
            {curTerms && cur < curTerms.length && <Wordcomb term={curTerms[cur].term} definition={curTerms[cur].definition} callBack={(correct) => { goNext(correct, set.sid, set.spell_comb_learncount) }}></Wordcomb>}
            {curTerms && cur === curTerms.length && errTerms && (
                <div className={styles.errTerms}>
                    <div className={styles.listContainer}>
                        {errTerms.length !== 0 && <div className={styles.errTitle}>{t('learn:errTerms')}</div>}
                        {errTerms.map((item, index) => (
                            <Card className={styles.errTerm} key={index}>
                                <div className={styles.term}>{item.term}</div>
                                <div className={styles.def}>{item.definition}</div>
                            </Card>
                        ))}
                        {errTerms.length === 0 && terms.map((item, index) => (
                            <Card className={styles.errTerm} key={index}>
                                <div className={styles.term}>{item.term}</div>
                                <div className={styles.def}>{item.definition}</div>
                            </Card>
                        ))}
                    </div>
                    <Button type={ButtonType.Primary} matchParent shandow onClick={() => { onRoundClick(terms, set.sid) }}>{errTerms.length === 0 ? t('learn:reLearn') : t('learn:nextRound')}</Button>
                </div>
            )}
        </div>
    )
}

export default Combword