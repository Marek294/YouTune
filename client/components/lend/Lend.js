import React, { Component } from 'react'
import Books from './books/Books';

import './_Lend.scss';
import './_DashboardCard.scss';

class Lend extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentWillMount() {
        const { user } = this.props.location.state;

        this.setState({ user });
    }

    render() {
        const { user } = this.state;

        return (
        <div className='sass-lend container'>
            <div className="left">
                <div className="user">
                    <img src={user.avatar} alt="" />
                    <h3 className="text-center">{user.firstname} {user.lastname}</h3>
                </div>
                <div className="DashboardCard books">
                    <div className="header">
                        <i className="fa fa-book" aria-hidden="true" />
                        <h4>Dodaj książki</h4>
                    </div>
                    <div className="card-body">
                        <Books />
                    </div>
                </div>
            </div>

            <div className="right">
                <div className="DashboardCard lending">
                    <div className="header">
                        <i className="fa fa-book" aria-hidden="true" />
                        <h4>Wypożyczenia</h4>
                    </div>
                    <div className="card-body">
                        
                    </div>
                </div>

                <button className="btn">Akceptuj wypożyczenia</button>
            </div>
        </div>
        )
    }
}


export default Lend
