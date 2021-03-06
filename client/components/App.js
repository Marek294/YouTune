/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
  Route,
} from 'react-router-dom'
import PropTypes from 'prop-types';

import DropdownNavigation from "./navigation/DropdownNavigation";
import HomePage from "./home/HomePage";
import SignupPage from "./signup/SignupPage";
import DashboardPage from "./dashboard/DashboardPage";
import UserRoute from './routes/UserRoute';
import GuestRoute from './routes/GuestRoute';
import LibrarianRoute from './routes/LibrarianRoute';
import ConfirmationPage from './confirmation/ConfirmationPage';
import Catalog from './catalog/Catalog';
import ForgotPasswordPage from './forgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './resetPassword/ResetPasswordPage';
import Users from './users/Users';
import Settings from './settings/Settings';
import AddBook from './book/addBook';
import ShowBook from './book/showBook';
import UpdateBook from './book/updateBook';
import ShowUser from './user/showUser';
import Lend from './lend/Lend';
import BookLendingHistory from './book/lendingHistory/BookLendingHistory';
import UserLendingHistory from './user/lendingHistory/UserLendingHistory';
import OpeningHours from './openingHours/openingHours';
import Notificator from './messages//Notificator';

require('../sass/_loader.scss');
require('../sass/_reactModal.scss');

const App = ({ location, history }) => {
        return (
            <div>
                <DropdownNavigation/>
                <Notificator />
                <GuestRoute location={location} exact path="/" component={HomePage} />
                <GuestRoute location={location} exact path="/forgotPassword" component={ForgotPasswordPage} />
                <GuestRoute location={location} exact path="/signup" component={SignupPage} />
                <Route location={location} exact path="/confirmation/:token" component={ConfirmationPage} />
                <Route location={location} exact path="/resetPassword/:token" component={ResetPasswordPage} />
                <UserRoute location={location} exact path="/dashboard" component={DashboardPage} />
                <UserRoute location={location} exact path="/catalog" component={Catalog} />
                <UserRoute location={location} exact path="/settings" component={Settings} />
                <UserRoute location={location} history={history} exact path="/book" component={ShowBook} />
                <LibrarianRoute location={location} exact path="/users" component={Users} />
                <LibrarianRoute location={location} history={history} exact path="/addBook" component={AddBook} />
                <LibrarianRoute location={location} history={history} exact path="/updateBook" component={UpdateBook} />
                <LibrarianRoute location={location} exact path="/user" component={ShowUser} />
                <LibrarianRoute location={location} exact path="/lend" component={Lend} />
                <LibrarianRoute location={location} exact path="/bookLendingHistory" component={BookLendingHistory} />
                <LibrarianRoute location={location} exact path="/userLendingHistory" component={UserLendingHistory} />
                <LibrarianRoute location={location} history={history} exact path="/openingHours" component={OpeningHours} />
            </div>
        )
}

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
}

export default App;