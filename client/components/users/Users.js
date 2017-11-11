import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { search } from '../../actions/users';
import SearchUser from './SearchUser';
import Loader from '../loader/Loader';

import './_Users.scss';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            loading: false,
            start: true,
            errors: {}
        }

        this.search = this.search.bind(this);
    }

    search(data) {
        this.setState({
            loading: true
        });

        this.props.search(data)
            .then(users => this.setState({ users, loading: false, start: false, errors: {} }))
            .catch(err => {
                if(err.response.data.errors) this.setState({ loading: false, errors: { global: err.response.data.errors.global}})
            })
    }

    render() {
        const { users, loading, start, errors } = this.state;
        
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
        } else {
            displayUsers = (
                <div className="noUsers text-center">
                    <img src="unhappy.png" alt="" />
                    <h2>Nie znaleziono czytelników</h2>
                </div> )
        }

        return (
            <div className="sass-Users container">
                <div className="card">
                    <SearchUser search={this.search} errors={errors} />
                </div>
                <div className="card load">
                    { loading && <Loader text='Wyszukiwanie' /> }
                </div>
                { (!loading && !start) && <div className="users">
                    <div className="header">
                        <i className="fa fa-users" aria-hidden="true" />
                        <h4>Czytelnicy</h4>
                    </div>
                    <div className="body">
                        {displayUsers}
                    </div>
                </div> }
            </div>
        );
    }
}

Users.propTypes = {
    search: PropTypes.func.isRequired
}

export default connect(null, { search })(Users);