import React, { useEffect } from 'react'
import { acquireSet } from '@utils/api'

function Set() {

    useEffect(() => {
        acquireSet(51, '8msjznhieqi').then((res) => {
            console.log(res)
        })
    }, [])
    return (
        <div>Set</div>
    )
}

export default Set