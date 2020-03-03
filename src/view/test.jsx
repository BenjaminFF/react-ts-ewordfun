import React, { useEffect } from 'react'
import useStore from '@model/createset'
import Button from '@components/button'

const Test = () => {

    const [states, actions] = useStore(), { counter, num } = states, { addCounter } = actions

    useEffect(() => {
        console.log('gg')
    })

    return (
        <div>
            {counter}
            <Button onClick={() => { addCounter() }}>add</Button>
        </div>
    )
}

export default Test