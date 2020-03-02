import React, { FC, FormEvent, Children, useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Card, { Front, Back } from '@components/card'
import Input from '@components/input'
import Animlist from '@components/animlist'
import Button from '@components/button'
import { randomStr } from '@utils/util'

const Setcreate = () => {

    const [items, setItems] = useState([]), listRef = useRef(), initCount = 2

    useEffect(() => {
        const mItems = []
        for (let i = 0; i < initCount; i++) {
            mItems.push({
                id: randomStr(12),
                term: '',
                definition: ''
            })
        }
        setItems(mItems)
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
                definition: ''
            },
            ...items
        ])
        listRef.current.appendNotify(0)
    }

    return (
        <div className='ef-setcreate'>
            <Animlist ref={listRef}>
                {items && items.map((item) =>
                    <Card className='ef-setcreate__card' key={item.id}>
                        <div className='ef-setcreate__card-inner'>
                            <Input style={{ marginBottom: '1rem' }} value={item.term} onChange={(e) => { onChange(e, item.id, 'term') }} ></Input>
                            <Input textarea style={{ resize: 'none' }} row={3} value={item.definition} onChange={(e) => { onChange(e, item.id, 'definition') }}></Input>
                        </div>
                    </Card>
                )}
            </Animlist>
            <Button matchParent onClick={addItem}>add</Button>
        </div>
    )
}

export default Setcreate

