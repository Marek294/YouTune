import React, { Component } from 'react';
import InlineError from '../messages/InlineError';

import './_ModifyUserDataForm.scss';

class ModifyUserDataForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: ''
            },
            errors: {}
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const { firstname, lastname } = this.props.userData;

        this.setState({
            data: {
                firstname,
                lastname
            }
        })
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
            this.props.submitUserDataForm(this.state);
        }
    }

    validate(data) {
        const errors = {};

        if(!data.firstname) errors.firstname = "Podaj imię";
        if(!data.lastname) errors.lastname = "Podaj nazwisko";

        return errors;
    }

    render() {
        const { firstname, lastname } = this.state.data;
        const { errors } = this.state

        return (
            <div className="sass-ModifyUserDataForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <label htmlFor="firstname" className="col-sm-2 col-form-label">Imię</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="firstname" placeholder="Imię" name="firstname" onChange={this.onChange} value={firstname} />
                            {errors.firstname && <InlineError text={errors.firstname} />}
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Nazwisko</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="lastname" placeholder="Nazwisko" name="lastname" onChange={this.onChange} value={lastname} />
                            {errors.lastname && <InlineError text={errors.lastname} />}
                        </div>
                    </div>
                    <button type="submit" className="btn">Zapisz</button>
                </form>
            </div>
        );
    }
}

export default ModifyUserDataForm;