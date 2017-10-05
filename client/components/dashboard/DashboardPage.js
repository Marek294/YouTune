/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import Greetings from './greetings/Greetings';

import './_DashboardPage.scss';

const DashboardPage = ({ isConfirmed }) => 
        <div className="sass-DashboardPage">
            <Greetings />
           {isConfirmed ? <h1>Email potwierdzony</h1> : <ConfirmEmailMessage />} 
        </div>


DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isConfirmed: state.user.confirmed
    }
};

export default connect(mapStateToProps)(DashboardPage);