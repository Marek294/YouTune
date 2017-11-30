import React, { Component } from 'react'
import Spinner from '../../loader/Spinner';

import './_SelectedLend.scss';

class SelectedLend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }

        this.lendBooks = this.lendBooks.bind(this);
    }

    lendBooks() {
        this.setState({
            loading: true
        })

        this.props.lendBooks()
            .then(() => this.state({ loading: false }))
            .catch(() => this.state({ loading: false }))
    }

    render() {
        const { loading } = this.state;
        const { selectedBooks, removeFromSelectedBooks } = this.props;

        const displaySelectedBooks = selectedBooks.map((item,i) => {
            return (
                <button onClick={() => removeFromSelectedBooks(item)} className="list-group-item" key={i} >
                    <div className="book-info">
                        <div className="title">
                            <h2>{item.title}</h2>
                        </div>
                    </div>
                </button>
            )
        })

        return (
            <div className="scss-SelectedLend">
                <div className="header">
                    <i className="fa fa-book" aria-hidden="true" />
                    <h4>Wypożyczenia</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {displaySelectedBooks}
                    </ul>
                </div>
                { loading && <div className="loading"> <Spinner /> </div> }
                { (!loading && selectedBooks.length > 0) && <button onClick={this.lendBooks} className="btn">Akceptuj wypożyczenia</button> }
                { (!loading && selectedBooks.length === 0) && <button onClick={this.lendBooks} className="btn" disabled>Akceptuj wypożyczenia</button> }
            </div>
        )
    }
}

export default SelectedLend;
