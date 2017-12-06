import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Modal from 'react-modal'
import Loader from '../loader/Loader'

import { setVote, deleteBook } from '../../actions/books'
import { addNotification } from '../../actions/notifications';

import './_BookInfo.scss';

function cutSummary(sum) {
    if(sum.length > 300) return sum.slice(0,300)+"...";
    return sum;
}

class BookInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vote: {},
            book: {},
            showSummary: false,
            modalIsOpen: false,
            loading: false
        }

        this.voteClick = this.voteClick.bind(this);
        this.toggleSummary = this.toggleSummary.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    componentWillMount() {
        const { book, vote } = this.props;
        
        Modal.setAppElement('body');

        this.setState({
            book,
            vote
        })
    }

    toggleSummary() {
        this.setState({
            showSummary: !this.state.showSummary
        });
    }

    voteClick(isPositive) {
        const data = {
            bookId: this.state.book.id,
            isPositive
        }

        this.props.setVote(data)
            .then(newVote => {
                let total = this.state.book.votes;
                const oldVote = this.state.vote;

                if(newVote) {
                    if(oldVote && newVote.isPositive) total += 2;
                    if(oldVote && !newVote.isPositive) total -= 2;
                    if(!oldVote && newVote.isPositive) total += 1;
                    if(!oldVote && !newVote.isPositive) total -= 1;
                } else oldVote.isPositive ? total -= 1 : total += 1;
                
                this.setState({ 
                    vote: newVote, 
                    book: {
                        ...this.state.book,
                        votes: total
                    } });
            });
    }

    openModal() {
        this.setState({modalIsOpen: true });
    }

    closeModal() {
        this.setState({modalIsOpen: false });
    }

    deleteDiv() {
        const { loading } = this.state;

        return (
            <div className="ModalCard card add">
                { loading ? <div className="loadPadding"><Loader text="Usuwanie" /></div> :
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
        const { id } = this.props.book;

        this.setState({
            loading: true
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
                    loading: false,
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
        const { isLibrarian } = this.props;
        const { book, vote, showSummary } = this.state;

        let color = '';
        if(book.votes > 0) color = 'green';
        if(book.votes < 0) color = 'red';
        if(book.votes === 0) color = 'grey';

        let voteButton;
        if(vote) {
            if(vote.isPositive) voteButton = "like"
            else voteButton = "dislike"
        }
        else voteButton = "none";

        return (
            <div className="scss-bookInfo" >
                <div className="cover">
                    <img src={book.cover ? book.cover : "http://i.imgur.com/sJ3CT4V.gif"} alt="" />
                </div>
                <div className="info" >
                    <div className="header">
                        <div>
                            <i className="fa fa-info-circle" aria-hidden="true" />
                            <h4>Informacje</h4>
                        </div>
                        { isLibrarian && <div className="buttons">
                            <Link to={{ pathname: "/bookLendingHistory", state: { id: book.id } }} className="blue"><i className="fa fa-share-square-o" aria-hidden="true" /></Link>
                            <Link to={{ pathname: "/updateBook", state: { id: book.id } }} className="green"><i className="fa fa-pencil-square-o" aria-hidden="true" /></Link>
                            <button onClick={() => this.openModal('destroying')} className="red"><i className="fa fa-trash" aria-hidden="true" /></button>
                        </div> }
                    </div>
                    <div className="body">
                        <div className="title">
                            <div>
                                <h2>{book.title}</h2>
                                <h3>{book.author}</h3>
                            </div>
                            <div className="votes">
                                <div className={classnames("vote", color)}>
                                    <p>{book.votes > 0 ? '+'.concat(book.votes) : book.votes}</p>
                                </div>
                                <p>{ book.availability ? 'Dostępna' : 'Wypożyczona' }</p>
                            </div>
                        </div>
                            
                        <div className="summary">
                            { showSummary ? <p>{book.summary}</p> :<p>{cutSummary(book.summary)}</p> }
                            { book.summary.length > 300 && 
                            <button onClick={this.toggleSummary} className="show">
                                    { showSummary ? <div><p>Pokaż mniej</p><i className="fa fa-caret-up" aria-hidden="true" /></div>
                                        : <div><p>Pokaż więcej</p><i className="fa fa-caret-down" aria-hidden="true" /></div> }
                            </button> }
                        </div>

                        <div className="likes">
                            <button onClick={() => this.voteClick(1)} className={classnames(voteButton === 'like' ? 'liked' : "like")}><i className="fa fa-thumbs-o-up" aria-hidden="true" /></button>
                            <button onClick={() => this.voteClick(0)} className={classnames(voteButton === 'dislike' ? 'disliked' : "dislike")}><i className="fa fa-thumbs-o-down" aria-hidden="true" /></button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="ReactModal"
                    overlayClassName="Overlay"
                >
                    {this.deleteDiv()}
                </Modal>
            </div>
        )
    }
}

BookInfo.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired
    }).isRequired,
    isLibrarian: PropTypes.bool.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    addNotification: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
}

export default connect(null, { setVote, deleteBook, addNotification })(BookInfo);