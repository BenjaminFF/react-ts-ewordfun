import React, { createElement } from 'react'
import ReactDOM, { render } from 'react-dom'
import Toast from './Toast'

export enum Type {
    Success = 'success',
    Info = 'info',
    Error = 'error',
    Warning = 'warning'
}

interface Props {
    message: string
    duration?: number
    type?: Type
    onClose?: () => void
    willUnMount?: () => void
}

const Message = (props: Props) => {
    const messageBox = document.getElementsByClassName('ef-message-box')[0]
    const messageContainer = document.createElement('div')
    if (messageBox) {
        messageBox.appendChild(messageContainer)
    } else {
        const messageBox = document.createElement('div')
        messageBox.className = 'ef-message-box'
        messageBox.appendChild(messageContainer)
        document.body.appendChild(messageBox)
    }

    props.willUnMount = () => {
        console.log('willUnMount')
    }

    const comp = createElement(Toast, Object.assign(props))

    render(comp, messageContainer)
}

export default Message