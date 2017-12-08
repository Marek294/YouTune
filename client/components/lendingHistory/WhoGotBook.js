import React from 'react';
import moment from 'moment';

import './_WhoGotBook.scss';
import '../../sass/_Card.scss';

const WhoGotBook = ({ lend, loading }) => {
    moment.locale('pl');

    return (
        !loading &&
            <div className="sass-WhoGotBook myCard">
                { lend ?
                    <div className="header">
                        <h4>Wypożyczona przez</h4>
                    </div> :
                    <div className="header">
                        <h4>Dostępna</h4>
                    </div> }
                { lend ?
                    <div className="body">
                        <div className="user">
                            <img src={lend.user.avatar} alt="" />
                            <p>{lend.user.firstname} {lend.user.lastname}</p>
                        </div>
                        <div className="dates">
                            <p>Data wypożyczenia</p>
                            <span>{moment(lend.created_at).format('LLL')}</span>
                        </div>
                    </div> :
                    <div className="body">
                        <div className="noUser">
                            <p>Książka jest aktualnie dostępna w bibliotece</p>
                        </div>
                    </div> }
            </div>
    );
};

export default WhoGotBook;