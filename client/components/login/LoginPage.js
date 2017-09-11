/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import LoginForm from './LoginForm';
import { login } from '../../actions/auth';

require('../../sass/_LoginPage.scss');

class LoginPage extends Component {
    submit = data => this.props.login(data).then(() => this.props.history.push("/"));

    render() {
        return (
            <div className="sass-LoginPage">
                <h1>Logowanie</h1>
                <LoginForm submit={this.submit} />
            </div>
        );
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, { login })(LoginPage);