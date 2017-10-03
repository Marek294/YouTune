import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import SearchUser from './SearchUser';

import '../../sass/_Users.scss';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: {
                firstname: '',
                lastname: ''
            }
        }

        this.search = this.search.bind(this);
    }

    componentWillMount() {
        this.props.getUsers();
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
        const { isFetching, users } = this.props;
        const { search } = this.state;
        
        let displayUsers = users.map((user, i) => {
            if(user.firstname.includes(search.firstname) && user.lastname.includes(search.lastname)) {
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
                { isFetching ? <div className="loader" /> :
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