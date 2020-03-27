import React, { useEffect } from 'react'
import { acquireSet } from '@utils/api'
import style from './index.module.scss'
import Input from '@components/input'
import useStore from '@model/set'
import Pagination from '@components/pagination'
import Button, { ButtonType } from '@components/button'
import { useHistory } from 'react-router-dom'
import Wordspell from '@components/pagecomps/wordspell'

const Set = () => {

    const [states, actions] = useStore(), { sets, curSets, page } = states, { init, onCurChange } = actions, history = useHistory()

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={style.set}>
            <div className={style.inner}>
                <Input></Input>
                <div className={style.container}>
                    {curSets && curSets.map((set, index) => (
                        <div key={index} className={style.setContainer} onClick={() => { history.push(`/user/learn/${set.origin_id}/${set.sid}`) }}>{set.name}</div>
                    ))}
                </div>
                <Pagination num={page.num} cur={page.cur} style={{ marginTop: '40px' }} onCurChange={onCurChange}></Pagination>
                <Button circle icon='rte-add' type={ButtonType.Primary} shandow className={style.addButton} onClick={() => { history.push('/user/createSet') }}></Button>
            </div>
        </div>
    )
}

export default Set