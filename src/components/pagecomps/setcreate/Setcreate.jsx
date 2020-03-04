import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import Card, { Front, Back } from '@components/card'
import Input from '@components/input'
import Animlist from '@components/animlist'
import Button, { ButtonType } from '@components/button'
import useStore from '@model/createset'

const Setcreate = () => {

    const [states, actions] = useStore(), { items } = states, { init, addItem, deleteItem, setAddVisible, onTextChange } = actions, listRef = useRef()

    useEffect(() => {
        init()
    }, [])

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef}>
                {items && items.map((item, index) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onTextChange(e, item.id, 'term') }} ></Input>
                            <Input textarea style={{ resize: 'none' }} row={2} value={item.definition} onChange={(e) => { onTextChange(e, item.id, 'definition') }}></Input>
                        </div>
                        <div className='ef-setcreate__card-bbox' onMouseEnter={() => { setAddVisible(index, true) }} onMouseLeave={(e) => { setAddVisible(index, false) }}>
                            {item.addVisible && <Button circle icon='rte-add' type={ButtonType.Primary} shandow onClick={() => { addItem(index + 1, listRef) }}></Button>}
                        </div>
                    </Card>
                )}
            </Animlist>
        </div>
    )
}

export default Setcreate

