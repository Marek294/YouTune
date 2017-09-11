/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

require('../../sass/_LoginForm.scss');

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
            this.props.submit(this.state.data);
        }
    }

    validate(data) {
        const errors = {};

        if(!Validator.isEmail(data.email)) errors.email = "Niepoprawny email";
        if(!data.password) errors.password = "Wpisz hasło";

        return errors;
    }

    render() {
        const { data, errors } = this.state;
        return (
            <div className="sass-LoginForm">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="Email">Email address</label>
                        <input type="email" className="form-control" id="Email" placeholder="Adres email" name="email" value={data.email} onChange={this.onChange} />
                        {errors.email && <InlineError text={errors.email} />}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Password">Password</label>
                        <input type="password" className="form-control" id="Password" placeholder="Hasło" name="password" value={data.password} onChange={this.onChange}  />
                        {errors.password && <InlineError text={errors.password} />}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default LoginForm;