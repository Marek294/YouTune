import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../sass/_SearchUser.scss';

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
                    <div className="inputs">
                        <div className="form-group row">
                            <label htmlFor="firstname" className="col-sm-2 col-form-label">Imię</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="firstname" placeholder="Imię" name="firstname" onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="lastname" className="col-sm-2 col-form-label">Nazwisko</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="lastname" placeholder="Nazwisko" name="lastname" onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn">Szukaj</button>
                </form>
            </div>
        );
    }
}

SearchUser.propTypes = {
    search: PropTypes.func.isRequired
}

export default SearchUser;