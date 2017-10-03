/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

import '../sass/_NavigationBar.scss';

const NavigationBar = ({ isAuthenticated, logout }) => 
        <div className="sass-NavigationBar">
            <nav className="navbar navbar-light bg-faded">
                <Link to="/" className="navbar-brand" >
                    <img src="/brand.png" height="70" alt="" />
                </Link>

                {isAuthenticated && <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item">
                        <Link to="/users" className="nav-link">Czytelnicy</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/catalog" className="nav-link">Katalog</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/settings" className="nav-link">Ustawienia</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => logout()}>Wyloguj</Link>
                    </li>
                </ul> }
            </nav>
        </div>

NavigationBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, { logout: actions.logout })(NavigationBar);