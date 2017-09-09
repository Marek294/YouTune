import React from 'react';
import {
    Link
} from 'react-router-dom'

require('../sass/_NavigationBar.scss');

class NavigationBar extends React.Component {
    render() {
        return (
            <div className="sass-NavigationBar">
                <nav className="navbar navbar-light bg-faded">
                    <Link to="/" className="navbar-brand" >
                        <img src="logo.png" height="70" alt="" />
                    </Link>

                    <form className="form-inline">
                        <input className="form-control" type="text" placeholder="Szukaj" />
                        <button className="btn" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                    </form>

                    <ul className="nav nav-pills justify-content-end">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Zaloguj</a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default NavigationBar;