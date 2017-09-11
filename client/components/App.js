/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  BrowserRouter as Router, 
  Route,
} from 'react-router-dom'

import NavigationBar from "./NavigationBar";
import Categories from "./Categories";
import Player from "./Player";
import LoginPage from "./login/LoginPage";

const App = () => 
        <Router>
            <div>
                <NavigationBar/>
                <Route exact path="/" component={Categories} />
                <Route path="/player" component={Player} />
                <Route path="/login" component={LoginPage} />
            </div>
        </Router>

export default App;