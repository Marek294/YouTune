import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookLendingHistoryForm from './BookLendingHistoryForm';
import ShowLendingHistory from './ShowLendingHistory';
import WhoGotBook from './WhoGotBook';
import Loader from '../loader/Loader';

import { getBookLendingHistory, getLend } from '../../actions/lending';

import './_BookLendingHistory.scss';

class BookLendingHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            lendingHistory: [],
            page: 1,
            hasMore: false,
            initialDateString: undefined,
            finalDateString: undefined,
            lend: {},
            loading: true,
            errors: {}
        }

        this.getLendingHistoryByDate = this.getLendingHistoryByDate.bind(this);
        this.loadMoreLendingHistory = this.loadMoreLendingHistory.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const { page } = this.state;

        const p1 = this.props.getBookLendingHistory(id, page);

        const p2 = this.props.getLend(id);

        Promise.all([p1, p2])
            .then(values => this.setState({ lendingHistory: values[0].lendingHistory, hasMore: values[0].hasMore, lend: values[1], id, loading: false}))
            .catch(err => this.setState({ errors: err.response.data.errors, id, loading: false }))
    }

    getLendingHistoryByDate(initialDate, finalDate) {
        const { id } = this.state;
        const page = 1;

        const initialDateString = `${initialDate.getFullYear()}-${initialDate.getMonth()+1}-${initialDate.getDate()}`;
        const finalDateString = `${finalDate.getFullYear()}-${finalDate.getMonth()+1}-${finalDate.getDate()}`;

        this.setState({ initialDateString, finalDateString, loading: true });

        this.props.getBookLendingHistory(id, page, initialDateString, finalDateString)
            .then(data => this.setState({ lendingHistory: data.lendingHistory, hasMore: data.hasMore, page, loading: false}))
            .catch(err => this.setState({ errors: err.response.data.errors, page, loading: false }))
    }

    loadMoreLendingHistory() {
        const { hasMore, id, initialDateString, finalDateString } = this.state;
        let { page } = this.state;
        const stateLendingHistory = this.state.lendingHistory;

        if(hasMore) page += 1;

        this.props.getBookLendingHistory(id, page, initialDateString, finalDateString).then(data => {
            const { lendingHistory, hasMore } = data;

            lendingHistory.map(item => {
                stateLendingHistory.push(item);
            })

            this.setState({
                lendingHistory: stateLendingHistory,
                hasMore,
                page
            });
        })
    }

    render() {
        const { lendingHistory, lend, loading, hasMore } = this.state;

        return (
            <div className="sass-BookLendingHistory container">
                <div className="form">
                    <BookLendingHistoryForm getLendingHistoryByDate={this.getLendingHistoryByDate} />
                    { loading && <Loader text="Wczytywanie" /> }
                </div>
                <div className="data">
                    <ShowLendingHistory lendingHistory={lendingHistory} hasMore={hasMore} loading={loading} loadMoreLendingHistory={this.loadMoreLendingHistory} />
                    <WhoGotBook lend={lend} loading={loading} />
                </div>
            </div>
        );
    }
}

export default connect(null, { getBookLendingHistory, getLend })(BookLendingHistory);