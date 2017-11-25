import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Greetings from './greetings/Greetings';
import BorrowedBooks from './borrowedBooks/BorrowedBooks';
import LendingHistory from './lendingHistory/LendingHistory';
import Loader from '../loader/Loader';
import { getUser } from '../../actions/users';
import { getUserLending, getUserLendingHistory } from '../../actions/lending';

import './_ShowUser.scss';

class showUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            userLending: [],
            userLendingHistory: [],
            errors: {},
            loading: true
        }

        this.addLendHistory = this.addLendHistory.bind(this);
    }

    componentWillMount(){
        const { id } = this.props.location.state;

        const p1 = this.props.getUser(id);

        const p2 = this.props.getUserLending(id);

        const p3 = this.props.getUserLendingHistory(id);

        Promise.all([p1, p2, p3])
            .then(values => this.setState({ user: values[0], userLending: values[1], userLendingHistory: values[2], loading: false }))
            .catch(err => this.setState({ errors: { global: 'Wystąpił błąd podczas wczytywania danych użytkownika'}, loading: false }))
    }

    addLendHistory(lendHistory) {
        const { userLendingHistory } = this.state;

        userLendingHistory.unshift(lendHistory);

        this.setState({ userLendingHistory });
    }

    render() {
        const { user, userLending, userLendingHistory, loading } = this.state;
        return (
            <div className="sass-ShowUser">
                { loading ? <div className="load"><Loader text="Wczytywanie" /></div> :
                    <div className="container">
                        <Greetings user={user} />
                        <BorrowedBooks lending={userLending} addLendHistory={this.addLendHistory} />
                        <LendingHistory lendingHistory={userLendingHistory} />
                </div> }
            </div>
        )
    }
}

showUser.propTypes = {
    getUser: PropTypes.func.isRequired,
    getUserLending: PropTypes.func.isRequired,
    getUserLendingHistory: PropTypes.func.isRequired,
    location: PropTypes.shape({
        state: PropTypes.shape({
            id: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
}

export default connect(null, { getUser, getUserLending, getUserLendingHistory })(showUser);
