import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { search } from '../../actions/books';

import SearchForm from './SearchForm';

import './_Catalog.scss';

class Catalog extends Component {
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
        this.props.search(searchData)
            .then(books => this.setState({ books, loading: false }))
            .catch(() => this.setState({ errors: { globals: 'Błąd wyszukiwania' }, loading: false }));
    }

    render() {
        const { books, loading } = this.state

        let displayBooks;
        if(books) {
            displayBooks = books.map((item, i) => {
                let returnItem;
                if(item.cover) {
                    returnItem = (
                        <li key={i} className="list-group-item">
                            <img src={item.cover} alt="" />
                            <div className="book-info">
                                <div className="title">
                                    <h3 className="bold">Tytuł:</h3>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="authors">
                                    <h5 className="bold">Autor: </h5>
                                    <div className="author-list">{item.author}</div>
                                </div>
                            </div>
                        </li>
                    )
                }
                else {
                    returnItem = (
                        <li key={i} className="list-group-item">
                            <img src="http://i.imgur.com/sJ3CT4V.gif" alt="" />
                            <div className="book-info">
                                <div className="title">
                                    <h3 className="bold">Tytuł:</h3>
                                    <h3>{item.title}</h3>
                                </div>
                                <div className="authors">
                                    <h5 className="bold">Autor: </h5>
                                    <div className="author-list">{item.author}</div>
                                </div>
                            </div>
                        </li>
                    )
                }

                return returnItem;
            })
        }

        return (
            <div className="sass-Catalog container-fluid">
                <div className="card search-form">
                    <div className="card-header">
                        <h4>Wyszukiwanie</h4>
                    </div>
                    <div className="card-body">
                        <SearchForm search={this.search}/>
                    </div>
                </div>

                { loading ? <div className="loader" /> :
                    books.length > 0 && <div className="card books">
                    <div className="card-header">
                        <h4>Pozycje</h4>
                    </div>
                    <div className="card-body">
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

export default connect(null, { search })(Catalog);