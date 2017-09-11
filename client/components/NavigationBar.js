/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import {
    Link
} from 'react-router-dom'

require('../sass/_NavigationBar.scss');

const NavigationBar = () => 
        <div className="sass-NavigationBar">
            <nav className="navbar navbar-light bg-faded">
                <Link to="/" className="navbar-brand" >
                    <img src="logo.png" height="70" alt="" />
                </Link>

                <form className="form-inline">
                    <input className="form-control" type="text" placeholder="Szukaj" />
                    <button className="btn" type="submit"><i className="fa fa-search" aria-hidden="true"/></button>
                </form>

                <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Logowanie</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/signup" className="nav-link">Rejestracja</Link>
                    </li>
                </ul>
            </nav>
        </div>

export default NavigationBar;