import React, { createElement } from 'react'
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'
import Toast from './Toast'
import Animlist from '@components/animlist'
import TWEEN from '@utils/tween'
import { transform } from '@babel/core'

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
    messageContainer.style.marginTop = '10px'
    if (messageBox) {
        messageBox.appendChild(messageContainer)
    } else {
        const messageBox = document.createElement('div')
        messageBox.className = 'ef-message-box'
        messageBox.appendChild(messageContainer)
        document.body.appendChild(messageBox)
    }

    props.willUnMount = () => {
        const messageBox = document.getElementsByClassName('ef-message-box')[0],
            { offsetHeight } = messageContainer,
            curIndex = Array.prototype.slice.call(messageBox.children).indexOf(messageContainer)

        new TWEEN.Tween().from({ offsetY: 0, opacity: 1 }).to({ offsetY: -offsetHeight - 10, opacity: 0 }, 200).easing(TWEEN.Easing.Linear).onUpdate(({ offsetY, opacity }) => {
            for (let i = 0; i < messageBox.children.length; i++) {
                //@ts-ignore
                messageBox.children[curIndex].style.opacity = `${opacity}`
                if (i >= curIndex) {
                    //@ts-ignore
                    messageBox.children[i].style.transform = `translateY(${offsetY}px)`
                }
            }

        }).onStop(() => {
            for (let i = 0; i < messageBox.children.length; i++) {
                //@ts-ignore
                messageBox.children[i].style.transform = 'translateY(0px)'
            }
            unmountComponentAtNode(messageContainer)
            messageBox.removeChild(messageContainer)
        }).start()
    }
    const comp = createElement(Toast, Object.assign(props))

    render(comp, messageContainer)
}

export default Message