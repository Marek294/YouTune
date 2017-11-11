import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

import './_SearchUser.scss';

class SearchUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: ''
            },
            error: {}
        };

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

        this.props.search(this.state.data);
    }

    render() {
        const { data } = this.state;
        const { errors } = this.props;
        const disabled = data.firstname || data.lastname ? false : true;

        return (
            <div className="sass-SearchUser">
                <form onSubmit={this.submit}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="firstname" className="col-form-label">Imię</label>
                            <input type="text" className="form-control" id="firstname" name="firstname" onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname" className="col-form-label">Nazwisko</label>
                            <input type="text" className="form-control" id="lastname" name="lastname" onChange={this.onChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn" disabled={disabled} >
                        <i className="fa fa-search" aria-hidden="true" />
                    </button>
                </form>
                { errors.global  && <div className="error"><InlineError text={errors.global} /></div> }
            </div>
        );
    }
}

SearchUser.propTypes = {
    search: PropTypes.func.isRequired,
    errors: PropTypes.shape().isRequired
}

export default SearchUser;