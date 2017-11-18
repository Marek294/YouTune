import React, { Component } from 'react';
import {
    Redirect,
    Link
  } from 'react-router-dom'
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import Modal from 'react-modal';
import Loader from '../loader/Loader';
import Notificator from '../messages//Notificator';
import { getBook, deleteBook, getVote, vote, comment, getComments } from '../../actions/books';

import './_ShowBook.scss';

function cutSummary(sum) {
    if(sum.length > 300) return sum.slice(0,300)+"...";
    return sum;
}

function isCommentTooLong(name,value) {
    if(name === "text" && value.length > 255) return value.slice(0,255);
    
    return value;
}

class showBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            data: {
                bookId: '',
                text: ''
            },
            book: {},
            vote: {},
            comments: {},
            error: {},
            modalOption: '',
            showSummary: false,
            deleteLoading: false,
            commentLoading: false,
            deleted: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteDiv = this.deleteDiv.bind(this);
        this.addCommentDiv = this.addCommentDiv.bind(this);
        this.toggleSummary = this.toggleSummary.bind(this);
        this.deleteBook = this.deleteBook.bind(this);
        this.voteClick = this.voteClick.bind(this);
        this.displayComment = this.displayComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;

        const p1 = this.props.getBook(id)

        const p2 = this.props.getVote(id)

        const p3 = this.props.getComments(id);

        Promise.all([p1, p2, p3]).then(values => this.setState({ book: values[0], vote: values[1], comments: values[2], loading: false}));

    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    openModal(option) {
        this.setState({modalIsOpen: true, modalOption: option});
    }

    closeModal() {
        this.setState({modalIsOpen: false, modalOption: ''});
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
                    modalIsOpen: false,
                    modalOption: ''
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

    addCommentDiv() {
        const { commentLoading, data } = this.state;
        return (
            <div className="ModalCard card add">
                { commentLoading ? <div className="loadPadding"><Loader text="Dodawanie" /></div> :
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

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isCommentTooLong(e.target.name,e.target.value) }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            commentLoading: true
        })

        const { data } = this.state;
        data.bookId = this.props.location.state.id;

        this.props.comment(data)
            .then(comment => {
                const { comments } = this.state;
                let newComment = comment;
                newComment.user = this.props.user;
                comments.push(newComment);

                this.setState({ comments, commentLoading: false, modalIsOpen: false, modalOption: '' })
                this.showNotification('Sukces!', 'Dodano komentarz', 'success', 3000);                
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    deleteLoading: false,
                    modalIsOpen: false,
                    modalOption: ''
                });
                this.showNotification('Błąd!', 'Wystąpił błąd przy usuwaniu pozycji z systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
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

    displayComment(item, i) {
        return (
            <li key={i} className="list-group-item">
                <div className="commentHeader">
                    <img src={item.user.avatar} alt="" />
                    <div className="userInfo">
                        <h5>{item.user.firstname} {item.user.lastname}</h5>
                        <p>{moment(item.created_at).format('LLL')}</p>
                    </div>
                </div>
                <pre className="text">{item.text}</pre>
            </li>
        )
    }

    render() {
        const { book, loading, error, showSummary, vote, comments, modalOption } = this.state;
        const { isLibrarian } = this.props;
        moment.locale('pl');

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

        let displayComments;
        if(comments.length > 0) {
            displayComments = comments.map((item, i) => this.displayComment(item,i));
        } else {
            displayComments = (
                <div className="noComments text-center">
                    <h2>Brak komentarzy</h2>
                    <h2>Bądź pierwszy i dodaj komentarz :)</h2>
                </div> )
        }

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
                                <button onClick={() => this.openModal('destroying')} className="red"><i className="fa fa-trash" aria-hidden="true" /></button>
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
                    <div className="header">
                        <div>
                            <i className="fa fa-comments" aria-hidden="true" />
                            <h4>Komentarze</h4>
                        </div>
                        <div className="buttons">
                            <button onClick={() => this.openModal('commenting')} className="green"><i className="fa fa-plus-circle" aria-hidden="true" /></button>
                        </div>
                    </div>
                    <ul className="list-group">
                        {displayComments}
                    </ul>
                </div>
            </div> }
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                className="ReactModal"
                overlayClassName="Overlay"
            >
                {modalOption === 'destroying' && this.deleteDiv()}
                {modalOption === 'commenting' && this.addCommentDiv()}
            </Modal> 
            <Notificator ref="notificator"/>
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

export default connect(mapStateToProps, { getBook, deleteBook, getVote, vote, comment, getComments  })(showBook);