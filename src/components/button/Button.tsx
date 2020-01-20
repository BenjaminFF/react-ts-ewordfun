import React, { FC, FormEvent, Children } from 'react'
import className from 'classnames'
require('@components/theme-chalk/button.scss')


export enum ButtonType {
    Primary = "primary",
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Info = "info"
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
}

const Button: FC<Props> = ({ type, loading, disabled, size, children, onClick, matchParent }) => {

    const classes = className('ef-button', type ? `ef-button--${type}` : '', size ? `ef-button--${size}` : '',
        {
            'is-disabled': disabled,
            'is-loading': loading,
            'is-match-parent': matchParent
        }
    )
    return (
        <button className={classes} onClick={onClick}>{children}</button>
    )
}

export default Button