import React, { Component } from 'react';
import {
    Redirect,
    Link
  } from 'react-router-dom'
import { connect } from 'react-redux';
import classnames from 'classnames';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-modal';
import Loader from '../loader/Loader';
import LineLoader from '../loader/LineLoader';
import Notificator from '../messages//Notificator';
import BookInfo from './bookInfo';

import { getBook, getVote, vote, comment, getComments } from '../../actions/books';

import './_ShowBook.scss';

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
            page: 1,
            hasMore: false,
            showSummary: false,
            deleteLoading: false,
            commentLoading: false,
            deleted: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addCommentDiv = this.addCommentDiv.bind(this);
        this.displayComment = this.displayComment.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.loadMoreComments = this.loadMoreComments.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const { page } = this.state;

        const p1 = this.props.getBook(id)

        const p2 = this.props.getVote(id)

        const p3 = this.props.getComments(id,page);

        Promise.all([p1, p2, p3]).then(values => {
            const { comments , hasMore } = values[2];
            this.setState({ book: values[0], vote: values[1], comments, hasMore, loading: false})
        });

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

    loadMoreComments() {
        const { id } = this.props.location.state;
        let { hasMore, page } = this.state;
        let stateComments = this.state.comments;

        if(hasMore) page++;

        this.props.getComments(id,page).then(data => {
            const { comments, hasMore } = data;

            comments.map(item => {
                stateComments.push(item);
            })

            this.setState({
                comments: stateComments,
                hasMore,
                page
            });
        })
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
                comments.unshift(newComment);

                this.setState({ comments, commentLoading: false, modalIsOpen: false, modalOption: '', data: { ...this.state.data, text: ''} })
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
        const { book, loading, error, showSummary, vote, comments, modalOption, hasMore } = this.state;
        const { isLibrarian } = this.props;

        moment.locale('pl');

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
                <BookInfo book={book} isLibrarian={isLibrarian} vote={vote} />

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
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadMoreComments}
                        hasMore={hasMore}
                        loader={<LineLoader />}
                    >
                    {displayComments}
                    </InfiniteScroll>
                        
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

export default connect(mapStateToProps, { getBook, getVote, vote, comment, getComments  })(showBook);