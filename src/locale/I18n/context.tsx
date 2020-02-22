import React, { FC } from 'react'
import I18n from './I18n'

const i18n = new I18n()

const I18nContext = React.createContext(i18n)

export default I18nContext