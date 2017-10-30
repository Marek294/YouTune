import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentUser, setUserData, setUserPassword } from '../../actions/users';
import ModifyUserDataForm from './ModifyUserDataForm';
import ChangePasswordForm from './ChangePasswordForm';
import Avatar from './Avatar';
import Notificator from '../messages//Notificator';

import './_Settings.scss';

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: '',
                avatar: ''
            },
            loading: true
        }

        this.submitUserDataForm = this.submitUserDataForm.bind(this);
        this.submitUserPasswordForm = this.submitUserPasswordForm.bind(this);
    }

    componentWillMount() {
        this.props.getCurrentUser().then(user => this.setState({ data: { firstname: user.firstname, lastname: user.lastname, avatar: user.avatar }, loading: false }))
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    submitUserDataForm(data) {
        this.props.setUserData(data)
            .then(() => { 
                    this.showNotification('Sukces!', 'Dane zostały zmienione', 'success', 3000);
                })
            .catch(err => {
                    const errors = err.response.data.errors;
                    if(errors.global) this.showNotification('Błąd!', errors.global, 'danger', 3000);
                    else this.showNotification('Błąd!', 'Nie można zmienić danych użytkownika', 'danger', 3000);
                })
    }

    submitUserPasswordForm(data) {
        this.props.setUserPassword(data)
            .then(() => { 
                    this.showNotification('Sukces!', 'Hasło zostało zmienione', 'success', 3000);
                })
            .catch(err => {
                    const errors = err.response.data.errors;
                    if(errors.global) this.showNotification('Błąd!', errors.global, 'danger', 3000);
                    else this.showNotification('Błąd!', 'Nie można zmienić hasła', 'danger', 3000);
                })
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="sass-Settings container-fluid">
                { loading ? 
                    <div className="loading">
                        <div className="loader" />
                        <h2>Trwa ładowanie ustawień...</h2>
                    </div> :
                    <div className="forms">
                        <div className="FormFlexItem-User">
                            <div className="card form">
                                <div className="card-header">
                                    <h4>Dane osobowe</h4>
                                </div>
                                <div className="card-body">
                                    <ModifyUserDataForm userData={this.state.data} submitUserDataForm={this.submitUserDataForm} />
                                </div>
                            </div>

                            <div className="card form">
                                <div className="card-header">
                                    <h4>Zmiana hasła</h4>
                                </div>
                                <div className="card-body">
                                    <ChangePasswordForm submitUserPasswordForm={this.submitUserPasswordForm} />
                                </div>
                            </div>
                        </div>

                        <div className="FormFlexItem-Avatar">
                            <div className="card form">
                                <div className="card-header">
                                    <h4>Zmiana zdjęcia</h4>
                                </div>
                                <div className="card-body">
                                    <Avatar avatar={this.state.data.avatar} />
                                </div>
                            </div>
                        </div>
                    </div> }
                <Notificator ref="notificator"/>
            </div>
        );
    }
}

export default connect(null, { getCurrentUser, setUserData, setUserPassword })(Settings);