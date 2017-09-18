/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  Route,
} from 'react-router-dom'
import PropTypes from 'prop-types';

import NavigationBar from "./NavigationBar";
import HomePage from "./HomePage";
import DashboardPage from "./user/DashboardPage";
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import ConfirmationPage from './ConfirmationPage';
import Catalog from './user/Catalog';
import ForgotPasswordPage from './forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './resetPassword/ResetPasswordPage';

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
            </div>
        )
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;