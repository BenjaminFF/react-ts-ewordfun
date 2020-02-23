import React, { useEffect, useContext, useState, useCallback } from 'react'
import I18nContext from './context'

const useTranslation = () => {
    const i18nInstance = useContext(I18nContext),
        [t, setT] = useState({ getT: i18nInstance.getT.bind(i18nInstance) }),
        [lang, setLang] = useState(i18nInstance.lang)
    const changeLang = (lang: string, callback: Function) => {
        i18nInstance.changeLang(lang)
        setLang(lang)
        if (callback) callback()
    }


    return [t.getT, changeLang]
}

export default useTranslation