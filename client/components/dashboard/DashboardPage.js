/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import Loader from '../loader/Loader';
import Greetings from './greetings/Greetings';
import BorrowedBooks from './borrowedBooks/BorrowedBooks';
import Messages from './messages/Messages';
import Notifications from './notifications/Notifications';
import OpeningHours from './openingHours/OpeningHours';

import { getCurrentUser } from '../../actions/users';
import { getLending, getLendingHistoryCount } from '../../actions/lending';
import { getOpeningHours } from '../../actions/openingHours';

import './_DashboardPage.scss';

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            lending: [],
            openingHours: [],
            historyCount: '',
            loading: true
        }
    }

    componentWillMount() {
        const p1 = this.props.getCurrentUser();

        const p2 = this.props.getLending();

        const p3 = this.props.getOpeningHours();

        const p4 = this.props.getLendingHistoryCount();

        Promise.all([p1, p2, p3, p4]).then(values => {
            this.setState({
                user: values[0],
                lending: values[1],
                openingHours: values[2],
                historyCount: values[3].lendingHistory,
                loading: false
            })
        })
    }

    render() {
        const { loading, lending, user, openingHours, historyCount } = this.state;
        const { isConfirmed } = this.props;
        
        return (
            <div className="sass-DashboardPage">
                { !isConfirmed ? <ConfirmEmailMessage /> :
                    loading ? <div className="load"><Loader text="Wczytywanie" /></div> :
                        <div className="container">
                            <Greetings user={user} historyCount={historyCount} />
                            <BorrowedBooks lending={lending} />
                            <Messages />
                            <Notifications />
                            <OpeningHours openingHours={openingHours} />
                        </div>
                }
            </div>
        )  
    }  
}


DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isConfirmed: state.user.confirmed
    }
};

export default connect(mapStateToProps, { getCurrentUser, getLending, getOpeningHours, getLendingHistoryCount })(DashboardPage);