import React, { Component } from 'react';
import { connect } from 'react-redux';

require('../../sass/_Greetings.scss');

class Greetings extends Component {
    render() {
        const { user } = this.props;
        const date = new Date(user.created_at);

        return (
            <div className="sass-Greetings">
                <div className="card">
                    <div className="card-body">
                        <h1>Witaj czytelniku</h1>
                        <p className="grey">{user.firstname} {user.lastname}</p>
                        <p className="grey">Dołączył/a: {transformDate(date)}</p>
                    </div>
                </div>
            </div>
        );
    }
}

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

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Greetings);