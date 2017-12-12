import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './_Links.scss';
import '../../../sass/_Card.scss';

const Links = ({ isLibrarian, addComment, deleteBook, book }) => {
    return (
        <div className="sass-bookLinks myCard">
            <div className="body">
                <a onClick={addComment} className="link" ><p>Dodaj komentarz</p></a>
                { isLibrarian && 
                    <div>
                        <Link to={{ pathname: "/bookLendingHistory", state: { id: book.id } }} className="link" ><p>Historia wypożyczeń</p></Link>
                        <Link to={{ pathname: "/updateBook", state: { id: book.id } }} className="link" ><p>Edytuj książkę</p></Link>
                        <a onClick={deleteBook} className="link" ><p className="red">Usuń książkę</p></a>
                    </div>
                }
            </div>
        </div>
    );
};

Links.propTypes = {
    isLibrarian: PropTypes.bool.isRequired
}

export default Links;