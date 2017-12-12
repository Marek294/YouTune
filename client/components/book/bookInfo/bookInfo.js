import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { setVote } from '../../../actions/books'
import { addNotification } from '../../../actions/notifications';

import './_BookInfo.scss';
import '../../../sass/_Card.scss';

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
    }

    componentWillMount() {
        const { book, vote } = this.props;

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

    render() {
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
                <div className="info myCard" >
                    <div className="header">
                        <div>
                            <i className="fa fa-info-circle" aria-hidden="true" />
                            <h4>Informacje</h4>
                        </div>
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
            </div>
        )
    }
}

BookInfo.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired
    }).isRequired
}

export default connect(null, { setVote, addNotification })(BookInfo);