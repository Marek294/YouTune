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
        if (!this.state.toggleDropdown) {
            document.addEventListener('click', this.toggleDropdown, false);
          } else {
            document.removeEventListener('click', this.toggleDropdown, false);
          }

        this.setState({
            toggleDropdown: !this.state.toggleDropdown
        });
    }

    logout() {
        this.toggleDropdown();
        this.props.logout();
    }

    render() {
        const { isAuthenticated, isLibrarian, personalData } = this.props;
        const { toggleDropdown } = this.state;

        return (
            <div className="sass-DropdownNavigation">
                { isAuthenticated && 
                    <nav className="navbar navbar-light bg-faded">
                        <Link to="/" className="navbar-brand" >
                            <img src="/brand.png" height="70" alt="" />
                        </Link>
                        <ul className="nav nav-pills">
                            <li className="nav-item icon">
                                <i className="fa fa-envelope-o" aria-hidden="true" />
                            </li>
                            <li className="nav-item icon">
                                <i className="fa fa-bell-o" aria-hidden="true" />
                                <div className="badge"><p>3</p></div>
                            </li>
                            <li className={classNames("nav-item", "dropdown", toggleDropdown && 'show')} >
                                <a className="nav-link dropdown-link" onClick={this.toggleDropdown}>
                                    {personalData.avatar ? <img src={personalData.avatar} alt="" /> : <img src="noAvatar.jpg" alt="" /> }
                                    <p>{personalData.firstname} {personalData.lastname}</p>
                                    <i className="fa fa-chevron-down" aria-hidden="true" />
                                </a>
                                <div className={classNames("dropdown-menu", toggleDropdown && 'show')}>
                                    { isLibrarian && 
                                        <div>    
                                            <Link to="/addBook" className="nav-link">
                                                <i className="fa fa-plus" aria-hidden="true" />
                                                <p>Dodaj książkę</p>
                                            </Link>
                                            <Link to="/users" className="nav-link">
                                                <i className="fa fa-users" aria-hidden="true" />
                                                <p>Czytelnicy</p>
                                            </Link>
                                            <div className="dropdown-divider"></div>
                                        </div>                 
                                    }
                                    <Link to="/catalog" className="nav-link">
                                        <i className="fa fa-book" aria-hidden="true" />
                                        <p>Katalog</p>
                                    </Link>
                                    <Link to="/settings" className="nav-link">
                                        <i className="fa fa-cog" aria-hidden="true" />
                                        <p>Ustawienia</p>
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/" className="nav-link" onClick={this.logout}>
                                        <i className="fa fa-sign-out" aria-hidden="true" />
                                        <p>Wyloguj</p>
                                    </Link>  
                                </div>
                            </li>
                        </ul>
                    </nav> }
            </div>
        );
    }
}       

DropdownNavigation.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        isLibrarian: state.user.librarian,
        personalData: {
            firstname: state.user.firstname,
            lastname: state.user.lastname,
            avatar: state.user.avatar
        }
    }
}

export default connect(mapStateToProps, { logout })(DropdownNavigation);