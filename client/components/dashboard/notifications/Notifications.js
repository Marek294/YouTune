import React from 'react';
import { Link } from 'react-router-dom';

import './_Notifications.scss';
import '../../../sass/_Card.scss';

const Notifications = () => {
    return (
        <div className="sass-Notifications myCard">
            <div className="header">
                <i className="fa fa-bell-o" aria-hidden="true" />
                <h4>Powiadomienia</h4>
            </div>
            <div className="footer">
                <Link to="" className="link">Zobacz wszystkie</Link>
            </div>
        </div>
    );
};

export default Notifications;