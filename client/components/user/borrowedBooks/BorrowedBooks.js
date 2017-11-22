import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './_BorrowedBooks.scss';
import '../_DashboardCard.scss';

class BorrowedBooks extends Component {
    render() {
        const { lending } = this.props;

        const displayLending = lending.map((item,i) => {
            return (
                <li className='list-group-item'>{item.id}</li>
            )
        })

        return (
            <div className="sass-BorrowedBooks DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <h4>Wypożyczenia</h4>
                </div>
                <ul className="list-group">
                    {displayLending}
                </ul>
            </div>
        );
    }
}

export default BorrowedBooks;