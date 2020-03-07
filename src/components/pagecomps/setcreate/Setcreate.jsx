import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import Card, { Front, Back } from '@components/card'
import Input from '@components/input'
import Animlist from '@components/animlist'
import Button, { ButtonType } from '@components/button'
import useStore from '@model/createset'
import { useTranslation } from '@locale/I18n'
import { AnimateType } from '@components/animlist/Animlist'

const Setcreate = () => {

    const [states, actions] = useStore(), { items } = states, { init, addItem, deleteItem, setAddVisible, onTextChange, setCloseVisible, createSet } = actions,
        listRef = useRef(), [t, changeLang] = useTranslation()

    useEffect(() => {
        init(listRef)
    }, [])

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef} animateType={AnimateType.Zoom}>
                {items && items.map((item, index) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <i className={`ef-setcreate__card-close ewordfun rte-close`} onClick={() => { deleteItem(index, listRef, t('setcreate:test', { test: index })) }}></i>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onTextChange(e, item.id, 'term') }} focus={item.focus[0]}></Input>
                            <Input textarea style={{ resize: 'none' }} row={2} value={item.definition} onChange={(e) => { onTextChange(e, item.id, 'definition') }} focus={item.focus[1]}></Input>
                        </div>
                        <div className='ef-setcreate__card-bbox'>
                            <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { addItem(index + 1, listRef) }} className='ef-setcreate__card-add'></Button>
                        </div>
                    </Card>
                )}
            </Animlist>
            <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { createSet() }} className='ef-setcreate__create-button'></Button>
        </div>
    )
}

export default Setcreate

