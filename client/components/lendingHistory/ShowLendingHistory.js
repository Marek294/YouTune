import React from 'react';
import moment from 'moment';

import './_ShowLendingHistory.scss';
import '../../sass/_Card.scss';

const ShowLendingHistory = ({ lendingHistory }) => {
    moment.locale('pl');

    const displayLendingHistory = lendingHistory.map((item, i) => (
        <li className="list-group-item">           
            <div className="user">
                <img src={item.user.avatar} alt="" />
                <p>{item.user.firstname} {item.user.lastname}</p>
            </div>
            <div className="dates">
                <p>Data wypożyczenia: {moment(item.lent).format('LLL')}</p>
                <p>Data oddania: {moment(item.created_at).format('LLL')}</p>
            </div>
        </li>
    ))
    
    return (
        <div className="sass-ShowLendingHistory myCard">
            <div className="header">
                <i className="fa fa-share-square-o" aria-hidden="true" />
                <h4>Historia wypożyczeń</h4>
            </div>
            <div className="body">
                <ul className="list-group">
                    {displayLendingHistory}
                </ul>
            </div>
        </div>
    );
};

export default ShowLendingHistory;