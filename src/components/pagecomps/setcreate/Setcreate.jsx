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

const Setcreate = () => {

    const [states, actions] = useStore(), { items, initCount, showDialog } = states, { init, addItem, deleteItem, setAddVisible, onTextChange, setCloseVisible, createSet, onTextFocus } = actions,
        listRef = useRef(), [t, changeLang] = useTranslation()

    useEffect(() => {
        init(listRef)
    }, [])

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef} animateType={AnimateType.Zoom}>
                {items && items.map((item, index) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <i className={`ef-setcreate__card-close ewordfun rte-close`} onClick={() => { deleteItem(index, listRef, t('setcreate:item', { count: initCount })[0]) }}></i>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onTextChange(e, item.id, 'term') }} focus={item.focus[0]} placeholder={t('setcreate:term')} onFocus={() => { onTextFocus(item.id, 'term') }}></Input>
                            <Input textarea style={{ resize: 'none' }} row={2} value={item.definition} onChange={(e) => { onTextChange(e, item.id, 'definition') }} focus={item.focus[1]} placeholder={t('setcreate:definition')} onFocus={() => { onTextFocus(item.id, 'definition') }}></Input>
                        </div>
                        <div className='ef-setcreate__card-bbox'>
                            <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { addItem(index + 1, listRef) }} className='ef-setcreate__card-add'></Button>
                        </div>
                    </Card>
                )}
            </Animlist>
            <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { createSet(t) }} className='ef-setcreate__create-button'></Button>
            <Dialog show={showDialog}></Dialog>
        </div >
    )
}

export default Setcreate

