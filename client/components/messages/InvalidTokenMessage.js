import React from 'react';
import { Link } from 'react-router-dom';

import './_Message.scss';

const InvalidTokenMessage = () => {
    return (
        <div className="sass-Message card border-danger">
            <div className="card-header text-danger">
                <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
                <h4>Błąd!</h4>
            </div>
            <div className="card-body text-danger">
                <p className="card-text">Link jest nieważny.<br/>Spróbuj jeszcze raz wypełnić procedurę 'Resetowanie hasła'</p>
                <Link className="btn btn-danger" to="/">Wróć do strony głównej</Link>
            </div>
        </div>
    );
};

export default InvalidTokenMessage;