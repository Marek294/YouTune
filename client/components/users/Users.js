import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';
import { getUsers, deleteUser } from '../../actions/users';
import SearchUser from './SearchUser';
import Notificator from '../messages/Notificator';

import './_Users.scss';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            search: {
                firstname: '',
                lastname: ''
            },
            loading: true,
            deleteLoading: false,
            modalIsOpen: false,
            deleteUserId: -1,
            error: {}
        }

        this.search = this.search.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.showNotification = this.showNotification.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        this.props.getUsers()
            .then(users => this.setState({ users, loading: false }))
            .catch(() => this.setState({ loading: false, error: { global: "Nie jesteś pracownikiem"}}))
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    openModal(id) {
        this.setState({modalIsOpen: true, deleteUserId: id});
    }

    closeModal() {
        this.setState({modalIsOpen: false, deleteUserId: -1});
    }

    search(data) {
        this.setState({
            search: {
                firstname: data.firstname,
                lastname: data.lastname
            }
        });
    }

    deleteUser() {
        const id = this.state.deleteUserId;

        const findUserIndex = _.findIndex(this.state.users, { 'id': id });
        const usersArray = this.state.users;

        this.setState({
            deleteLoading: true
        })

        setTimeout(() => {
            usersArray.splice(findUserIndex, 1);

            this.closeModal();

            this.setState({
                users: usersArray,
                deleteLoading: false
            }) }, 2000);
        // this.props.deleteUser(id)
        //     .then(() => {
        //         this.showNotification('Sukces!', 'Czytelnik został pomyślnie usunięty z systemu', 'success', 3000);
        //     })
        //     .catch(err => {
        //         this.showNotification('Błąd!', 'Coś poszło nie tak', 'danger', 3000);
        //     })
    }

    render() {
        const { users, loading, search, error } = this.state;
        const currentUser = this.props.user;
        
        let displayUsers;
        if(users.length > 0) {
            displayUsers = users.map((user, i) => {
                if(user.firstname.toLowerCase().includes(search.firstname.toLowerCase()) && user.lastname.toLowerCase().includes(search.lastname.toLowerCase())) {
                    return (
                        <li key={i} className="list-group-item">
                        <div className="user-info">
                            <h3 className="bold">{user.firstname} {user.lastname}</h3>
                            <p className="grey">{user.email}</p>
                            <p className="grey">{user.confirmed ? 'Zatwierdzony' : 'Niezatwierdzony'}</p>
                        </div>
                        <div className="buttons">
                            {currentUser.email !== user.email && <button className="delete" onClick={() => this.openModal(user.id)}><i className="fa fa-trash" aria-hidden="true"></i></button>}
                            <button className="profile"><i className="fa fa-address-book-o" aria-hidden="true"></i></button>
                        </div>
                    </li>
                    )
                }
            })
        }

        return (
            <div className="sass-Users container-fluid">
                <div className="card search-form">
                    <div className="card-header">
                        <h4>Wyszukiwanie</h4>
                    </div>
                    <div className="card-body">
                        <SearchUser search={this.search} />
                    </div>
                </div>
                { error.global  && <div className="alert alert-danger" role="alert"> { error.global } </div> }
                { loading ? 
                        <div className="loading">
                            <div className="loader" />
                            <h2>Trwa wczytywanie czytelników...</h2>
                        </div> :
                        users.length > 0 && <div className="card users">
                        <div className="card-header">
                            <h4>Czytelnicy</h4>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {displayUsers}
                            </ul>
                        </div>
                    </div>
                    }
                <Notificator ref="notificator"/>
                
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="ReactModal"
                    overlayClassName="Overlay"
                >

                { this.state.deleteLoading ? 
                    <div className="waitingDiv">
                            <div className="loader red"></div>
                            <p>Czekaj trwa wprowadzanie zmian...</p>
                    </div> :
                    <div className="ModalCard">
                        <div className="card-header bg-lightdanger">
                            <p>Potwierdzenie usunięcia</p>
                        </div>
                        <div className="card-body">
                            <p>Czy jesteś pewien, że chcesz usunąć tego użytkownika z systemu?</p>
                            <div className="buttons">
                                <button className="cancel" onClick={this.closeModal}>Anuluj</button>
                                <button className="delete" onClick={this.deleteUser}>Tak</button>
                            </div>
                        </div>
                    </div> }
                </Modal> 

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUsers, deleteUser })(Users);