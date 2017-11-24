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

import './_DashboardPage.scss';

class DashboardPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            loading: true,
            componentsLoading: {
                greetings: true
            }
        }

        this.setLoading = this.setLoading.bind(this);
        this.checkloading = this.checkloading.bind(this);
    }

    componentWillMount() {
        this.props.getCurrentUser().then(user => {
            this.setState({ user });
            this.setLoading('greetings');
        });
    }

    setLoading(name) {
        this.setState({
            componentsLoading: {
                ...this.state.componentsLoading,
                [name]: false
            }
        });

        this.checkloading();
    }

    checkloading() {
        const { componentsLoading } = this.state;

        Object.keys(componentsLoading).map(object => {
            const value = componentsLoading[object];
            if(value === true) return '';
        })

        this.setState({
            loading: false
        })
    }

    render() {
        const { loading, user } = this.state;
        const { isConfirmed } = this.props;
        return (
            <div className="sass-DashboardPage">
                { loading ? <div className="load"><Loader text="Wczytywanie" /></div> :
                    <div className="container">
                        <Greetings user={user} />
                        <BorrowedBooks />
                        <Messages />
                        <Notifications />
                        <OpeningHours />
                    {!isConfirmed && <ConfirmEmailMessage /> } 
                </div> }
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

export default connect(mapStateToProps, { getCurrentUser })(DashboardPage);