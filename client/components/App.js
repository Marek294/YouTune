/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  Route,
} from 'react-router-dom'
import PropTypes from 'prop-types';

import NavigationBar from "./NavigationBar";
import Categories from "./Categories";
import Player from "./Player";
import DashboardPage from "./DashboardPage";
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';

const App = ({ location }) => {
        return (
            <div>
                <NavigationBar/>
                <Route location={location} exact path="/" component={Categories} />
                <Route location={location} path="/player" component={Player} />
                <GuestRoute location={location} path="/login" component={LoginPage} />
                <GuestRoute location={location} path="/signup" component={SignupPage} />
                <UserRoute location={location} path="/dashboard" component={DashboardPage} />
            </div>
        )
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;