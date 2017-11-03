import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validateToken, resetPassword } from '../../actions/auth';
import ResetPasswordForm from './ResetPasswordForm';
import InvalidTokenMessage from '../messages/InvalidTokenMessage';
import Loader from '../loader/Loader';

import './_ResetPasswordPage.scss';

class ResetPasswordPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            errors: false
        }
    }

    componentDidMount() {
        this.props.validateToken(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }

    submit = data => this.props.resetPassword(data).then(() => this.props.history.push("/"));

    render() {
        const { loading, success } = this.state;
        const { token } = this.props.match.params;
        return (
            <div className="sass-ResetPasswordPage">
                { loading && <Loader text="Przetwarzanie" /> }
                { !loading && success && <ResetPasswordForm submit={this.submit} token={token} /> }
                { !loading && !success && <InvalidTokenMessage />}
            </div>
        );
    }
}

ResetPasswordPage.propTypes = {
    validateToken: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    resetPassword: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
}

export default connect(null, { validateToken, resetPassword })(ResetPasswordPage);