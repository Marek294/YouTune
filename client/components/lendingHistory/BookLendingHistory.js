import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getBookLendingHistory } from '../../actions/lending';

import './_BookLendingHistory.scss';

class BookLendingHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            lendingHistory: [],
            page: 1,
            errors: {}
        }
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const { page } = this.state;
        moment.locale('pl'); 

        this.props.getBookLendingHistory(id, page)
            .then(lendingHistory => this.setState({ lendingHistory, id }))
            .catch(err => this.setState({ errors: err.response.data.errors, id }))
    }

    displayLend(item, i) {
        return (
            <li className="list-group-item">
                <img src={item.user.avatar} alt="" />
                <div className="text">
                    <p>{item.user.firstname} {item.user.lastname}</p>
                    <p>Data wypożyczenia: {moment(item.lent).format('LLL')}</p>
                    <p>Data oddania: {moment(item.created_at).format('LLL')}</p>
                </div>
            </li>
        )
    }

    render() {
        const { lendingHistory } = this.state;

        const displayLendingHistory = lendingHistory.map((item, i) => this.displayLend(item, i))

        return (
            <div className="sass-BookLendingHistory container">
                <ul className="list-group">
                    {displayLendingHistory}
                </ul>
            </div>
        );
    }
}

export default connect(null, { getBookLendingHistory })(BookLendingHistory);