import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';

import './_LendingHistory.scss';
import '../_DashboardCard.scss';

class LendingHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lendingHistory: []
        }
    }

    componentWillMount() {
        const { lendingHistory } = this.props;

        this.setState({
            lendingHistory
        })
    }

    render() {
        const { lendingHistory } = this.state;
        moment.locale('pl'); 
        
        const displayLendingHistory = lendingHistory.map((item,i) => {
            return (
                <li key={i} className='list-group-item'>
                    <img src={item.book.cover ? item.book.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                    <div className="description">
                        <div className="titleDiv">
                            <p className="title">{item.book.title}</p>
                            <p className="author">{item.book.author}</p>
                        </div>
                        <div className="date">
                            <p>{moment(item.lent).format('LLL')}</p>
                            <i className="fa fa-arrow-right" aria-hidden="true" />
                            <p>{moment(item.created_at).format('LLL')}</p>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div className="sass-LendingHistory DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true" />
                    <h4>Historia wypożyczeń</h4>
                </div>
                <div className="body">
                    <ul className="list-group">
                        {displayLendingHistory}
                    </ul>
                </div>
            </div>
        );
    }
}

LendingHistory.propTypes = {
    lendingHistory: PropTypes.array.isRequired
}

export default LendingHistory;