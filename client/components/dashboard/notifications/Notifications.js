import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_Notifications.scss';
import '../_DashboardCard.scss';

class Notifications extends Component {
    render() {
        return (
            <div className="sass-Notifications DashboardCard">
                <div className="header">
                    <i className="fa fa-bell-o" aria-hidden="true"></i>
                    <h4>Powiadomienia</h4>
                </div>
                <div className="footer">
                    <Link to="" className="link">Zobacz wszystkie</Link>
                </div>
            </div>
        );
    }
}

export default Notifications;