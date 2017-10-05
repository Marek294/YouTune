import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmail from 'validator/lib/isEmail';
import InlineError from '../messages/InlineError';

import './_ForgotPasswordForm.scss';

class ForgotPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: ''
            },
            loading: false,
            errors: {}
        };
    }

    onChange = e => 
        this.setState({
            ...this.state,
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    
    onSubmit = e => {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });
        if(Object.keys(errors).length === 0) {
            this.setState({loading: true});
            this.props
                .submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate = data => {
        const errors = {};
        if(!isEmail(data.email)) errors.email = "Błędny email";
        return errors;
    }

    render() {
        const { errors, loading } = this.state;

        return (
            <div className="sass-ForgotPasswordForm card">
                <div className="card-header">{ loading ? <h1>Przetwarzanie</h1> : <h1>Resetowanie hasła</h1> }</div>
                <div className="card-body">
                    { errors.global && <div className="alert alert-danger" role="alert">
                        { errors.global }
                        </div>}
                    {loading ? <div className="loader" /> :
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="Email">Adres Email</label>
                            <input type="email" className="form-control" id="Email" placeholder="jankowalski@gmail.com" name="email" onChange={this.onChange} autoComplete="false"/>
                            {errors.email && <InlineError text={errors.email} />}
                        </div>
                        <button type="submit" className="btn">Wyślij</button>
                    </form> }
                </div>
            </div>
        );
    }
}

ForgotPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default ForgotPasswordForm;