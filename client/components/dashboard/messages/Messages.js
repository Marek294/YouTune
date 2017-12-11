import React from 'react';
import { Link } from 'react-router-dom';

import './_Messages.scss';
import '../../../sass/_Card.scss';

const Messages = () => {
    return (
        <div className="sass-DashboardMessages myCard">
            <div className="header">
                <i className="fa fa-envelope-o" aria-hidden="true" />
                <h4>Wiadomości</h4>
            </div>
            <div className="footer">
                <Link to="" className="link">Zobacz wszystkie</Link>
            </div>
        </div>
    );
};

export default Messages;