/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import jwtDecode from 'jwt-decode';
import rootReducer from './rootReducer';
import App from './components/App';
import { userLoggedIn } from './actions/auth';

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if(localStorage.youtuneJWT) {
    const payload = jwtDecode(localStorage.youtuneJWT);
    const user = { 
        email: payload.email,
        confirmed: payload.confirmed,
        token: localStorage.youtuneJWT };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>,
    document.getElementById('app')
);