import React, { Component } from 'react';
import moment from 'moment';

import './_Greetings.scss';
import '../../../sass/_Card.scss';

class Greetings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstname: '',
                lastname: '',
                created_at: ''
            }
        }
    }

    render() {
        const { user } = this.props;
        const date = new Date(user.created_at);
        moment.locale('pl');

        return (
            <div style={{backgroundColor: '#0375b0'}} className="myCard sass-Greetings">
                <div className="body">
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
        );
    }
}

export default Greetings;