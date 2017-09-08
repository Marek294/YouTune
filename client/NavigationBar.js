import React from 'react';

class NavigationBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-faded">
                <a className="navbar-brand" href="#">
                    <img src="logo.png" height="70" alt="" />
                </a>

                <form className="form-inline">
                    <input className="form-control" type="text" placeholder="Search" />
                        <button className="btn" type="submit"><i className="fa fa-search" aria-hidden="true"></i></button>
                </form>

                <ul className="nav nav-pills justify-content-end">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">Zaloguj</a>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavigationBar;