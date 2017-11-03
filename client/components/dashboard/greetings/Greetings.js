import React, { Component } from 'react';

import './_Greetings.scss';

function transformDate(date) {
    let month = '';

    switch(date.getMonth()) {
        case 0: {
            month = 'styczeń';
            break;
        }
        case 1: {
            month = 'luty';
            break;
        }
        case 2: {
            month = 'marzec';
            break;
        }
        case 3: {
            month = 'kwiecień';
            break;
        }
        case 4: {
            month = 'maj';
            break;
        }
        case 5: {
            month = 'czerwiec';
            break;
        }
        case 6: {
            month = 'lipiec';
            break;
        }
        case 7: {
            month = 'sierpień';
            break;
        }
        case 8: {
            month = 'wrzesień';
            break;
        }
        case 9: {
            month = 'październik';
            break;
        }
        case 10: {
            month = 'listopad';
            break;
        }
        case 11: {
            month = 'grudzień';
            break;
        }
        default: {
            month= '';
        }
    }

    let hours = date.getHours();
    if(hours < 10) {
        hours = '0'+hours;
    }

    let minutes = date.getMinutes();
    if(minutes < 10) {
        minutes = '0'+minutes;
    }

    const stringDate = date.getDate() + ' ' + month + ' ' + date.getFullYear() + ' ' + hours + ':' + minutes;
    return stringDate;
}

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

        return (
            <div className="sass-Greetings">
                <div className="card">
                    <div className="card-body">
                        <img src={user.avatar} alt="" />
                        <h3 className="text-center">{user.firstname} {user.lastname}</h3>
                        <div className="text">
                            <p>Dołączył/a:</p>
                            <p className="text-rigth">{transformDate(date)}</p>
                        </div>
                        <div className="text">
                            <p>Łączna liczba wypożyczeń:</p>
                            <p className="text-rigth">14</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Greetings;