/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { sendConfirmationEmail } from '../../actions/auth';
import { addNotification } from '../../actions/notifications';

import './_Message.scss';

class ConfirmEmailMessage extends Component {
    constructor(props) {
        super(props);

        this.send = this.send.bind(this);
    }

    send() {
        this.props.sendConfirmationEmail(this.props.user).then(() => {
            const message = {
                title: 'Sukces!',
                body: 'Wiadomość email została wysłana. Sprawdź swoją skrzynkę pocztową',
                type: 'success',
                duration: 3000
            }
    
            this.props.addNotification(message)  
        })
        .catch(err => {
            const errors = err.response.data.errors;

            const message = {
                title: 'Błąd!',
                body: errors.global,
                type: 'danger',
                duration: 3000
            }
    
            this.props.addNotification(message)    
        })
    }

    render() {
        return (
            <div className="sass-Message card border-primary">
                <div className="card-header text-primary"><h4>Witamy!</h4></div>
                <div className="card-body text-primary">
                    <p className="card-text">Konto zostało utworzone.<br/>Aby korzystać z dostępnych funkcjonalności potwierdź 
                    swoją tożsamość klikając w link umieszczony w wiadomości email, który został do ciebie wysłany.</p>
                    <button className="btn btn-primary" onClick={this.send}>Wyślij ponownie wiadomość email</button>
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

export default connect(mapStateToProps, { sendConfirmationEmail, addNotification })(ConfirmEmailMessage);