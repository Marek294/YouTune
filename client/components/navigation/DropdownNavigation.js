/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import {
    Link
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { logout } from '../../actions/auth';

import './_DropdownNavigation.scss';

class DropdownNavigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggleDropdown: false
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggleDropdown() {
        this.setState({
            toggleDropdown: !this.state.toggleDropdown
        });
    }

    logout() {
        this.toggleDropdown();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, isLibrarian } = this.props;
        const { toggleDropdown } = this.state;

        return (
            <div className="sass-DropdownNavigation">
                <nav className="navbar navbar-light bg-faded">
                    <Link to="/" className="navbar-brand" >
                        <img src="/brand.png" height="70" alt="" />
                    </Link>

                    {isAuthenticated && <ul className="nav nav-pills">
                        <li className={classNames("nav-item", "dropdown", toggleDropdown && 'show')}>
                            <a className="nav-link dropdown-toggle" onClick={this.toggleDropdown}>Menu</a>
                            <div className={classNames("dropdown-menu", toggleDropdown && 'show')}>
                                { isLibrarian && 
                                     <div>    
                                        <Link to="/addBook" className="nav-link" onClick={this.toggleDropdown}>
                                            <i className="fa fa-plus" aria-hidden="true"></i>
                                            <p>Dodaj książkę</p>
                                        </Link>
                                        <Link to="/users" className="nav-link" onClick={this.toggleDropdown}>
                                            <i className="fa fa-users" aria-hidden="true"></i>
                                            <p>Czytelnicy</p>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                     </div>                 
                                }
                                <Link to="/catalog" className="nav-link" onClick={this.toggleDropdown}>
                                    <i className="fa fa-book" aria-hidden="true"></i>
                                    <p>Katalog</p>
                                </Link>
                                <Link to="/settings" className="nav-link" onClick={this.toggleDropdown}>
                                    <i className="fa fa-cog" aria-hidden="true"></i>
                                    <p>Ustawienia</p>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/" className="nav-link" onClick={this.logout}>
                                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                                    <p>Wyloguj</p>
                                </Link>  
                            </div>
                        </li>
                    </ul> }
                </nav>
            </div>
        );
    }
}       

DropdownNavigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    isLibrarian: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        isLibrarian: state.user.librarian
    }
}

export default connect(mapStateToProps, { logout })(DropdownNavigation);