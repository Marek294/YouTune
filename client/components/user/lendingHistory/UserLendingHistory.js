import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserLendingHistoryForm from './UserLendingHistoryForm';
import ShowLendingHistory from './ShowLendingHistory';
import Loader from '../../loader/Loader';

import { getShowUserLendingHistory } from '../../../actions/lending';

import './_UserLendingHistory.scss';

class UserLendingHistory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            lendingHistory: [],
            page: 1,
            hasMore: false,
            initialDateString: undefined,
            finalDateString: undefined,
            loading: true,
            errors: {}
        }

        this.getLendingHistoryByDate = this.getLendingHistoryByDate.bind(this);
        this.loadMoreLendingHistory = this.loadMoreLendingHistory.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;
        const { page } = this.state;

        this.props.getShowUserLendingHistory(id, page)
            .then(data => this.setState({ lendingHistory: data.lendingHistory, hasMore: data.hasMore, id, loading: false}))
    }

    getLendingHistoryByDate(initialDate, finalDate) {
        const { id } = this.state;
        const page = 1;

        const initialDateString = `${initialDate.getFullYear()}-${initialDate.getMonth()+1}-${initialDate.getDate()}`;
        const finalDateString = `${finalDate.getFullYear()}-${finalDate.getMonth()+1}-${finalDate.getDate()}`;

        this.setState({ initialDateString, finalDateString, loading: true });

        this.props.getShowUserLendingHistory(id, page, initialDateString, finalDateString)
            .then(data => this.setState({ lendingHistory: data.lendingHistory, hasMore: data.hasMore, page, loading: false}))
            .catch(err => this.setState({ errors: err.response.data.errors, page, loading: false }))
    }

    loadMoreLendingHistory() {
        const { hasMore, id, initialDateString, finalDateString } = this.state;
        let { page } = this.state;
        const stateLendingHistory = this.state.lendingHistory;

        if(hasMore) page += 1;

        this.props.getShowUserLendingHistory(id, page, initialDateString, finalDateString).then(data => {
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
        const { lendingHistory, loading, hasMore } = this.state;

        return (
            <div className="sass-BookLendingHistory container">
                <div className="form">
                    <UserLendingHistoryForm getLendingHistoryByDate={this.getLendingHistoryByDate} />
                    { loading && <Loader text="Wczytywanie" /> }
                </div>
                <div className="data">
                    <ShowLendingHistory lendingHistory={lendingHistory} hasMore={hasMore} loading={loading} loadMoreLendingHistory={this.loadMoreLendingHistory} />
                </div>
            </div>
        );
    }
}

export default connect(null, { getShowUserLendingHistory })(UserLendingHistory);