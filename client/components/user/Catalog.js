import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';

import '../../sass/_Catalog.scss';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advanced: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            advanced: !this.state.advanced
        });
    }

    render() {
        const { advanced } = this.state
        const { books, isFetching } = this.props;

        let displayBooks;
        if(books) {
            displayBooks = books.map((item, i) => {
                let returnItem;
                let authors;
                if(item.volumeInfo.authors){
                    authors = item.volumeInfo.authors.map((author,i) => {
                        return (
                            <li className="author-item">{author}</li>
                        )
                    })
                }
                if(item.volumeInfo.imageLinks) {
                    returnItem = (
                        <li key={i} className="list-group-item">
                            <img src={item.volumeInfo.imageLinks.thumbnail} alt="" />
                            <div className="book-info">
                                <div className="title">
                                    <h3 className="bold">Tytuł:</h3>
                                    <h3>{item.volumeInfo.title}</h3>
                                </div>
                                <div className="authors">
                                    <h5 className="bold">Autor: </h5>
                                    <div className="author-list">{authors}</div>
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
                                    <h3>{item.volumeInfo.title}</h3>
                                </div>
                                <div className="authors">
                                    <h5 className="bold">Autor: </h5>
                                    <div className="author-list">{authors}</div>
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
                <div className={classNames("card","search-form",advanced && 'extended')}>
                    <div className="card-header">
                        <h4>Wyszukiwanie</h4>
                    </div>
                    <div className="card-body">
                        <SearchForm toggle={this.toggle}/>
                    </div>
                </div>

                { isFetching ? <div className="loader" /> : <div className="card books">
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

Catalog.propTypes = {
    books: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        books: state.books,
        isFetching: state.fetch.isFetching
    }
}

export default connect(mapStateToProps)(Catalog);