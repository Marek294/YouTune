/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import { Link } from 'react-router-dom';

require('../../sass/_ConfirmEmailMessage.scss');

const ConfirmEmailMessage = () => 
    <div className="sass-ConfirmEmailMessage card border-primary">
        <div className="card-header text-primary"><h4>Witamy!</h4></div>
        <div className="card-body text-primary">
            <p className="card-text">Konto zostało utworzone.<br/>Na podany adres email została wysłana wiadomość. Aby korzystać
            w pełni z dostępnych funkcjonalności potwierdź swoją tożsamość klikając w link umieszczony w wiadomości email.</p>
            <Link className="btn btn-primary" to="/">Przejdź do strony głównej</Link>
        </div>
    </div>


export default ConfirmEmailMessage;