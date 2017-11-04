import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './_SearchUser.scss';

class SearchUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: ''
            }
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
                    <button type="submit" className="btn" >
                        <i className="fa fa-search" aria-hidden="true" />
                    </button>
                </form>
            </div>
        );
    }
}

SearchUser.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchUser;