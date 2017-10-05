/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  Route,
} from 'react-router-dom'
import PropTypes from 'prop-types';

import NavigationBar from "./navigation/NavigationBar";
import HomePage from "./home/HomePage";
import DashboardPage from "./dashboard/DashboardPage";
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import LibrarianRoute from './routes/LibrarianRoute';
import ConfirmationPage from './confirmation/ConfirmationPage';
import Catalog from './catalog/Catalog';
import ForgotPasswordPage from './forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './resetPassword/ResetPasswordPage';
import Users from './users/Users';
import Settings from './settings/Settings'

require('../sass/_loader.scss');

const App = ({ location }) => {
        return (
            <div>
                <NavigationBar/>
                <GuestRoute location={location} exact path="/" component={HomePage} />
                <GuestRoute location={location} exact path="/forgotPassword" component={ForgotPasswordPage} />
                <Route location={location} exact path="/confirmation/:token" component={ConfirmationPage} />
                <Route location={location} exact path="/resetPassword/:token" component={ResetPasswordPage} />
                <UserRoute location={location} exact path="/dashboard" component={DashboardPage} />
                <UserRoute location={location} exact path="/catalog" component={Catalog} />
                <UserRoute location={location} exact path="/settings" component={Settings} />
                <LibrarianRoute location={location} exact path="/users" component={Users} />
            </div>
        )
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;