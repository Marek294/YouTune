import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_BorrowedBooks.scss';
import '../_DashboardCard.scss';

class BorrowedBooks extends Component {
    render() {
        return (
            <div className="sass-BorrowedBooks DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <h4>Moje wypożyczenia</h4>
                </div>
                <div className="footer">
                    <Link to="" className="link">Zobacz wszystkie</Link>
                </div>
            </div>
        );
    }
}

export default BorrowedBooks;