import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {mergeApp} from './reducers'
import {App} from './components/App';
import {Home} from './components/Home';
import {AuthFormsContainer} from './containers/AuthFormsContainer';
import {Logout} from './components/Logout';
import {MergeList} from './components/MergeList';
import {Merge} from './components/Merge';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import {AuthLoginActions} from './actions/authLogin'
import {loadMergeListFetch} from './actions/loadMergeList'
import { Router, Route, IndexRoute } from 'react-router'
import {loadMergeOnEnter} from './actions/loadMerge'
import {IS_PRODUCTION} from './utils/config'

const loggerMiddleware = createLogger()

const composeEnhancers = IS_PRODUCTION === false && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let middleWares = [thunkMiddleware, routerMiddleware(browserHistory)]
if(IS_PRODUCTION === false){
  middleWares = middleWares.concat(loggerMiddleware)
}

const store = createStore(mergeApp, {},
                composeEnhancers(applyMiddleware(...middleWares)))


const access_token = sessionStorage.getItem('access_token')

if (access_token !== null) {
  store.dispatch(AuthLoginActions.prototype.authLoginSuccess({'access_token':access_token}))
  store.dispatch(loadMergeListFetch(access_token))
}


ReactDOM.render(
  <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
             {/*<Route path="register" component={Register} />*/}
            <Route path="/login" component={AuthFormsContainer} />
            <Route path="/logout" component={Logout} />
            <Route>
                <Route path="/merges" component={MergeList} />
                <Route path="/merge/:id" component={Merge} onEnter={loadMergeOnEnter(store)}/>
                {/*change "merge" path to not conflict with django*/}
            </Route>
            {/*<Route path="*" component={NotFound} />*/}
        </Route>
      </Router>
  </Provider>,
  document.getElementById('root'))

  