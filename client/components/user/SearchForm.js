import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../sass/_SearchForm.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advanced: false
        };

        this.submit = this.submit.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.toggle();
        this.setState({
            advanced: !this.state.advanced
        })
    }

    submit(e) {
        e.preventDefault();
    }

    render() {
        const { advanced } = this.state;
        return (
            <div className="sass-SearchForm">
                <form onSubmit={this.submit}>
                    <div className="inputs">
                        <div className="form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Tytuł</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="title" placeholder="Tytuł" />
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
                    </div>
                    <div className="buttons">
                        <button type="submit" className="btn">Szukaj</button>
                        <div className="sizeFormBtn" onClick={this.toggle}>{advanced ? 'Wyszukiwanie podstawowe' : 'Wyszukiwanie zaawansowane'}</div>
                    </div>
                </form>
            </div>
        );
    }
}

SearchForm.propTypes = {
    toggle: PropTypes.func.isRequired
}

export default SearchForm;