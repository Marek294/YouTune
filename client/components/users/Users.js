import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../actions/users';
import SearchUser from './SearchUser';
import Notificator from '../messages/Notificator';
import Loader from '../loader/Loader';

import './_Users.scss';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            search: {
                firstname: '',
                lastname: ''
            },
            loading: false,
            start: true,
            deleteLoading: false,
            modalIsOpen: false,
            deleteUserId: -1,
            error: {}
        }

        this.search = this.search.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
    }

    search(data) {
        this.setState({
            loading: true,
            search: {
                firstname: data.firstname,
                lastname: data.lastname
            }
        });

        this.props.getUsers()
            .then(users => this.setState({ users, loading: false, start: false }))
            .catch(() => this.setState({ loading: false, error: { global: "Nie jesteś pracownikiem"}}))
    }

    render() {
        const { users, loading, start, error } = this.state;
        
        let displayUsers;
        if(users.length > 0) {
            displayUsers = users.map((user, i) => {
                return (
                    <div key={i} className="user">
                        { user.avatar ? <img src={user.avatar} alt="" /> : <img src="noAvatar.jpg" alt="" /> }
                        <div className="userData text-center">
                            <h4>{user.firstname}</h4>
                            <h4>{user.lastname}</h4>
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className="sass-Users container">
                <div className="card">
                    <SearchUser search={this.search} />
                </div>
                <div className="card load">
                    { loading && <Loader text='Wyszukiwanie' /> }
                </div>
                { error.global  && <div className="alert alert-danger" role="alert"> { error.global } </div> }
                { (!loading && !start) && <div className="users">
                    <div className="header">
                        <i className="fa fa-users" aria-hidden="true" />
                        <h4>Czytelnicy</h4>
                    </div>
                    <div className="body">
                        {displayUsers}
                    </div>
                </div>
                }
                <Notificator ref="notificator"/>
            </div>
        );
    }
}

export default connect(null, { getUsers, deleteUser })(Users);