/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import Loader from '../loader/Loader';

import './_SignupForm.scss';

class SignupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            loading: false,
            errors: {}
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) { 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }


    onSubmit(e) {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.setState({
                loading: true
            })
            
            this.props.submit(this.state.data)
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
        }
    }

    validate(data) {
        const errors = {};

        if(!Validator.isEmail(data.email)) errors.email = "Niepoprawny email";
        if(!data.password) errors.password = "Podaj hasło";
        if(data.confirmPassword !== data.password) errors.confirmPassword = "Hasła nie są te same";
        if(!data.confirmPassword) errors.confirmPassword = "Podaj ponownie hasło";
        if(!data.firstname) errors.firstname = "Podaj imię";
        if(!data.lastname) errors.lastname = "Podaj nazwisko";

        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        return (
            loading ? <Loader text="Trwa rejestracja" /> : 
                <div className="sass-SignupForm">
                    { errors.global && <div className="alert alert-danger" role="alert">
                        { errors.global }
                        </div>}
                    <form onSubmit={this.onSubmit} autoComplete="off">
                        <h1>Rejestracja</h1>
                        <div className="form-group">
                            <label htmlFor="Firstname">Imię</label>
                            <input type="firstname" className="form-control" id="Firstname" placeholder="Jan" name="firstname" value={data.firstname} onChange={this.onChange} />
                            {errors.firstname && <InlineError text={errors.firstname} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Lastname">Nazwisko</label>
                            <input type="lastname" className="form-control" id="Lastname" placeholder="Kowalski" name="lastname" value={data.lastname} onChange={this.onChange} />
                            {errors.lastname && <InlineError text={errors.lastname} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Email">Email</label>
                            <input type="email" className="form-control" id="Email" placeholder="jankowalski@gmail.com" name="email" value={data.email} onChange={this.onChange} />
                            {errors.email && <InlineError text={errors.email} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Hasło</label>
                            <input type="password" className="form-control" id="Password" placeholder="Hasło" name="password" value={data.password} onChange={this.onChange}  />
                            {errors.password && <InlineError text={errors.password} />}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ConfirmPassword">Potwierdź hasło</label>
                            <input type="password" className="form-control" id="ConfirmPassword" placeholder="Potwierdź hasło" name="confirmPassword" value={data.confirmPassword} onChange={this.onChange}  />
                            {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                        </div>
                        <button type="submit" className="btn">Rejestruj</button>
                        <div className="loginContainer">
                            <Link className="loginLink" to="/">Masz już konto? Zaloguj się.</Link>
                        </div>
                    </form>
                </div>
        );
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default SignupForm;