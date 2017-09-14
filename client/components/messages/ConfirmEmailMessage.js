/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendConfirmationEmail } from '../../actions/auth';
import Notificator from './Notificator';

require('../../sass/_ConfirmEmailMessage.scss');

class ConfirmEmailMessage extends Component {
    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
        this.showNotification = this.showNotification.bind(this);
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    send() {
        this.props.sendConfirmationEmail(this.props.user).then(() => {
           this.showNotification('Sukces!', 'Wiadomość email została wysłana. Sprawdź swoją skrzynkę pocztową', 'success', 3000);
        })
        .catch(err => {
            const errors = err.response.data.errors;
            this.showNotification('Błąd!', errors.global, 'danger', 3000);
        })
    }

    render() {
        return (
            <div className="sass-ConfirmEmailMessage card border-primary">
                <div className="card-header text-primary"><h4>Witamy!</h4></div>
                <div className="card-body text-primary">
                    <p className="card-text">Konto zostało utworzone.<br/>Na podany adres email została wysłana wiadomość. Aby korzystać
                    w pełni z dostępnych funkcjonalności potwierdź swoją tożsamość klikając w link umieszczony w wiadomości email.</p>
                    <button className="btn btn-primary" onClick={this.send}>Wyślij ponownie wiadomość email</button>
                    <Notificator ref="notificator"/>
                </div>
            </div>
        );
    }
}

ConfirmEmailMessage.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    sendConfirmationEmail: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { sendConfirmationEmail })(ConfirmEmailMessage);