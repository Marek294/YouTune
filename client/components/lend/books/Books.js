import React, { Component } from 'react';
import Loader from '../../loader/Loader';
import _ from 'lodash';

import LendForm from './LendForm';

import './_Books.scss';

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            errors: {},
            loading: false
        };

        this.search = this.search.bind(this);
    }

    search(searchData) {
        this.setState({ loading: true });

        this.props.searchBooks(searchData)
            .then(() => this.setState({ loading: false }))
            .catch(() => this.setState({ errors: { globals: 'Błąd wyszukiwania' }, loading: false }));
    }

    displayBook(item, i) {
        return (
            <button onClick={() => this.props.addToSelectedBooks(item)} className="list-group-item" key={i} >
                <img src={item.cover ? item.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                <div className="book-info">
                    <div className="title text-left">
                        <h2>{item.title}</h2>
                    </div>
                    <div className="authors text-left">
                        <p>{item.author}</p>
                    </div>
                </div>
            </button>
        )
    }

    render() {
        const { loading } = this.state
        const { books, start } = this.props;
        
        let displayBooks;
        if(books.length > 0) {
            displayBooks = books.map((item, i) => item.availability && this.displayBook(item,i));
        } else {
            displayBooks = (
                <div className="noBooks text-center">
                    <img src="unhappy.png" alt="" />
                    <h2>Nie znaleziono książek</h2>
                </div> )
        }
        
        if(displayBooks.length > 0 && _.compact(displayBooks).length === 0) {
            displayBooks = (
                <div className="noBooks text-center">
                    <img src="unhappy.png" alt="" />
                    <h2>Brak dostępnych książek</h2>
                </div> )
        }

        return (
            <div className="sass-Books">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true" />
                    <h4>Dodaj książki</h4>
                </div>
                <div className="card-body">
                    <LendForm search={this.search}/>

                    <div className="load">
                        { loading && <Loader text='Wyszukiwanie' /> }
                    </div>
                    { (!loading && !start) && <div className="books">
                            <ul className="list-group">
                                {displayBooks}
                            </ul>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Books;