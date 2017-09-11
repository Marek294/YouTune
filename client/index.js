/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware} from 'react-router-redux'
import rootReducer from './rootReducer';
import App from './components/App';

const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);