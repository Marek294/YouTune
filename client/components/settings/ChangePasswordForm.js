import React, { Component } from 'react';
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

        this.validate = this.validate.bind(this);
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
            console.log('Change');
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
        const { data, errors } = this.state;

        return (
            <div className="sass-ChangePasswordForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <label htmlFor="password" className="col-sm-2 col-form-label">Nowe hasło</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="password" placeholder="Hasło" name="password" onChange={this.onChange} />
                            {errors.password && <InlineError text={errors.password} />}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="confirmPassword" className="col-sm-2 col-form-label">Potwierdź nowe hasło</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="confirmPassword" placeholder="Potwierdź hasło" name="confirmPassword" onChange={this.onChange} />
                            {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                        </div>
                    </div>
                    <button type="submit" className="btn">Zapisz</button>
                </form>
            </div>
        );
    }
}

export default ChangePasswordForm;