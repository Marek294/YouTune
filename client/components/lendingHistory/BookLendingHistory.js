import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookLendingHistoryForm from './BookLendingHistoryForm';
import ShowLendingHistory from './ShowLendingHistory';
import Loader from '../loader/Loader';

import { getBookLendingHistory } from '../../actions/lending';

import './_BookLendingHistory.scss';

class BookLendingHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            lendingHistory: [],
            page: 1,
            loading: true,
            errors: {}
        }
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const { page } = this.state;

        this.props.getBookLendingHistory(id, page)
            .then(lendingHistory => this.setState({ lendingHistory, id, loading: false }))
            .catch(err => this.setState({ errors: err.response.data.errors, id, loading: false }))
    }

    render() {
        const { lendingHistory, loading } = this.state;

        return (
            <div className="sass-BookLendingHistory container">
                <div className="form">
                    <BookLendingHistoryForm />
                    { loading && <Loader text="Wczytywanie" /> }
                </div>
                <ShowLendingHistory lendingHistory={lendingHistory} />
            </div>
        );
    }
}

export default connect(null, { getBookLendingHistory })(BookLendingHistory);