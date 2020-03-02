import React, { FC, FormEvent, Children } from 'react'
import classNames from 'classnames'


export enum ButtonType {
    Primary = "primary",
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Info = "info",
    Text = "text"
}

export enum ButtonSize {
    Medium = "medium",
    Mini = "mini",
    Small = "small"
}

export interface Props {
    type?: ButtonType
    loading?: boolean
    disabled?: boolean
    size?: ButtonSize
    matchParent?: boolean
    onClick?: () => void
    circle?: boolean
    icon?: string
}

const Button: FC<Props> = ({ type, loading, disabled, size, children, onClick, matchParent, circle = false, icon }) => {

    const classes = classNames('ef-button', type ? `ef-button--${type}` : '', size ? `ef-button--${size}` : '',
        {
            'is-disabled': disabled,
            'is-loading': loading,
            'is-match-parent': matchParent,
            'is-circle': circle
        }
    )
    return (
        <button className={classes} onClick={onClick}>
            {children}
            {loading && <i className='ewordfun rte-loading ef-button__icon'></i>}
            {icon && <i className={`ewordfun ${icon} ef-button__icon`}></i>}
        </button >
    )
}

export default Button