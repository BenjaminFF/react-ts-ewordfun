import React, { FC, FormEvent, Children, useState, useEffect } from 'react'
import classNames from 'classnames'

interface Props {
    className?: string | Object
    show: boolean
    closeOnClickModel?: boolean
}

const Dialog: FC<Props> = ({ children, className, show, closeOnClickModel = true }) => {

    const classes = classNames('ef-model', className), [visible, setVisible] = useState(false)

    const startTransition = (type: string) => {
        
    }

    useEffect(() => {
        setVisible(show)
    }, [show])

    return visible ? (
        <div className='ef-model' onClick={() => { if (closeOnClickModel) setVisible(false) }}>
            <div className={classes}>
                {children}
            </div>
        </div>
    ) : null
}

export default Dialog

