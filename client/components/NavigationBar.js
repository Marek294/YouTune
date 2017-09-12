/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';

require('../sass/_NavigationBar.scss');

const NavigationBar = ({ isAuthenticated, logout }) => 
        <div className="sass-NavigationBar">
            <nav className="navbar navbar-light bg-faded">
                <Link to="/" className="navbar-brand" >
                    <img src="/logo.png" height="70" alt="" />
                </Link>

                <form className="form-inline">
                    <input className="form-control" type="text" placeholder="Szukaj" />
                    <button className="btn" type="submit"><i className="fa fa-search" aria-hidden="true"/></button>
                </form>

                {isAuthenticated ? <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => logout()}>Wyloguj</Link>
                    </li>
                </ul> :
                <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Zaloguj</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">Rejestracja</Link>
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