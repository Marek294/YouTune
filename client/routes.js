import React from 'react'
import { Route, IndexRoute } from 'react-router-dom'

import App from './components/App';
import MainPage from './components/Categories';
import Player from './components/Player';

export default (
    <Route path="/" component={App} >
        <IndexRoute component={MainPage} />
        <Route path="/player" component={Player} />
    </Route>
);