import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_LendingHistory.scss';
import '../_DashboardCard.scss';

class LendingHistory extends Component {
    render() {
        return (
            <div className="sass-LendingHistory DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <h4>Historia wypożyczeń</h4>
                </div>
                <ul className="list-group">
                </ul>
            </div>
        );
    }
}

export default LendingHistory;