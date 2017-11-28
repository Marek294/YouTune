import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from '../../loader/Loader';
import { search } from '../../../actions/books';

import LendForm from './LendForm';

import './_Books.scss';

class Books extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            errors: {},
            loading: false,
            start: true
        };

        this.search = this.search.bind(this);
    }

    search(searchData) {
        this.setState({ loading: true, start: false });
        this.props.search(searchData)
            .then(books => this.setState({ books, loading: false }))
            .catch(() => this.setState({ errors: { globals: 'Błąd wyszukiwania' }, loading: false }));
    }

    displayBook(item, i) {
        return (
            <li className="list-group-item" key={i} >
                <img src={item.cover ? item.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                <div className="book-info">
                    <div className="title">
                        <h2>{item.title}</h2>
                    </div>
                    <div className="authors">
                        <p>{item.author}</p>
                    </div>
                </div>
            </li>
        )
    }

    render() {
        const { books, loading, start } = this.state

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

        return (
            <div className="sass-Books container">
                <LendForm search={this.search}/>

                <div className="load">
                    { loading && <Loader text='Wyszukiwanie' /> }
                </div>
                { (!loading && !start) && <div className="books">
                    <div className="body">
                        <ul className="list-group">
                            {displayBooks}
                        </ul>
                    </div>
                </div>
                }
            </div>
        );
    }
}

Books.propTypes = {
    search: PropTypes.func.isRequired
}

export default connect(null, { search })(Books);