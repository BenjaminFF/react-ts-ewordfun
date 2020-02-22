import React, { useEffect, useContext, useState, useCallback } from 'react'
import I18nContext from './context'

const useTransition = () => {
    const i18nInstance = useContext(I18nContext),
        [t, setT] = useState({ getT: i18nInstance.getT.bind(i18nInstance) }),
        [lang, setLang] = useState(i18nInstance.lang)
    const changeLang = useCallback(
        (lang) => {
            i18nInstance.changeLang(lang)
            setLang(lang)
        }, [lang]
    )

    useEffect(() => {
        setT({ getT: i18nInstance.getT.bind(i18nInstance) })
    }, [lang])

    return [t.getT, changeLang]
}

export default useTransition