import React, { useEffect, useRef } from 'react'
import { acquireSet } from '@utils/api'
import style from './index.module.scss'
import Input from '@components/input'
import useStore from '@model/set'
import Pagination from '@components/pagination'
import Button, { ButtonType } from '@components/button'
import { useHistory } from 'react-router-dom'
import Wordspell from '@components/pagecomps/wordspell'
import Dialog from '@components/dialog'

const Set = () => {

    const [states, actions] = useStore(), { sets, curSets, page, filterText, curSet, uploading } = states, { init, onCurChange, onInputChange, onEnterClick, onOpenDialog, onDialogInputChange, updateSetToServer } = actions,
        history = useHistory(), dialogRef = useRef()

    useEffect(() => {
        init()
    }, [])

    return (
        <div className={style.set}>
            <div className={style.inner}>
                <Input value={filterText} onChange={(e) => { onInputChange(e) }} onKeyUp={(e) => {
                    if (e.key === 'Enter') onEnterClick()
                }}></Input>
                <div className={style.container}>
                    {curSets && curSets.map((set, index) => (
                        <div key={index} className={style.setContainer}
                            // onClick={() => { history.push(`/user/learn/${set.origin_id}/${set.sid}`) }}
                            onClick={() => { onOpenDialog(set, dialogRef) }}
                        >{set.name}</div>
                    ))}
                </div>
                <Pagination num={page.num} cur={page.cur} style={{ marginTop: '40px' }} onCurChange={onCurChange}></Pagination>
                <Button circle icon='rte-add' type={ButtonType.Primary} shandow className={style.addButton} onClick={() => { history.push('/user/createSet') }}></Button>
            </div>
            <Dialog className={style.mDialog} ref={dialogRef}>
                {curSet && <Input style={{ marginTop: '30px' }} placeholder={'setName'} value={curSet.name} onChange={(e) => { onDialogInputChange(e, 'name') }}></Input>}
                {curSet && < Input style={{ marginTop: '20px', resize: 'none' }} placeholder={'set Info'} textarea row={2} value={curSet.description} onChange={(e) => { onDialogInputChange(e, 'description') }}></Input>}
                <Button matchParent style={{ marginTop: '30px', marginBottom: '10px' }} type={ButtonType.Primary} onClick={() => { updateSetToServer(dialogRef) }} loading={uploading}>修改</Button>
            </Dialog>
        </div >
    )
}

export default Set