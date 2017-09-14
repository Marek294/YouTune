/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import classNames from 'classnames';
import LoginPage from "./login/LoginPage";
import SignupPage from "./signup/SignupPage";

require('../sass/_HomePage.scss');

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login: true,
            signup: false
        };

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
    }

    login() {
        this.setState({
            login: true,
            signup: false
        });
    }

    signup() {
        this.setState({
            login: false,
            signup: true
        });
    }

    render() {
        const { login, signup } = this.state;
        return (
            <div className="sass-HomePage">
            <div className="card home-text">
                <img src="logo.png" alt="" />
                <h1>Witamy!</h1>
            </div>
            <div className="card home-form">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                        <div className={classNames('nav-link', login ? 'active' : 'notActive')} onClick={this.login}>Logowanie</div>
                    </li>
                    <li className="nav-item">
                        <div className={classNames('nav-link', signup ? 'active' : 'notActive')} onClick={this.signup}>Rejestracja</div>
                    </li>
                    </ul>
                </div>
                <div className="card-body">
                    { login && <LoginPage />}
                    { signup && <SignupPage />}
                </div>
                </div>
        </div>
        );
    }
}

export default HomePage;