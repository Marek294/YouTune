import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import Spinner from '../../loader/Spinner';
import Notificator from '../../messages//Notificator';
import { returnBook } from '../../../actions/lending';

import './_BorrowedBooks.scss';
import '../_DashboardCard.scss';

class BorrowedBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lending: [],
            lendLoading: [],
            errors: {}
        }

        this.acceptLend = this.acceptLend.bind(this);
    }

    componentWillMount() {
        const { lending } = this.props;

        this.setState({
            lending
        })
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
    }

    acceptLend(id) {
        const { lendLoading } = this.state;
        let { lending } = this.state;

        lendLoading[id] = true;

        this.setState({
            lendLoading
        })

        
        this.props.returnBook(id)
            .then(lendHistory => {
                lending = _.filter(lending, function(o) { return o.id !== id })
                
                this.setState({
                    lending
                });

                this.props.addLendHistory(lendHistory);
                this.showNotification('Sukces!', 'Oddano pozycję do biblioteki', 'success', 3000);
            })
            .catch(err => {
                this.showNotification('Błąd!', 'Wystąpił błąd przy oddawaniu pozycji do biblioteki. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
                lendLoading[id] = false;
                
                this.setState({
                    lendLoading
                })
            })
    }

    render() {
        const { lending } = this.state;
        const { lendLoading } = this.state;
        moment.locale('pl'); 
        
        const displayLending = lending.map((item,i) => {
            return (
                <li key={i} className='list-group-item'>
                    <img src={item.book.cover ? item.book.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                    <div className="description">
                        <div className="titleDiv">
                            <p className="title">{item.book.title}</p>
                            <p className="author">{item.book.author}</p>
                        </div>
                        <div className="date">
                            <div className="acceptDiv">
                                { lendLoading[item.id] ? <Spinner /> : <button onClick={() => this.acceptLend(item.id)} className="btn" ><i className="fa fa-check-square-o" aria-hidden="true" /></button> }
                            </div>
                            <p>{moment(item.created_at).format('LLL')}</p>
                        </div>
                    </div>
                </li>
            )
        })

        return (
            <div className="sass-UserBorrowedBooks DashboardCard">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true" />
                    <h4>Wypożyczenia</h4>
                </div>
                <div className="body">
                    <ul className="list-group">
                        {displayLending}
                    </ul>
                </div>
                <Notificator ref="notificator"/>
            </div>
        );
    }
}

BorrowedBooks.propTypes = {
    lending: PropTypes.array.isRequired,
    addLendHistory: PropTypes.func.isRequired
}

export default connect(null, { returnBook })(BorrowedBooks);