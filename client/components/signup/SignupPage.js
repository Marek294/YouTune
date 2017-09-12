/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import SignupForm from './SignupForm';
import { signup } from '../../actions/users';

require('../../sass/_SignupPage.scss');

class SignupPage extends Component {
    submit = data => this.props.signup(data).then(() => this.props.history.push("/dashboard"));

    render() {
        return (
            <div className="sass-SignupPage">
                <h1>Rejestracja</h1>
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}

SignupPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);