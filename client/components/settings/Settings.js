import React, { Component } from 'react';
import ModifyUserDataForm from './ModifyUserDataForm';
import ChangePasswordForm from './ChangePasswordForm';

import '../../sass/_Settings.scss';

class Settings extends Component {
    render() {
        return (
            <div className="sass-Settings container-fluid">
                <div className="card form">
                    <div className="card-header">
                        <h4>Dane osobowe</h4>
                    </div>
                    <div className="card-body">
                        <ModifyUserDataForm />
                    </div>
                </div>

                <div className="card form">
                    <div className="card-header">
                        <h4>Zmiana hasła</h4>
                    </div>
                    <div className="card-body">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;