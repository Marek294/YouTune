import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { confirm } from '../../actions/auth';

import './_ConfirmationPage.scss';

class ConfirmationPage extends Component {
    constructor(props) {
        super(props);

        this.state={
            loading: true,
            success: false
        }
    }

    componentDidMount() {
        this.props.confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true}))
            .catch(() => this.setState({ loading: false, success: false}))
    }

    render() {
        const { loading, success } = this.state;
        return (
            <div className="sass-ConfirmationPage">
               {loading && <div className="card border-primary">
                        <div className="card-header text-primary"><h4>Trwa weryfikacja...</h4></div>
                        <div className="card-body">
                            <div className="loader" />
                        </div>
                    </div>} 

               {!loading && success && 
                    <div className="card border-success">
                        <div className="card-header text-success"><h4>Dziękujemy!</h4></div>
                        <div className="card-body text-success">
                            <p className="card-text">Email został zweryfikowany. Teraz masz pełny dostęp do swojego konta.</p>
                            <Link className="btn btn-success" to="/dashboard">Przejdź do strony głównej</Link>
                        </div>
                    </div>}

                {!loading && !success && 
                <div className="card border-danger">
                    <div className="card-header text-danger"><h4>Ups!</h4></div>
                    <div className="card-body text-danger">
                        <p className="card-text">Link jest nieaktywny</p>
                    </div>
                </div>}
            </div>
        );
    }
}

ConfirmationPage.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    confirm: PropTypes.func.isRequired
}

export default connect(null, { confirm } )(ConfirmationPage);