import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ForgotPasswordForm from './ForgotPasswordForm';
import ForgotPasswordMessage from '../messages/ForgotPasswordMessage';
import { resetPasswordRequest } from '../../actions/auth';

import './_ForgotPasswordPage.scss';

class ForgotPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            success: false
        }
    }

    submit = data => 
        this.props.resetPasswordRequest(data)
        .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>
                <div className="sass-ForgotPasswordPage">
                {this.state.success ? <ForgotPasswordMessage /> :
                    <ForgotPasswordForm submit={this.submit} />}
                </div>
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);