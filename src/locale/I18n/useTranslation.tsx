import React, { useEffect, useContext, useState } from 'react'
import I18nContext from './context'


const useTransition = () => {
    const i18nContext = useContext(I18nContext), [t, setT] = useState(i18nContext.i18n?.getT())

    // useEffect(() => {
    //     setT(i18nContext.i18n?.getT())
    // }, [])

    return [t, i18nContext.i18n]

}

export default useTransition