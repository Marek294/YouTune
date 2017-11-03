import React from 'react';
import { Link } from 'react-router-dom';

import './_Message.scss';

const ForgotPasswordMessage = () => {
    return (
        <div className="sass-Message card border-success">
            <div className="card-header text-success">
                <i className="fa fa-check-circle" aria-hidden="true"></i>
                <h4>Sukces</h4>
            </div>
            <div className="card-body text-success">
                <p className="card-text">Na podany adres email została wysłana wiadomość z dalszą instrukcją do resetowania hasła. To okno można zamknąć.</p>
                <Link className="btn btn-success" to="/">Wróć do strony głównej</Link>
            </div>
        </div>
    );
};

export default ForgotPasswordMessage;