import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../actions/books';

import './_SearchForm.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            data: {
                select: '',
                query: ''
            }
        };

        this.submit = this.submit.bind(this);
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) { 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    toggle() {
        this.props.toggle();
        this.setState({
            advanced: !this.state.advanced
        })
    }

    submit(e) {
        e.preventDefault();

        this.props.search(this.state.data);
    }

    render() {
        const { fetch } = this.props;
        return (
            <div className="sass-SearchForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <div className="col-sm-4">
                            <select className="form-control" name="select" onChange={this.onChange}>
                                <option value="" hidden selected>Wybierz opcję...</option>
                                <option value="title">Tytuł</option>
                                <option value="author">Autor</option>
                            </select>
                        </div>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="query" name="query" onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="buttons">
                        <button type="submit" className="btn">Szukaj</button>
                        {fetch.errors && <p className="error">{fetch.errors.global}</p>}
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    toggle: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    fetch: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        fetch: state.fetch
    }
}

export default connect(mapStateToProps, { search })(SearchForm);