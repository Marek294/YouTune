import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getCurrentUser, setUserData, setUserPassword } from '../../actions/users';
import ModifyUserDataForm from './ModifyUserDataForm';
import ChangePasswordForm from './ChangePasswordForm';
import Avatar from './Avatar';
import Loader from '../loader/Loader';
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
            menu: {
                userData: true,
                password: false,
                avatar: false
            },
            loading: true,
            start: true
        }

        this.submitUserDataForm = this.submitUserDataForm.bind(this);
        this.submitUserPasswordForm = this.submitUserPasswordForm.bind(this);
        this.menuClick = this.menuClick.bind(this);
    }

    componentWillMount() {
        this.props.getCurrentUser().then(user => this.setState({ data: { firstname: user.firstname, lastname: user.lastname, avatar: user.avatar }, loading: false, start: false }))
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    menuClick(e) {
        const { menu } = this.state;

        Object.keys(menu).map(key => {
            menu[key] = false
        });

        menu[e.target.name] = true;

        this.setState({ menu })
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
        const { loading, start, menu } = this.state;

        return (
            <div className="sass-Settings container">
                { loading ? <div className="load"><Loader text={start ? "Wczytywanie" : "Zapisywanie"} /></div> :
                <div className="cards">
                    <div className="Menu">
                        <ul className="list-group">
                            <button name="userData" onClick={this.menuClick} className={classnames('list-group-item', menu.userData && 'active')} >Dane osobowe</button>
                            <button name="password" onClick={this.menuClick} className={classnames('list-group-item', menu.password && 'active')}  >Hasło</button>
                            <button name="avatar" onClick={this.menuClick} className={classnames('list-group-item', menu.avatar && 'active')}  >Zdjęcie profilowe</button>
                        </ul>
                    </div>
                    <div className="Form">
                        { menu.userData && <ModifyUserDataForm userData={this.state.data} submitUserDataForm={this.submitUserDataForm} /> }
                        { menu.password && <ChangePasswordForm submitUserPasswordForm={this.submitUserPasswordForm} /> }
                        { menu.avatar && <Avatar avatar={this.state.data.avatar} /> }
                    </div>
                </div> }
                <Notificator ref="notificator"/>
            </div>
        );
    }
}

export default connect(null, { getCurrentUser, setUserData, setUserPassword })(Settings);