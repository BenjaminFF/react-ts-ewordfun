import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import routes from '@router/routes'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import I18n, { I18nContext } from '@locale/I18n'
import resource from '@locale/resource'
import { getCookie } from '@utils/util'
require('@components/theme-chalk/index.scss')

const lang = localStorage.getItem('lang') || 'cn', i18nInstance = new I18n().init(resource, lang)

const App = () => {

    const history = useHistory(), [loading, setLoading] = useState(true)

    useEffect(() => {
        const uid = getCookie('uid'), { pathname } = history.location, isProtectedPage = pathname.indexOf('user') !== -1
        if (uid === '' && isProtectedPage) history.replace('/login')
        if (uid !== '' && !isProtectedPage) history.replace('/user/set')
        setLoading(false)
    }, [])

    return !loading ? (
        <I18nContext.Provider value={i18nInstance}>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </Switch>
        </I18nContext.Provider>
    ) : null
}

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

