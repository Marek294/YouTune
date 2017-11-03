import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_Messages.scss';
import '../_DashboardCard.scss';

class Messages extends Component {
    render() {
        return (
            <div className="sass-DashboardMessages DashboardCard">
                <div className="header">
                    <i className="fa fa-envelope-o" aria-hidden="true"></i>
                    <h4>Wiadomości</h4>
                </div>
                <div className="footer">
                    <Link to="" className="link">Zobacz wszystkie</Link>
                </div>
            </div>
        );
    }
}

export default Messages;