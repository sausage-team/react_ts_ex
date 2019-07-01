import { createBrowserHistory } from 'history'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'
import * as React from 'react'
import { Route, Router, Switch, Redirect } from 'react-router'
import Loadable from 'react-loadable'
import Loading from 'src/components/loading'
import * as delay from 'delay'

const browserHistory = createBrowserHistory()
const routerStore = new RouterStore()
const history = syncHistoryWithStore(browserHistory, routerStore)

const LoginLoading = Loadable({
  loader: async () => {  
    await delay(1000)
    return import('src/pages/login')
  },
  loading: Loading,
  delay: 300
})

const RegistLoading = Loadable({
  loader: () => import('src/pages/register'),
  loading: Loading,
  delay: 300
})

const MainLoading = Loadable({
  loader: () => import('src/pages/main'),
  loading: Loading,
  delay: 300
})
export default class AppRouter extends React.Component<{}, {}> {

  constructor (props: any) {
    super(props)
  }

  public render () {
    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/"
            exact
            component={MainLoading}
          />
          <Route
            path="/main"
            component={MainLoading}
          />
          <Route
            path="/login"
            component={LoginLoading}
          />
          <Route
            path="/regist"
            component={RegistLoading}
          />
          <Redirect to="/" />
        </Switch>
      </Router>
    )
  }
}
