import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment'
import Modal from 'react-modal'
import _ from 'lodash'

import LineLoader from '../loader/LineLoader'
import Loader from '../loader/Loader'

import { comment, getComments, deleteComment, librarianDeleteComment } from '../../actions/books';
import { addNotification } from '../../actions/notifications';

import './_Comments.scss';
import '../../sass/_Card.scss';

function isCommentTooLong(name,value) {
    if(name === "text" && value.length > 255) return value.slice(0,255);
    
    return value;
}

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                bookId: '',
                text: ''
            },
            comments: [],
            page: 1,
            hasMore: false,
            modalIsOpen: false,
            modalOption: '',
            deleteItem: {},
            loading: false
        }

        this.loadMoreComments = this.loadMoreComments.bind(this);
        this.displayComment = this.displayComment.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addCommentDiv = this.addCommentDiv.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
    }

    componentWillMount() {
        const { comments, hasMore } = this.props;

        Modal.setAppElement('body');

        this.setState({
            comments,
            hasMore
        })
    }

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isCommentTooLong(e.target.name,e.target.value) }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        })

        const { data } = this.state;
        data.bookId = this.props.book.id;

        this.props.comment(data)
            .then(comment => {
                const { comments } = this.state;
                let newComment = comment;
                newComment.user = this.props.user;
                comments.unshift(newComment);

                this.setState({ comments, loading: false, modalIsOpen: false, data: { ...this.state.data, text: ''} })              
            })
            .catch(err => {
                this.setState({
                    loading: false,
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

    openModal(option, deleteItem) {
        this.setState({modalIsOpen: true, modalOption: option, deleteItem});
    }

    closeModal() {
        this.setState({modalIsOpen: false, modalOption: '', deleteItem: ''});
    }

    addCommentDiv() {
        const { loading, data } = this.state;
        return (
            <div className="ModalCard card add">
                { loading ? <div className="loadPadding"><Loader text="Dodawanie" /></div> :
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

    deleteCommentDiv() {
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
                        <p>Czy jesteś pewien, że chcesz usunąć ten komentarz?</p>
                        <div className="buttons">
                            <button onClick={this.deleteComment} className="delete">Usuń</button>
                            <button onClick={this.closeModal} className="cancel">Anuluj</button>
                        </div>
                    </div>
                </div> }
            </div> 
        )
    }

    loadMoreComments() {
        const { id } = this.props.book;
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

    deleteComment() {
        const { isLibrarian } = this.props;
        const { comments, deleteItem } = this.state;

        const index = _.findIndex(comments, function(o) { return o.id === deleteItem.id; })

        this.setState({
            loading: true
        })

        if(isLibrarian) {
            this.props.librarianDeleteComment(deleteItem.id)
                .then(() => {
                    comments.splice(index,1);
                    
                    this.setState({
                        comments,
                        loading: false,
                        modalIsOpen: false,
                        deleteItem: {}
                    })
                })
                .catch(() => {
                    this.setState({
                        loading: false,
                        modalIsOpen: false,
                        deleteItem: {}
                    })

                    const message = {
                        title: 'Błąd!',
                        body: 'Wystąpił błąd przy usunięciu komentarza. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                        type: 'danger',
                        duration: 3000
                    }
            
                    this.props.addNotification(message)
                })
        } else {
            this.props.deleteComment(deleteItem.id)
            .then(() => {
                comments.splice(index,1);
                
                this.setState({
                    comments,
                    loading: false,
                    modalIsOpen: false,
                    deleteItem: {}
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    modalIsOpen: false,
                    deleteItem: {}
                })

                const message = {
                    title: 'Błąd!',
                    body: 'Wystąpił błąd przy usunięciu komentarza. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                    type: 'danger',
                    duration: 3000
                }
        
                this.props.addNotification(message)
            })
        }
    }

    displayComment(item, i) {
        const { isLibrarian, user } = this.props;
        const isOwner = user.email === item.user.email;

        return (
            <li key={i} className="list-group-item">
                <div className="comment">
                    <div className="commentHeader">
                        <img src={item.user.avatar} alt="" />
                        <div className="userInfo">
                            <h5>{item.user.firstname} {item.user.lastname}</h5>
                            <p>{moment(item.created_at).format('LLL')}</p>
                        </div>
                    </div>
                    <pre className="text">{item.text}</pre>
                </div>
                { ( isLibrarian || isOwner ) && <button onClick={() => this.openModal('delete', item)} className="btn delete"><i className="fa fa-minus-circle" aria-hidden="true" /></button> }
            </li>
        )
    }

    render() {
        const { comments, hasMore, modalOption } = this.state;

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
            <div className="sass-comments myCard">
                <div className="header">
                    <div>
                        <i className="fa fa-comments" aria-hidden="true" />
                        <h4>Komentarze</h4>
                    </div>
                    <div className="buttons">
                        <button onClick={() => this.openModal('add')} className="green"><i className="fa fa-plus-circle" aria-hidden="true" /></button>
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

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="ReactModal"
                    overlayClassName="Overlay"
                >
                    { modalOption === 'add' && this.addCommentDiv() }
                    { modalOption === 'delete' && this.deleteCommentDiv() }
                </Modal>
            </div>
        );
    }
}

export default connect(null, { comment, getComments, addNotification, deleteComment, librarianDeleteComment })(Comments);