import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../actions/users';
import Greetings from './greetings/Greetings';
import BorrowedBooks from './borrowedBooks/BorrowedBooks';
import Loader from '../loader/Loader';

class showUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            errors: {},
            loading: true
        }
    }

    componentWillMount(){
        const { id } = this.props.location.state;

        this.props.getUser(id)
            .then(user => {
                this.setState({
                    user,
                    loading: false,
                })
            })
            .catch(err => this.setState({errors: { global: 'Wystąpił błąd'}, loading: false}))
    }

    render() {
        const { user, loading } = this.state;
        return (
            <div className="sass-ShowUser">
                { loading ? <div className="load"><Loader text="Wczytywanie" /></div> :
                    <div className="container">
                        <Greetings user={user} />
                        <BorrowedBooks lending={user.lending} />
                </div> }
            </div>
        )
    }
}

export default connect(null, { getUser })(showUser);
