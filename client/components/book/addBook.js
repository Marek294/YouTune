/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import InlineError from '../messages/InlineError';

import './_AddBook.scss';

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '',
                author: '',
                cover: ''
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
            this.setState({
                loading: true
            })

            setTimeout(() => {
                this.setState({
                    loading: false,
                    data: {
                        title: '',
                        author: '',
                        cover: ''
                    },
                    errors: {}
                });
            }, 2000)
        }
    }

    validate(data) {
        const errors = {};

        if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
        if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

        return errors;
    }

    render() {
        const { errors, loading } = this.state;
        return (
            <div className="sass-BookForm">
                <div className="card form">
                    <div className="card-header">
                        <h4>Dodaj książkę</h4>
                    </div>
                    <div className="card-body">
                        { errors.global && <div className="alert alert-danger" role="alert">
                            { errors.global }
                            </div>}
                        { loading ? <div className="loading">
                                        <div className="loader" />
                                        <h2>Dodawanie książki do systemu...</h2>
                                    </div> : 
                        <div>
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="form-group">
                                    <label htmlFor="Title">Tytuł</label>
                                    <input type="name" className="form-control" id="Title" placeholder="Tytuł" name="title" onChange={this.onChange} autoComplete="false"/>
                                    {errors.title && <InlineError text={errors.title} />}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Author">Autor</label>
                                    <input type="name" spellCheck="false" className="form-control" id="Author" placeholder="Autor" name="author" onChange={this.onChange}/>
                                    {errors.author && <InlineError text={errors.author} />}
                                </div>
                                <button type="submit" className="btn">Dodaj</button>
                            </form>
                        </div> }
                    </div>
                </div>
            </div>
        );
    }
}

export default AddBook;