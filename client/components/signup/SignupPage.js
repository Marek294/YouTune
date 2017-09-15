/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import SignupForm from './SignupForm';
import { signup } from '../../actions/users';

import '../../sass/_SignupPage.scss';

class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.notFetching = this.notFetching.bind(this);
    }

    submit = data => {
        this.props.fetching(true);
        return this.props.signup(data);
    }

    notFetching() {
        this.props.fetching(false);
    }

    render() {
        return (
            <div className="sass-SignupPage">
                <h1>Rejestracja</h1>
                <p>Zarejestruj się aby w pełni korzystać z katalogu książek dostępnych w twojej bibliotece. Szukaj pozycji które cię interesują, wypożycz i odbierz książkę w bibliotece.</p>
                <SignupForm submit={this.submit} notFetching={this.notFetching} />
            </div>
        );
    }
}

SignupPage.propTypes = {
    signup: PropTypes.func.isRequired,
    fetching: PropTypes.func.isRequired
}

export default connect(null, { signup })(SignupPage);