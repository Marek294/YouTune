import React from 'react';

import './_SelectedLend.scss';

const SelectedLend = ({selectedBooks, removeFromSelectedBooks, lendBooks}) => {
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
            {selectedBooks.length > 0   ? <button onClick={lendBooks} className="btn">Akceptuj wypożyczenia</button>
                                        : <button onClick={lendBooks} className="btn" disabled>Akceptuj wypożyczenia</button>
            }
        </div>
    )
};

export default SelectedLend;
