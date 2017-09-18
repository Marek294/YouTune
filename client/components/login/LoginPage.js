/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import { login } from '../../actions/auth';

import '../../sass/_LoginPage.scss';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.notFetching = this.notFetching.bind(this);
    }

    submit = data => {
        this.props.fetching(true);
        return this.props.login(data);
    }

    notFetching() {
        this.props.fetching(false);
    }

    render() {
        return (
            <div className="sass-LoginPage">
                <h1>Logowanie</h1>
                <LoginForm submit={this.submit} notFetching={this.notFetching} signupLink={this.props.signupLink} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired,
    fetching: PropTypes.func.isRequired,
    signupLink: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);