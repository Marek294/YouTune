import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash';
import Books from './books/Books';
import SelectedLend from './selectedLend/SelectedLend';
import Notificator from '../messages//Notificator';
import { search } from '../../actions/books';
import { addLend } from '../../actions/lending';

import './_Lend.scss';
import './_DashboardCard.scss';

class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            selectedBooks: [],
            books: []
        }

        this.addToSelectedBooks = this.addToSelectedBooks.bind(this);
        this.removeFromSelectedBooks = this.removeFromSelectedBooks.bind(this);
        this.searchBooks = this.searchBooks.bind(this);
        this.lendBooks = this.lendBooks.bind(this);
    }

    componentWillMount() {
        const { user } = this.props.location.state;

        this.setState({ user });
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    addToSelectedBooks(book) {
        const { selectedBooks } = this.state;

        selectedBooks.push(book);

        this.setState({ selectedBooks });
    }

    removeFromSelectedBooks(book) {
        const { selectedBooks } = this.state;

        _.remove(selectedBooks, function(o) { return o.id === book.id })

        this.setState({ selectedBooks });
    }

    searchBooks(searchData) {
        return this.props.search(searchData)
            .then(books => this.setState({ books }))
    }

    lendBooks() {
        const { selectedBooks, user } = this.state;

        const bookIds = selectedBooks.map(item => {
            return item.id
        })

        const data = {
            userId: user.id,
            bookIds
        }

        this.props.addLend(data)
            .then(() => {
                this.setState({
                    selectedBooks: [],
                    books: []
                })
                this.showNotification('Sukces!', 'Dodano wypożyczenia', 'success', 3000);
            })
            .catch(err => {
                this.setState({
                    selectedBooks: [],
                    books: []
                })
                this.showNotification('Błąd!', 'Wystąpił błąd przy dodawaniu wypożyczeń. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
    }

    render() {
        const { books, user, selectedBooks } = this.state;

        let dispBooks = books.slice();

        selectedBooks.map(item => {
            _.remove(dispBooks, function(o) { return o.id === item.id; })
        })

        return (
        <div className='sass-lend container'>
            <div className="left">
                <div className="user">
                    <img src={user.avatar} alt="" />
                    <h3 className="text-center">{user.firstname} {user.lastname}</h3>
                </div>
                <div className="DashboardCard">
                    <Books addToSelectedBooks={this.addToSelectedBooks} searchBooks={this.searchBooks} books={dispBooks} />
                </div>
            </div>

            <div className="right">
                <div className="DashboardCard" >
                    <SelectedLend removeFromSelectedBooks={this.removeFromSelectedBooks} lendBooks={this.lendBooks} selectedBooks={selectedBooks} />
                </div>
            </div>
            <Notificator ref="notificator"/>
        </div>
        )
    }
}


export default connect(null, { search, addLend })(Lend);
