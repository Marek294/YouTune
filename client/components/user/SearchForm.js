import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search } from '../../actions/books';

import '../../sass/_SearchForm.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advanced: false,
            loading: false,
            data: {
                title: ''
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

        this.props.search(this.state.data.title);
    }

    render() {
        const { advanced } = this.state;
        const { fetch } = this.props;
        return (
            <div className="sass-SearchForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Tytuł</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="title" placeholder="Tytuł" name="title" onChange={this.onChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="author" className="col-sm-2 col-form-label">Autor</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="author" placeholder="Autor" />
                        </div>
                    </div>
                    { advanced && 
                        <div className="form-group row">
                            <label htmlFor="genre" className="col-sm-2 col-form-label">Gatunek</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="genre" placeholder="Gatunek" />
                            </div> 
                        </div>
                    }
                    <div className="buttons">
                        <button type="submit" className="btn">Szukaj</button>
                        {fetch.errors && <p className="error">{fetch.errors.global}</p>}
                        <div className="sizeFormBtn" onClick={this.toggle}>{advanced ? 'Wyszukiwanie podstawowe' : 'Wyszukiwanie zaawansowane'}</div>
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