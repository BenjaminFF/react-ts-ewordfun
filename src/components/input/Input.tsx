import React, { FC, FormEvent, useState, useRef, useEffect } from 'react'
import classNames from 'classnames'

interface Props {
    value?: string
    onChange?: any
    name?: string
    disabled?: boolean
    prefixIcon?: string
    suffixIcon?: string
    type?: string
    placeholder?: string
    textarea?: boolean
    style?: Object
    row?: number
    focus?: boolean
    onFocus?: any
    updater?: number
    editable?: boolean
    onBlur?: any
}


//后面还要添加focus,blur,input等事件
const Input: FC<Props> = ({ value, onChange, name, disabled, prefixIcon, suffixIcon, type = 'text', placeholder = '', textarea = false, style, row = 1, focus = false, onFocus, updater = 0, editable = true, onBlur }) => {

    const [taHeight, setTaHeight] = useState<string | number>(), initHeight = useRef<number>(-1), inputRef = useRef(null)

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        if (onChange) onChange(e)
        const { scrollHeight, offsetHeight } = e.currentTarget
        if (initHeight.current === -1) initHeight.current = offsetHeight
        if (scrollHeight > initHeight.current) {
            setTaHeight(e.currentTarget.scrollHeight)
        }
    }

    useEffect(() => {
        if (inputRef) {
            //@ts-ignore
            const { scrollHeight, offsetHeight } = inputRef.current
            if (scrollHeight > offsetHeight) {
                setTaHeight(scrollHeight)
            }
        }
    }, [])

    useEffect(() => {
        //@ts-ignore
        if (focus && inputRef !== null) inputRef.current.focus()
    }, [updater])

    const innerClasses = classNames('ef-input__inner', {
        'is-prefix-icon': prefixIcon,
        'is-suffix-icon': suffixIcon,
        'is-uneditable': !editable
    })

    return !textarea ? (
        <div className={`ef-input ${disabled ? 'is-disabled' : ''}`}>
            {prefixIcon && <i className={`ef-input__prefix-icon ewordfun ${prefixIcon}`}></i>}
            <input onChange={handleChange} name={name} className={innerClasses} autoComplete="off" disabled={disabled} readOnly={!editable} type={type} placeholder={placeholder} value={value} ref={inputRef} onFocus={onFocus} onBlur={onBlur} style={style} />
            {suffixIcon && <i className={`ef-input__suffix-icon ewordfun ${suffixIcon}`}></i>}
        </div>
    ) : <div className={`ef-textarea ${disabled ? 'is-disabled' : ''}`}>
            <textarea className={`ef-textarea__inner ${!editable ? 'is-uneditable' : ''}`} disabled={disabled} placeholder={placeholder} value={value} rows={row}
                onChange={handleChange} style={{ height: taHeight, ...style }} ref={inputRef} onFocus={onFocus} readOnly={!editable} onBlur={onBlur}>
            </textarea>
        </div >
}

export default Input

