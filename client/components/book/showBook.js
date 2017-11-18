import React, { Component } from 'react';
import {
    Redirect,
    Link
  } from 'react-router-dom'
import { connect } from 'react-redux';
import classnames from 'classnames';
import Modal from 'react-modal';
import Loader from '../loader/Loader';
import Notificator from '../messages//Notificator';
import { getBook, deleteBook, getVote, vote } from '../../actions/books';

import './_ShowBook.scss';

function cutSummary(sum) {
    if(sum.length > 300) return sum.slice(0,300)+"...";
    return sum;
}

class showBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            book: {},
            vote: {},
            error: {},
            showSummary: false,
            deleteLoading: false,
            deleted: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
        this.toggleSummary = this.toggleSummary.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.voteClick = this.voteClick.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;

        const p1 = this.props.getBook(id)

        const p2 = this.props.getVote(id)

        Promise.all([p1, p2]).then(values => this.setState({ book: values[0], vote: values[1], loading: false}));

    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    toggleSummary() {
        this.setState({
            showSummary: !this.state.showSummary
        });
    }

    deleteBook() {
        const { id } = this.props.location.state;

        this.setState({
            deleteLoading: true
        });
        
        this.props.deleteBook(id)
            .then(() => this.setState({ deleted: true }))
            .catch(err => {
                this.setState({
                    loading: false,
                    deleteLoading: false,
                    modalIsOpen: false
                });
                this.showNotification('Błąd!', 'Wystąpił błąd przy usuwaniu pozycji z systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
        
    }

    deleteDiv() {
        const { deleteLoading, deleted } = this.state;
        return (
            !deleted ? <div className="ModalCard card add">
                { deleteLoading ? <div className="loadPadding"><Loader text="Usuwanie" /></div> :
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
            : <Redirect to="/dashboard" />
        )
    }

    voteClick(isPositive) {
        const data = {
            bookId: this.state.book.id,
            isPositive
        }

        this.props.vote(data)
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

    render() {
        const { book, loading, error, showSummary, vote } = this.state;
        const { isLibrarian } = this.props;

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
        <div className="sass-Book container">
            { loading ? <Loader text="Wczytywanie" /> : 
            <div className="book">
                <div className="bookInfo" >
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
                                <Link to={{ pathname: "/updateBook", state: { id: book.id } }} className="green"><i className="fa fa-pencil-square-o" aria-hidden="true" /></Link>
                                <button onClick={this.openModal} className="red"><i className="fa fa-trash" aria-hidden="true" /></button>
                            </div> }
                        </div>
                        <div className="body">
                            <div className="title">
                                <div>
                                    <h2>{book.title}</h2>
                                    <h3>{book.author}</h3>
                                </div>
                                <div>
                                    <div className={classnames("vote", color)}>
                                        <p>{book.votes > 0 ? '+'.concat(book.votes) : book.votes}</p>
                                    </div>
                                    <p>Dostępna</p>
                                </div>
                            </div>
                                
                            <div className="summary">
                                { showSummary ? <p>{book.summary}</p> :<p>{cutSummary(book.summary)}</p> }
                                { book.summary && 
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
                </div>
                <div className="comments">

                </div>
            </div> }
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                className="ReactModal"
                overlayClassName="Overlay"
            >
                {this.deleteDiv()}
            </Modal> 
            <Notificator ref="notificator"/>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLibrarian: state.user.librarian,
    }
}

export default connect(mapStateToProps, { getBook, deleteBook, getVote, vote })(showBook);