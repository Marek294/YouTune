import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import SearchUser from './SearchUser';

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
            loading: true,
            error: {}
        }

        this.search = this.search.bind(this);
    }

    componentWillMount() {
        this.props.getUsers()
            .then(users => this.setState({ users, loading: false }))
            .catch(() => this.setState({ loading: false, error: { global: "Nie jesteś pracownikiem"}}))
    }

    search(data) {
        this.setState({
            search: {
                firstname: data.firstname,
                lastname: data.lastname
            }
        });
    }

    render() {
        const { users, loading, search, error } = this.state;
        
        let displayUsers;
        if(users.length > 0) {
            displayUsers = users.map((user, i) => {
                if(user.firstname.toLowerCase().includes(search.firstname.toLowerCase()) && user.lastname.toLowerCase().includes(search.lastname.toLowerCase())) {
                    return (
                        <li key={i} className="list-group-item">
                        <div className="user-info">
                            <h3 className="bold">{user.firstname} {user.lastname}</h3>
                            <p className="grey">{user.email}</p>
                            <p className="grey">{user.confirmed ? 'Zatwierdzony' : 'Niezatwierdzony'}</p>
                        </div>
                    </li>
                    )
                }
            })
        }

        return (
            <div className="sass-Users container-fluid">
                <div className="card search-form">
                    <div className="card-header">
                        <h4>Wyszukiwanie</h4>
                    </div>
                    <div className="card-body">
                        <SearchUser search={this.search} />
                    </div>
                </div>
                { error.global  && <div className="alert alert-danger" role="alert"> { error.global } </div> }
                { loading ? <div className="loader" /> :
                        users.length > 0 && <div className="card users">
                        <div className="card-header">
                            <h4>Czytelnicy</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {displayUsers}
                            </ul>
                        </div>
                    </div>
                    }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isFetching: state.fetch.isFetching,
        users: state.users

    }
}

export default connect(mapStateToProps, { getUsers })(Users);