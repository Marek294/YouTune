import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

import './_ChangePasswordForm.scss';

class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                password: '',
                confirmPassword: ''
            },
            errors: {}
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) { 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }


    submit(e) {
        e.preventDefault();
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.props.submitUserPasswordForm(this.state);
        }
    }

    validate(data) {
        const errors = {};

        if(!data.password) errors.password = "Wpisz hasło";
        if(!data.confirmPassword) errors.confirmPassword = "Powtórz hasło";
        if(data.password && data.confirmPassword && data.password !== data.confirmPassword) errors.confirmPassword = "Hasła muszą się powtarzać";

        return errors;
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="sass-ChangePasswordForm">
                <div className="header">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    <h4>Hasło</h4>
                </div>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label htmlFor="password" className="col-form-label">Nowe hasło</label>
                        <input type="password" className="form-control" id="password" placeholder="Hasło" name="password" onChange={this.onChange} autoComplete="off" />
                        {errors.password && <InlineError text={errors.password} />}
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="col-form-label">Potwierdź nowe hasło</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Potwierdź hasło" name="confirmPassword" onChange={this.onChange} />
                        {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                    </div>
                    <button type="submit" className="btn">Zapisz</button>
                </form>
            </div>
        );
    }
}

ChangePasswordForm.propTypes = {
    submitUserPasswordForm: PropTypes.func.isRequired
}

export default ChangePasswordForm;