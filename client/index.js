import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import rootReducer from './rootReducer';

const history = createHistory();
const middleware = routerMiddleware(history);

let store = createStore(
    rootReducer,
    compose(
        applyMiddleware(middleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    ));

import App from './components/App';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);