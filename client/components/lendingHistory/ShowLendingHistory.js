import React, { Component } from 'react';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroller';
import LineLoader from '../loader/LineLoader';

import './_ShowLendingHistory.scss';
import '../../sass/_Card.scss';

class ShowLendingHistory extends Component {
    constructor(props) {
        super(props);

        this.loadMoreLendingHistory = this.loadMoreLendingHistory.bind(this);
    }

    loadMoreLendingHistory() {
        this.props.loadMoreLendingHistory();
    }

    render() {
        const { lendingHistory, loading, hasMore } = this.props;

        console.log(hasMore);

        moment.locale('pl');

        const displayLendingHistory = lendingHistory.map((item, i) => (
            <li key={i} className="list-group-item">           
                <div className="user">
                    <img src={item.user.avatar} alt="" />
                    <div>
                        <p>{item.user.firstname}</p>
                        <p>{item.user.lastname}</p>
                    </div>
                </div>
                <div className="dates">
                    <p>Data wypożyczenia: <span>{moment(item.lent).format('LLL')}</span></p>
                    <p>Data oddania: <span>{moment(item.created_at).format('LLL')}</span></p>
                </div>
            </li>
        ))
        
        return (
            !loading && 
                <div className="sass-ShowLendingHistory myCard">
                    <div className="header">
                        <i className="fa fa-share-square-o" aria-hidden="true" />
                        <h4>Historia wypożyczeń</h4>
                    </div>
                    <div className="body">
                        <ul className="list-group">
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadMoreLendingHistory}
                                hasMore={hasMore}
                                loader={<LineLoader />}
                            >
                                {displayLendingHistory}
                            </InfiniteScroll>  
                        </ul>
                    </div>
                </div>
        );
    }
}

export default ShowLendingHistory;