/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import LoginPage from "../login/LoginPage";

import './_HomePage.scss';

class HomePage extends Component {
    render() {
        return (
            <div className="sass-HomePage">
                <img className="backgroundImage" src="backgroundImage.png" alt=""/>
                <div className="home-text">
                    <img src="brand.png" alt="" />
                    <h1>Bądź Bliżej<br/>Twojej Biblioteki</h1>
                </div>

                <div className="card home-form">
                    <div className="card-header">
                        <h1>Witamy</h1>
                    </div>
                    <div className="card-body">
                        <LoginPage fetching={this.fetching} signupLink={this.signup} />
                    </div>
                    </div>
            </div>
        );
    }
}

export default HomePage;