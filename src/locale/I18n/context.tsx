import React, { FC } from 'react'
import I18n from './I18n'

interface Context {
    i18n: I18n | undefined
}

const I18nContext = React.createContext<Context>({ i18n: undefined })

export default I18nContext