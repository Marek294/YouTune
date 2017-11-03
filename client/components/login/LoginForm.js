/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';
import Loader from '../loader/Loader';

import './_LoginForm.scss';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                email: '',
                password: ''
            },
            loading: false,
            errors: {}
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidUpdate(nextProps) {
        if(!this.state.loading) {
            nextProps.notFetching();
        }
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
                .catch(err => this.setState({ errors: err.response.data.errors, loading: false }))
        }
    }

    validate(data) {
        const errors = {};

        if(!Validator.isEmail(data.email)) errors.email = "Niepoprawny email";
        if(!data.password) errors.password = "Wpisz hasło";

        return errors;
    }

    render() {
        const { errors, loading } = this.state;
        return (
            loading ? <Loader text="Logowanie" /> : 
                <div className="sass-LoginForm">
                    { errors.global && <div className="alert alert-danger" role="alert">
                        { errors.global }
                        </div>}
                    <div>
                        <form onSubmit={this.onSubmit} autoComplete="off">
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input type="email" className="form-control" id="Email" placeholder="jankowalski@gmail.com" name="email" onChange={this.onChange} autoComplete="false"/>
                                {errors.email && <InlineError text={errors.email} />}
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Hasło</label>
                                <input type="password" spellCheck="false" className="form-control" id="Password" placeholder="Hasło" name="password" onChange={this.onChange}/>
                                {errors.password && <InlineError text={errors.password} />}
                            </div>
                            <button type="submit" className="btn">Zaloguj</button>
                            <div className="forgotAndSignup">
                                <Link className="forgotLink" to="/forgotPassword">Zapomniałeś hasło?</Link>
                                <Link className="signupLink" to="/signup">Nie posiadasz konta?<br/>Zarejestruj się!</Link>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired,
    notFetching: PropTypes.func.isRequired
};

export default LoginForm;