import React, { useEffect } from 'react'
import useStore from '@model/createset'
import Button from '@components/button'

const Test = () => {

    const [states, actions] = useStore(), { counter, b } = states, { addCounter } = actions

    useEffect(() => {
        console.log('gg')
    }, [b.a])

    return (
        <div>
            {b.a}
            <Button onClick={() => { addCounter() }}>add</Button>
        </div>
    )
}

export default Test