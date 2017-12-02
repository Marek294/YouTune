import React, { Component } from 'react'
import { connect } from 'react-redux'

import Loader from '../loader/Loader'
import BookInfo from './bookInfo'
import Comments from './comments'

import { getBook, getVote, getComments } from '../../actions/books'

import './_ShowBook.scss'

class showBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            loading: true,
            book: {},
            vote: {},
            comments: {},
            error: {},
            hasMore: false
        }
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

    render() {
        const { book, vote, loading, comments, hasMore } = this.state;
        const { isLibrarian, user, history } = this.props;

        return (
        <div className="sass-Book container">
            { loading ? <Loader text="Wczytywanie" /> : 
            <div className="book">
                <BookInfo book={book} history={history} isLibrarian={isLibrarian} vote={vote} />
                <Comments book={book} comments={comments} isLibrarian={isLibrarian} hasMore={hasMore} user={user} />
            </div> }
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

export default connect(mapStateToProps, { getBook, getVote, getComments  })(showBook);