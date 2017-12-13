import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './_Links.scss';
import '../../../sass/_Card.scss';

const Links = ({ user }) => {
    return (
        <div className="sass-userLinks myCard">
            <div className="body">
                <Link to={{ pathname: "/lend", state: { user } }} className="link" ><p>Dodaj wypożyczenia</p></Link>
                <Link to={{ pathname: "/userLendingHistory", state: { id: user.id } }} className="link" ><p>Historia wypożyczeń</p></Link>
                <Link to="/Dashboard" className="link" ><p>Wyślij wiadomość</p></Link>
            </div>
        </div>
    );
};

Links.propTypes = {
    user: PropTypes.shape({}).isRequired
}

export default Links;