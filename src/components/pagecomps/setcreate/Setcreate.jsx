import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import Card, { Front, Back } from '@components/card'
import Input from '@components/input'
import Animlist from '@components/animlist'
import Button, { ButtonType } from '@components/button'
import useStore from '@model/createset'
import { useTranslation } from '@locale/I18n'
import { AnimateType } from '@components/animlist/Animlist'
import Dialog from '@components/dialog'
import { Type } from '@components/message/Message'
import { useHistory } from 'react-router-dom'

const Setcreate = () => {

    const [states, actions] = useStore(), { items, initCount, showDialog, uploading, name, description, inputUpdater } = states,
        { init, addItem, deleteItem, setAddVisible, onTextChange, setCloseVisible, openDialog, createSetToServer, onDialogTextChange, cleanup } = actions,
        listRef = useRef(), [t, changeLang] = useTranslation(), dialogRef = useRef(), history = useHistory()

    useEffect(() => {
        init(listRef)
        return () => { cleanup() }
    }, [])

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef} animateType={AnimateType.Zoom}>
                {items && items.map((item, index) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <i className={`ef-setcreate__card-close ewordfun rte-close`} onClick={() => { deleteItem(index, listRef, t('setcreate:item', { count: initCount })[0]) }}></i>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onTextChange(e, item.id, 'term') }} focus={item.focus[0]} placeholder={t('setcreate:term')} updater={inputUpdater}></Input>
                            <Input textarea style={{ resize: 'none' }} row={2} value={item.definition} onChange={(e) => { onTextChange(e, item.id, 'definition') }} focus={item.focus[1]} placeholder={t('setcreate:definition')} updater={inputUpdater}></Input>
                        </div>
                        <div className='ef-setcreate__card-bbox'>
                            <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { addItem(index + 1, listRef) }} className='ef-setcreate__card-add'></Button>
                        </div>
                    </Card>
                )}
            </Animlist>
            <Button circle icon='rte-tick' type={ButtonType.Primary} shandow onClick={() => { openDialog(t, dialogRef) }} className='ef-setcreate__create-button'></Button>
            <Dialog ref={dialogRef} className='ef-setcreate__dialog'>
                <div className='ef-setcreate__dialog-title'>{t('setcreate:dialog')['title']}</div>
                <Input style={{ marginTop: '20px' }} placeholder={t('setcreate:dialog')['name']} value={name} onChange={(e) => { onDialogTextChange(e, 'name') }}></Input>
                <Input style={{ marginTop: '10px', resize: 'none' }} textarea row={3} placeholder={t('setcreate:dialog')['description']} value={description} onChange={(e) => { onDialogTextChange(e, 'description') }}></Input>
                <Button matchParent type={ButtonType.Primary} style={{ marginTop: '30px', marginBottom: '30px' }} loading={uploading} onClick={() => { createSetToServer(t, dialogRef, history) }}>{t('setcreate:dialog')['create']}</Button>
            </Dialog>
        </div>
    )
}

export default Setcreate

