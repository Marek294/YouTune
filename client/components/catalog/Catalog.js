import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Notificator from '../messages//Notificator';
import { search } from '../../actions/books';

import SearchForm from './SearchForm';

import './_Catalog.scss';


function cutSummary(sum) {
    if(sum.length > 300) return sum.slice(0,300)+"...";
    else return sum;
}

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            errors: {},
            loading: false,
            start: true,
            deleteLoading: false,
            modalIsOpen: false,
            deleteBookId: -1,
        };

        this.search = this.search.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    search(searchData) {
        this.setState({ loading: true, start: false });
        this.props.search(searchData)
            .then(books => this.setState({ books, loading: false }))
            .catch(() => this.setState({ errors: { globals: 'Błąd wyszukiwania' }, loading: false }));
    }

    openModal(id) {
        this.setState({modalIsOpen: true, deleteBookId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, deleteBookId: -1});
    }

    deleteBook() {
        const id = this.state.deleteBookId;

        const findBookIndex = _.findIndex(this.state.books, { 'id': id });
        const booksArray = this.state.books;

        this.setState({
            deleteLoading: true
        })

        setTimeout(() => {
            booksArray.splice(findBookIndex, 1);
            
            this.setState({
                books: booksArray,
                deleteLoading: false
            })

            this.closeModal();
        }, 2000);

        // this.props.deleteBook(id)
        //     .then(() => {
        //         booksArray.splice(findBookIndex, 1);

        //         this.setState({
        //             books: booksArray,
        //             deleteLoading: false
        //         })
                
        //         this.closeModal();
                
        //         this.showNotification('Sukces!', 'Pozycja została pomyślnie usunięta z systemu', 'success', 3000);
        //     })
        //     .catch(err => {
        //         this.showNotification('Błąd!', 'Coś poszło nie tak', 'danger', 3000);
        //     })
    }

    displayBook(item, i) {
        return (
            <li key={i} className="list-group-item">
            <div className="info">
                <img src={item.cover ? item.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                <div className="book-info">
                    <div>
                        <div className="authors">
                            <div className="author-list">{item.author}</div>
                        </div>
                        <div className="title">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                    <div className="summary">
                        <p>{cutSummary(item.summary)}</p>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button className="delete" onClick={() => this.openModal(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                <button className="profile"><i className="fa fa-address-book-o" aria-hidden="true"></i></button>
            </div>
        </li>
        )
    }

    render() {
        const { books, loading, start } = this.state

        let displayBooks;
        if(books.length > 0) {
            displayBooks = books.map((item, i) => this.displayBook(item,i));
        } else {
            displayBooks = (
                <div className="text-center">
                    <h2>Brak pozycji</h2>
                </div> )
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
                    !start && <div className="card books">
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
                <Notificator ref="notificator"/>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="ReactModal"
                    overlayClassName="Overlay"
                >

                { this.state.deleteLoading ? 
                    <div className="waitingDiv">
                            <div className="loader red"></div>
                            <p>Czekaj trwa wprowadzanie zmian...</p>
                    </div> :
                    <div className="ModalCard">
                        <div className="card-header bg-lightdanger">
                            <p>Potwierdzenie usunięcia</p>
                        </div>
                        <div className="card-body">
                            <p>Czy jesteś pewien, że chcesz usunąć tą pozycję z systemu?</p>
                            <div className="buttons">
                                <button className="cancel" onClick={this.closeModal}>Anuluj</button>
                                <button className="delete" onClick={this.deleteBook}>Tak</button>
                            </div>
                        </div>
                    </div> }
                </Modal> 
            </div>
        );
    }
}

export default connect(null, { search })(Catalog);