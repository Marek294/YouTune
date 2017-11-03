/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import { login } from '../../actions/auth';

import './_LoginPage.scss';

class LoginPage extends Component {
    submit = data => {
        return this.props.login(data);
    }

    render() {
        return (
            <div className="sass-LoginPage">
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);