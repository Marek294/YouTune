import React from 'react';
import moment from 'moment';

import './_ShowLendingHistory.scss';

const ShowLendingHistory = ({ lendingHistory }) => {
    moment.locale('pl');

    const displayLendingHistory = lendingHistory.map((item, i) => (
        <li className="list-group-item">
            <img src={item.user.avatar} alt="" />
            <div className="text">
                <p>{item.user.firstname} {item.user.lastname}</p>
                <p>Data wypożyczenia: {moment(item.lent).format('LLL')}</p>
                <p>Data oddania: {moment(item.created_at).format('LLL')}</p>
            </div>
        </li>
    ))
    
    return (
        <div className="sass-ShowLendingHistory container">
            <ul className="list-group">
                {displayLendingHistory}
            </ul>
        </div>
    );
};

export default ShowLendingHistory;