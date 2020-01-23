import ReactDOM from 'react-dom'
import * as serviceWorker from '../serviceWorker'
import routes from '@router/routes'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import React from 'react'

require('@components/theme-chalk/index.scss')

const App = () => {
    return (
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
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

