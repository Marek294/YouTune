/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import SignupForm from './SignupForm';
import { signup } from '../../actions/users';

import './_SignupPage.scss';

class SignupPage extends Component {
    submit = data => {
        return this.props.signup(data);
    }

    render() {
        return (
            <div className="sass-SignupPage">
                <Link to="/" ><img src="brand.png" alt=""/></Link>
                <div className="line" />
                <SignupForm submit={this.submit} />
            </div>
        );
    }
}

SignupPage.propTypes = {
    signup: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);