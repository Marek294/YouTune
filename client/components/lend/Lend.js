import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import _ from 'lodash';
import Books from './books/Books';
import SelectedLend from './selectedLend/SelectedLend';

import { search } from '../../actions/books';
import { addLend } from '../../actions/lending';
import { addNotification } from '../../actions/notifications';

import './_Lend.scss';
import './_DashboardCard.scss';

class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            selectedBooks: [],
            books: [],
            start: true,
            borrowed: false
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
        this.setState({ start: false });

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

        return this.props.addLend(data)
            .then(() => {
                this.setState({
                    selectedBooks: [],
                    books: [],
                    start: true,
                    borrowed: true
                })

                const message = {
                    title: 'Sukces!',
                    body: 'Dodano wypożyczenia',
                    type: 'success',
                    duration: 3000
                }
        
                this.props.addNotification(message)
            })
            .catch(err => {
                this.setState({
                    selectedBooks: [],
                    books: [],
                    start: true
                })

                const message = {
                    title: 'Błąd!',
                    body: 'Wystąpił błąd przy dodawaniu wypożyczeń. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                    type: 'danger',
                    duration: 3000
                }
        
                this.props.addNotification(message)   
            })
    }

    render() {
        const { books, user, selectedBooks, start, borrowed } = this.state;

        let dispBooks = books.slice();

        selectedBooks.map(item => {
            _.remove(dispBooks, function(o) { return o.id === item.id; })
        })

        return (
        <div className='sass-lend container'>
            { borrowed && <Redirect to={{ pathname: "/user", state: { id: user.id } }} /> }
            <div className="left">
                <div className="user">
                    <img src={user.avatar} alt="" />
                    <Link to={{ pathname: "/user", state: { id: user.id } }} className="userLink text-center">
                        {user.firstname} {user.lastname}
                    </Link>
                </div>
                <div className="DashboardCard">
                    <Books addToSelectedBooks={this.addToSelectedBooks} searchBooks={this.searchBooks} books={dispBooks} start={start} />
                </div>
            </div>

            <div className="right">
                <div className="DashboardCard" >
                    <SelectedLend removeFromSelectedBooks={this.removeFromSelectedBooks} lendBooks={this.lendBooks} selectedBooks={selectedBooks} />
                </div>
            </div>
        </div>
        )
    }
}


export default connect(null, { search, addLend, addNotification })(Lend);
