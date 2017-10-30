import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import Validator from 'validator';
import Dropzone from 'react-dropzone';
import Notificator from '../messages//Notificator';
import InlineError from '../messages/InlineError';
import { search, deleteBook, updateBook } from '../../actions/books';

import SearchForm from './SearchForm';

import './_Catalog.scss';

function cutSummary(sum) {
    if(sum.length > 300) return sum.slice(0,300)+"...";
    return sum;
}

function isSummaryTooLong(name,value) {
    if(name === "summary" && value.length > 2000) return value.slice(0,2000);
    return value;
}

function clearData(data) {
    return Object.keys(data).map(objectKey => {
        data[objectKey] = '';
        return data[objectKey];
    });
}

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            books: [],
            errors: {},
            loading: false,
            start: true,
            modalLoading: false,
            modalIsOpen: false,
            bookId: -1,
            action: '',
            data: {
                id: '',
                title: '',
                author: '',
                cover: '',
                summary: ''
            },
        };

        this.search = this.search.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
        this.updateDiv = this.updateDiv.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateBook = this.updateBook.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate(data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.setState({
                modalLoading: true
            })

            const sendData = new FormData();
            
            Object.keys(data).map(objectKey => {
                const value = data[objectKey];
                return sendData.append(objectKey, value)
            });
                
            this.updateBook(sendData);
        }
    }

    onImageDrop(files) {
        this.setState({
            data: {
                ...this.state.data,
                cover: files[0]
            }
          });
    }

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isSummaryTooLong(e.target.name,e.target.value) }
        });
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

    openModal(id, action) {
        this.setState({modalIsOpen: true, bookId: id, action});
    }

    closeModal() {
        this.setState({modalIsOpen: false, bookId: -1, action: '', modalLoading: false, data: clearData(this.state.data)});
    }

    deleteBook() {
        const id = this.state.bookId;

        const findBookIndex = _.findIndex(this.state.books, { 'id': id });
        const booksArray = this.state.books;

        this.setState({
            modalLoading: true
        })

        // setTimeout(() => {
        //     booksArray.splice(findBookIndex, 1);
            
        //     this.setState({
        //         books: booksArray,
        //         modalLoading: false
        //     })

        //     this.closeModal();
        // }, 2000);

        this.props.deleteBook(id)
            .then(() => {
                booksArray.splice(findBookIndex, 1);

                this.setState({
                    books: booksArray,
                    modalLoading: false
                })
                
                this.closeModal();
                
                this.showNotification('Sukces!', 'Pozycja została pomyślnie usunięta z systemu', 'success', 3000);
            })
            .catch(err => {
                this.showNotification('Błąd!', 'Coś poszło nie tak', 'danger', 3000);
            })
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
                <button className="delete" onClick={() => this.openModal(item.id, 'delete')}><i className="fa fa-trash" aria-hidden="true"></i></button>
                <button className="profile" onClick={() => this.openModal(item.id, 'update')}><i className="fa fa-address-book-o" aria-hidden="true"></i></button>
            </div>
        </li>
        )
    }

    deleteDiv() {
        const { modalLoading } = this.state;

        if( modalLoading ) {
            return (
                <div className="waitingDiv">
                    <div className="loader"></div>
                    <p>Czekaj trwa wprowadzanie zmian...</p>
                </div>
            )
        }

        return (
            <div className="ModalCard delete">
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
            </div>
        )
    }

    updateDiv() {
        const { modalLoading, books, bookId, errors, data } = this.state;
        
        const findBookIndex = _.findIndex(books, { 'id': bookId });
        const book = books[findBookIndex];

        if( !data.id ) {
            data.id = bookId;
            data.title = book.title;
            data.author = book.author;
            data.summary = book.summary;
            data.cover = book.cover;
        }

        if( modalLoading ) {
            return (
                <div className="waitingDiv">
                    <div className="loader"></div>
                    <p>Czekaj trwa wprowadzanie zmian...</p>
                </div>
            )
        }

        return (
            <div className="ModalCard update">
                <div className="card-header bg-lightprimary">
                    <p>Dane pozycji</p>
                </div>
                <div className="card-body">
                    <div>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="formData">
                                <div className="form-group">
                                    <label htmlFor="Title">Tytuł</label>
                                    <input type="name" className="form-control" id="Title" placeholder="Tytuł" name="title" onChange={this.onChange} value={data.title} autoComplete="false"/>
                                    {errors.title && <InlineError text={errors.title} />}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Author">Autor</label>
                                    <input type="name" spellCheck="false" className="form-control" id="Author" placeholder="Autor" name="author" onChange={this.onChange} value={data.author}/>
                                    {errors.author && <InlineError text={errors.author} />}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Summary">Strzeszczenie (pozostało {2000-data.summary.length} znaków)</label>
                                    <textarea className="form-control" id="Summary" rows="3" name="summary" placeholder="Streszczenie" onChange={this.onChange} value={data.summary} />
                                </div>
                                <div className="buttons">
                                    <button className="cancel" onClick={this.closeModal}>Anuluj</button>
                                    <button type="submit" className="update" >Aktualizuj</button>
                                </div>
                            </div>
                            <Dropzone
                                multiple={false}
                                accept="image/*"
                                onDrop={this.onImageDrop}
                                className="dropZone text-center">
                                    { (data.cover && data.cover.preview) && <img src={data.cover.preview} alt="" /> }
                                    { (data.cover && !data.cover.preview) && <img src={data.cover} alt="" /> }
                                    { !data.cover &&
                                        <div className="noUploadedFile">
                                            <h4>Brak okładki</h4>
                                            <p>Przeciągnij i upuść tutaj zdjęcie okładki bądź kliknij i wybierz zdjęcie</p>
                                        </div> }
                            </Dropzone>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    updateBook(data) {
        const id = this.state.bookId;

        const findBookIndex = _.findIndex(this.state.books, { 'id': id });
        const booksArray = this.state.books;

        this.props.updateBook(data)
            .then(book =>{
                booksArray.splice(findBookIndex, 1, book);

                this.setState({
                    books: booksArray,
                    modalLoading: false
                })

                this.closeModal();
                this.showNotification('Sukces!', 'Zaktualizowano pozycję w systemie', 'success', 3000);
            })
            .catch(err => {
                this.closeModal();
                this.showNotification('Błąd!', 'Wystąpił błąd przy aktualizacji pozycji w systemie. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
    }

    validate(data) {
        const errors = {};

        if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
        if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

        return errors;
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
                    {this.state.action === 'delete' && this.deleteDiv()}
                    {this.state.action === 'update' && this.updateDiv()}
                </Modal> 
            </div>
        );
    }
}

export default connect(null, { search, deleteBook, updateBook })(Catalog);