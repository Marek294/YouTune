import React, { Component } from 'react';
import moment from 'moment';

import './_BorrowedBooks.scss';
import '../_DashboardCard.scss';

class BorrowedBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lending: []
        }
    }

    render() {
        const { lending } = this.props;
        moment.locale('pl'); 
        
        const displayLending = lending.map((item,i) => {
            return (
                <li key={i} className='list-group-item'>
                    <img src={item.book.cover ? item.book.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                    <div>
                        <p className="title">{item.book.title}</p>
                        <p className="author">{item.book.author}</p>
                        <div className="date">
                            <p>{moment(item.created_at).format('LLL')}</p>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div className="sass-BorrowedBooks DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true"></i>
                    <h4>Moje wypożyczenia</h4>
                </div>
                <div className="body">
                    <ul className="list-group">
                        {displayLending}
                    </ul>
                </div>
            </div>
        );
    }
}

export default BorrowedBooks;