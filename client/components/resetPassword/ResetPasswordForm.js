import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

import './_ResetPasswordForm.scss';

class ResetPasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                token: this.props.token,
                password: '',
                confirmPassword: ''
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
        if(!data.password) errors.password = "Podaj nowe hasło";
        if(data.password !== data.confirmPassword) errors.confirmPassword = "Podaj nowe hasło jeszcze raz";
        return errors;
    }

    render() {
        const { errors, loading } = this.state;

        return (
            <div className="sass-ResetPasswordForm card">
                <div className="card-header">{loading ? <h1>Przetwarzanie</h1> : <h1>Podaj nowe hasło</h1>}</div>
                <div className="card-body">
                    { errors.global && <div className="alert alert-danger" role="alert">
                        { errors.global }
                        </div>}
                    {loading ? <div className="loader" /> : <form onSubmit={this.onSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="Password">Hasło</label>
                            <input type="password" className="form-control" id="Password" placeholder="Nowe hasło" name="password" onChange={this.onChange}  />
                            {errors.password && <InlineError text={errors.password} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">Potwierdź hasło</label>
                            <input type="password" className="form-control" id="ConfirmPassword" placeholder="Potwierdź nowe hasło" name="confirmPassword" onChange={this.onChange}  />
                            {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                        </div>
                        <button type="submit" className="btn">Wyślij</button>
                    </form> }
                </div>
            </div>
        );
    }
}

ResetPasswordForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string.isRequired
}

export default ResetPasswordForm;