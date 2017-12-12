import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import Loader from '../loader/Loader'
import BookInfo from './bookInfo/bookInfo'
import Comments from './comments/comments'
import Links from './links/Links'

import { getBook, getVote, getComments, comment, deleteBook } from '../../actions/books'
import { addNotification } from '../../actions/notifications';

import './_ShowBook.scss'

function isCommentTooLong(name,value) {
    if(name === "text" && value.length > 255) return value.slice(0,255);
    
    return value;
}

class showBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: {
                bookId: '',
                text: ''
            },
            loading: true,
            loadingModal: false,
            book: {},
            vote: {},
            comments: {},
            newComment: {},
            error: {},
            hasMore: false,
            modalIsOpen: false,
            modalOption: '',
            deleteItem: {}
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addCommentDiv = this.addCommentDiv.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteBookDiv = this.deleteBookDiv.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const page = 1;

        const p1 = this.props.getBook(id)

        const p2 = this.props.getVote(id)

        const p3 = this.props.getComments(id,page);

        Promise.all([p1, p2, p3]).then(values => {
            const { comments , hasMore } = values[2];
            this.setState({ book: values[0], vote: values[1], comments, hasMore, loading: false})
        });

    }

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isCommentTooLong(e.target.name,e.target.value) }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loadingModal: true
        })

        const { data, book } = this.state;
        data.bookId = book.id;

        this.props.comment(data)
            .then(comment => {
                let newComment = comment;
                newComment.user = this.props.user;

                this.setState({ newComment, loadingModal: false, modalIsOpen: false, data: { ...this.state.data, text: ''} })              
            })
            .catch(err => {
                this.setState({
                    loadingModal: false,
                    modalIsOpen: false
                });

                const message = {
                    title: 'Błąd!',
                    body: 'Wystąpił błąd przy dodawaniu komentarza. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                    type: 'danger',
                    duration: 3000
                }
        
                this.props.addNotification(message)
            })
    }

    openModal(modalOption) {
        this.setState({ modalIsOpen: true, modalOption });
    }

    closeModal() {
        this.setState({ modalIsOpen: false, modalOption: '' });
    }

    addCommentDiv() {
        const { loadingModal, data } = this.state;
        return (
            <div className="ModalCard card add">
                { loadingModal ? <div className="loadPadding"><Loader text="Dodawanie" /></div> :
                <div>
                    <div className="card-header">
                        <i className="fa fa-check-square-o" aria-hidden="true" />
                        <h4>Komentarz</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="Text">Pozostało {255-data.text.length} znaków</label>
                                <textarea className="form-control" id="Text" rows="3" name="text" onChange={this.onChange} value={data.text} />
                            </div>
                            <button type="submit" className="btn addComment">Dodaj</button>
                        </form>
                    </div>
                </div> }
            </div>
        )
    }

    deleteBookDiv() {
        const { loadingModal } = this.state;

        return (
            <div className="ModalCard card add">
                { loadingModal ? <div className="loadPadding"><Loader text="Usuwanie" /></div> :
                <div>
                    <div className="card-header">
                        <i className="fa fa-check-square-o" aria-hidden="true" />
                        <h4>Potwierdzenie</h4>
                    </div>
                    <div className="card-body">
                        <p>Czy jesteś pewien, że chcesz usunąć tą pozycję z systemu?</p>
                        <div className="buttons">
                            <button onClick={this.deleteBook} className="delete">Usuń</button>
                            <button onClick={this.closeModal} className="cancel">Anuluj</button>
                        </div>
                    </div>
                </div> }
            </div> 
        )
    }

    deleteBook() {
        const { id } = this.state.book;

        this.setState({
            loadingModal: true
        });
        
        this.props.deleteBook(id)
            .then(() => {
                const message = {
                    title: 'Sukces!',
                    body: 'Pomyślnie usunięto pozycję z systemu',
                    type: 'success',
                    duration: 3000
                }
        
                this.props.addNotification(message)

                this.props.history.push('/Dashboard')
            })
            .catch(err => {
                this.setState({
                    loadingModal: false,
                    modalIsOpen: false
                });

                const message = {
                    title: 'Błąd!',
                    body: 'Wystąpił błąd przy usuwaniu pozycji z systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                    type: 'danger',
                    duration: 3000
                }
        
                this.props.addNotification(message)            
            })
        
    }

    render() {
        const { book, vote, loading, comments, hasMore, modalOption, newComment } = this.state;
        const { isLibrarian, user } = this.props;

        return (
        <div className="sass-Book container">
            { loading ? <Loader text="Wczytywanie" /> : 
            <div className="book">
                <BookInfo book={book} vote={vote} />
                <div className="commentsAndLinks">
                    <Links book={book} isLibrarian={isLibrarian} addComment={() => this.openModal('addComment')} deleteBook={() => this.openModal('deleteBook')} />
                    <Comments book={book} comments={comments} newComment={newComment} isLibrarian={isLibrarian} hasMore={hasMore} user={user} />
                </div>
            </div> }
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                className="ReactModal"
                overlayClassName="Overlay"
            >
                { modalOption === 'addComment' && this.addCommentDiv() }
                { modalOption === 'deleteBook' && this.deleteBookDiv() }
            </Modal>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLibrarian: state.user.librarian,
        user: state.user
    }
}

export default connect(mapStateToProps, { getBook, getVote, getComments, comment, addNotification, deleteBook })(showBook);