import React, { Component } from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller'
import moment from 'moment'
import Modal from 'react-modal'
import _ from 'lodash'

import LineLoader from '../../loader/LineLoader'
import Loader from '../../loader/Loader'

import { getComments, deleteComment, librarianDeleteComment } from '../../../actions/books';
import { addNotification } from '../../../actions/notifications';

import './_Comments.scss';
import '../../../sass/_Card.scss';

class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.deleteCommentModal = this.deleteCommentModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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

    componentWillReceiveProps(nextProps) {
        if(this.props.newComment != nextProps.newComment) {
            const { comments } = this.state;
            comments.unshift(nextProps.newComment);

            this.setState({comments})
        }
    }

    deleteCommentModal(deleteItem) {
        this.setState({modalIsOpen: true, deleteItem});
    }

    closeModal() {
        this.setState({modalIsOpen: false, deleteItem: ''});
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
                        { item.user.avatar ? <img src={item.user.avatar} alt="" /> : <img src='noAvatar.jpg' alt="" /> }
                        <div className="userInfo">
                            <h5>{item.user.firstname} {item.user.lastname}</h5>
                            <p>{moment(item.created_at).format('LLL')}</p>
                        </div>
                    </div>
                    <pre className="text">{item.text}</pre>
                </div>
                { ( isLibrarian || isOwner ) && <button onClick={() => this.deleteCommentModal( item)} className="btn delete"><i className="fa fa-minus-circle" aria-hidden="true" /></button> }
            </li>
        )
    }

    render() {
        const { hasMore, comments } = this.state;

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
                    { this.deleteCommentDiv() }
                </Modal>
            </div>
        );
    }
}

export default connect(null, { getComments, addNotification, deleteComment, librarianDeleteComment })(Comments);