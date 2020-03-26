import React, { useState, FC, useEffect, useRef } from 'react'
import styles from './index.module.scss'
import useLearnStore from '@model/learn'
import useStore from '@model/learn/roundbuilder'
import Progress from '@components/progress'
import Wordcomb from '@components/pagecomps/wordcomb'
import Card from '@components/card'
import { useTranslation } from '@locale/I18n'
import Button, { ButtonType } from '@components/button'
import Multichoice from '@components/pagecomps/multichoice'
import { shuffle } from '@utils/util'


const RoundBuilder = () => {
    const [{ terms, set, learnModes, curMode }, { setPlay }] = useLearnStore(), [{ progress, curTerms, errTerms, showRoundEnd }, { init, goNext, onRoundClick }] = useStore(),
        { cur, total } = progress, [t] = useTranslation()

    useEffect(() => {
        init(terms, learnModes[curMode], set)
    }, [])

    const renderPlay = () => {
        if (curTerms && cur <= curTerms.length) {
            let { term, definition } = (cur === curTerms.length ? curTerms[cur - 1] : curTerms[cur]), otherOptions = [], optionsCount = terms.length <= 3 ? terms.length - 1 : 3
            while (otherOptions.length < optionsCount) {
                const randomPos = Math.floor(Math.random() * terms.length), curTerm = terms[randomPos].term
                if (otherOptions.filter((item) => curTerm === item).length === 0 && curTerm !== term) {
                    otherOptions.push(curTerm)
                }
            }
            switch (curMode) {
                case 'wordcomb':
                    return <Wordcomb term={term} definition={definition} callBack={(isCorrect) => { goNext(isCorrect) }}></Wordcomb>
                case 'multichoice':
                    return <Multichoice term={term} definition={definition} callBack={(isCorrect) => { goNext(isCorrect) }} otherOptions={shuffle(otherOptions)}></Multichoice>
            }
        }
        return null
    }

    return (
        <div className={styles.roundBuilder}>
            {!showRoundEnd && <div className={styles.toolbar}>
                <i className={`ewordfun rte-close ${styles.close}`} onClick={() => { setPlay('', false) }}></i>
                <Progress percentage={cur / total * 100} className={styles.progress}></Progress>
                {cur + '/' + total}
            </div>}
            {!showRoundEnd && renderPlay()}
            {showRoundEnd && (
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

export default RoundBuilder