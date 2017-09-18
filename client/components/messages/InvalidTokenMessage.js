import React from 'react';
import { Link } from 'react-router-dom';

const InvalidTokenMessage = () => {
    return (
        <div className="sass-ForgotPasswordMessage card border-danger">
            <div className="card-header text-danger"><h4>Błąd!</h4></div>
            <div className="card-body text-danger">
                <p className="card-text">Link jest nieważny.<br/>Spróbuj jeszcze raz wypełnić procedurę 'Resetowanie hasła'</p>
                <Link className="btn btn-danger" to="/">Wróć do strony głównej</Link>
            </div>
        </div>
    );
};

export default InvalidTokenMessage;