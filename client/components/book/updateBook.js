/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import {
    Redirect,
  } from 'react-router-dom'
import Validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Loader from '../loader/Loader';
import InlineError from '../messages/InlineError';
import Notificator from '../messages//Notificator';
import { getBook, updateBook } from '../../actions/books';

import './_UpdateBook.scss';

function isSummaryTooLong(name,value) {
    if(name === "summary" && value.length > 2000) return value.slice(0,2000);
    
    return value;
}

class UpdateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            loading: true,
            errors: {},
            updated: false,
            updating: false
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    componentWillMount() {
        const { id } = this.props.location.state;

        this.props.getBook(id)
            .then(book => {
                if(!book.cover) {
                    book.cover = {}
                } else {
                    const tmp = book.cover;
                    book.cover = {}
                    book.cover.preview = tmp;
                }

                this.setState({ data: book, loading: false }) 
            })

    }

    onChange(e) {
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: isSummaryTooLong(e.target.name,e.target.value) }
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const { data } = this.state;

        const errors = this.validate(data);
        this.setState({ errors });

        if(Object.keys(errors).length === 0) {
            this.setState({
                loading: true,
                updating: true
            });
    
            const sendData = new FormData();
            
            Object.keys(data).map(objectKey => {
                const value = data[objectKey];
                return sendData.append(objectKey, value)
            });
    
            this.updateBook(sendData);
        }
    }

    onImageDrop(files) {
        this.setState({
            data: {
                ...this.state.data,
                cover: files[0]
            }
          });
    }

    showNotification(title, body, type, duration) {
        this.refs.notificator.show(title, body, type, duration);
      }

    updateBook(data) {
        this.props.updateBook(data)
            .then(book =>this.setState({
                updated: true,
                loading: false,
                updating: false
            }))
            .catch(err => {
                this.setState({
                    loading: false,
                    modalIsOpen: false,
                    updating: false
                });
                this.showNotification('Błąd!', 'Wystąpił błąd przy wprowadzaniu zmian pozycji w systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora', 'danger', 3000);
            })
    }

    validate(data) {
        const errors = {};

        if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
        if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

        return errors;
    }

    render() {
        const { errors, loading, data, updated, updating } = this.state;

        return (
            loading ? <div style={{marginTop: '50px'}}> <Loader text={ updating ? "Trwa wprowadzanie zmian" : "Wczytywanie"} /> </div> :
            <div className="sass-UpdateBookForm container">
                { updated && <Redirect to={{ pathname: "/book", state: { id: data.id } }} /> }
                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop}
                    className="dropZone text-center">
                        { data.cover.preview ? <img src={data.cover.preview} alt=""/> 
                            : <div className="noUploadedFile">
                                <img src="cover.png" alt="" />
                                <h4>Brak<br/>Okładki</h4>
                                <p>Przeciągnij i upuść tutaj zdjęcie okładki bądź kliknij i wybierz zdjęcie</p>
                                </div> }
                </Dropzone>
                <div className="card form">
                    <div className="card-header">
                        <i className="fa fa-pencil-square-o" aria-hidden="true" />
                        <h4>Edytowanie pozycji</h4>
                    </div>
                    <div className="card-body">
                        { errors.global && <div className="alert alert-danger" role="alert">
                            { errors.global }
                            </div>} 
                            <form onSubmit={this.onSubmit} autoComplete="off">
                                <div className="formData">
                                    <div className="form-group">
                                        <label htmlFor="Title">Tytuł</label>
                                        <input type="name" className="form-control" id="Title" name="title" onChange={this.onChange} value={data.title} autoComplete="false"/>
                                        {errors.title && <InlineError text={errors.title} />}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Author">Autor</label>
                                        <input type="name" spellCheck="false" className="form-control" id="Author" name="author" onChange={this.onChange} value={data.author}/>
                                        {errors.author && <InlineError text={errors.author} />}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Summary">Strzeszczenie (pozostało {2000-data.summary.length} znaków)</label>
                                        <textarea className="form-control" id="Summary" rows="3" name="summary" onChange={this.onChange} value={data.summary} />
                                    </div>
                                    <button type="submit" className="btn">Edytuj</button>
                                </div>
                            </form>
                    </div>
                </div>

                <Notificator ref="notificator"/>
            </div>
        );
    }
}

UpdateBook.propTypes = {
    updateBook: PropTypes.func.isRequired
}

export default connect(null, { getBook, updateBook })(UpdateBook);