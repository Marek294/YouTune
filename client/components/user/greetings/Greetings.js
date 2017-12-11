import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './_Greetings.scss';

const Greetings = ({ user }) => {
    const date = new Date(user.created_at);
    moment.locale('pl');

    return (
        <div className="sass-UserGreetings">
            <div className="card">
                <div className="card-body">
                    <img src={user.avatar} alt="" />
                    <h3 className="text-center">{user.firstname} {user.lastname}</h3>
                    <div className="text">
                        <p>Dołączył/a:</p>
                        <p className="text-rigth">{moment(date).format('LLL')}</p>
                    </div>
                    <div className="text">
                        <p>Łączna liczba wypożyczeń:</p>
                        <p className="text-rigth">14</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Greetings.propTypes = {
    user: PropTypes.shape({}).isRequired
}

export default Greetings;