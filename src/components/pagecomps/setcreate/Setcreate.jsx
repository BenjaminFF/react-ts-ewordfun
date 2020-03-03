import React, { FC, FormEvent, Children, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Card, { Front, Back } from '@components/card'
import Input from '@components/input'
import Animlist from '@components/animlist'
import Button, { ButtonType } from '@components/button'
import { randomStr } from '@utils/util'

const Setcreate = () => {

    const [items, setItems] = useState([]), listRef = useRef(), initCount = 3

    useEffect(() => {
        for (let i = 0; i < initCount; i++) {
            items.push({
                id: randomStr(12),
                term: '',
                definition: '',
                addVisible: false
            })
        }
        setItems([...items])
    }, [])

    const onChange = (e, id, type) => {
        items.filter((item) => item.id === id)[0][type] = e.currentTarget.value
        setItems([...items])
    }

    const addItem = (pos) => {
        setItems([
            {
                id: randomStr(12),
                term: '',
                definition: '',
                addVisible: false
            },
            ...items
        ])
        listRef.current.appendNotify(pos)
    }

    const deleteItem = (pos) => {
        items.splice(pos, 1)
        setItems([...items])
        listRef.current.deleteNotify(pos)
    }

    const toggleButton = (pos) => {
        items[pos].addVisible = !items[pos].addVisible
        setItems([...items])
    }

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef}>
                {items && items.map((item) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onChange(e, item.id, 'term') }} ></Input>
                            <Input textarea style={{ resize: 'none' }} row={2} value={item.definition} onChange={(e) => { onChange(e, item.id, 'definition') }}></Input>
                        </div>
                        <div style={{ height: 'fit-content', position: 'absolute', width: '100%', textAlign: "center" }} onMouseOver={() => { toggleButton(item.id) }}>
                            {item.addVisible && <Button circle icon='rte-add' type={ButtonType.Primary} shandow></Button>}
                        </div>
                    </Card>
                )}
            </Animlist>
        </div>
    )
}

export default Setcreate

