import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import routes from '@router/routes'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'
import I18n, { I18nContext } from '@locale/I18n'
import resource from '@locale/resource'
require('@components/theme-chalk/index.scss')

const i18nInstance: I18n = new I18n().init(resource, 'cn')

const App = () => {
    return (
        <I18nContext.Provider value={i18nInstance}>
            <Router>
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
            </Router>
        </I18nContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

