import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import { search } from '../../actions/books';

import SearchForm from './SearchForm';

import './_Catalog.scss';

class Catalog extends Component {
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
        item.isAvailable = true;
        if(i === 2) item.isAvailable = false;

        let color = '';
        if(item.votes > 0) color = 'green';
        if(item.votes < 0) color = 'red';
        if(item.votes === 0) color = 'grey';

        return (
            <Link to={{ pathname: "/book", state: { id: item.id } }} key={i} className={classnames("book", !item.isAvailable && 'notAvailable')}>
                <div className="info">
                    <img src={item.cover ? item.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                    <div className={classnames("vote", color)}>
                        <p>{item.votes > 0 ? '+'.concat(item.votes) : item.votes}</p>
                    </div>
                    <div className="book-info">
                        <div className="title">
                            <h2>{item.title}</h2>
                        </div>
                        <div className="authors">
                            <p>{item.author}</p>
                        </div>
                        <div className="availability">
                            <p>{item.isAvailable ? 'Dostępna' : 'Niedostępna'}</p>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    render() {
        const { books, loading, start } = this.state

        let displayBooks;
        if(books.length > 0) {
            displayBooks = books.map((item, i) => this.displayBook(item,i));
        } else {
            displayBooks = (
                <div className="noBooks text-center">
                    <img src="unhappy.png" alt="" />
                    <h2>Nie znaleziono książek</h2>
                </div> )
        }

        return (
            <div className="sass-Catalog container">
                <div className="card">
                    <SearchForm search={this.search}/>
                </div>

                <div className="card load">
                    { loading && <Loader text='Wyszukiwanie' /> }
                </div>
                { (!loading && !start) && <div className="books">
                    <div className="header">
                        <i className="fa fa-book" aria-hidden="true" />
                        <h4>Wyniki wyszukiwania</h4>
                    </div>
                    <div className="body">
                        {displayBooks}
                    </div>
                </div>
                }
            </div>
        );
    }
}

Catalog.propTypes = {
    search: PropTypes.func.isRequired
}

export default connect(null, { search })(Catalog);