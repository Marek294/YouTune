/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import InlineError from '../messages/InlineError';
import { addBook } from '../../actions/books';

import './_AddBook.scss';

const CLOUDINARY_UPLOAD_PRESET = 'mnywgy3d';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/myLib/upload';

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
            errors: {},
            uploadedFile: {}
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addBook = this.addBook.bind(this);
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

            const { uploadedFile } = this.state;

            if(uploadedFile.name) {
                this.handleImageUpload(uploadedFile)
                    .then(res => {
                        const imageUrl = res.body.secure_url;
                        if(imageUrl) {
                            this.setState({
                                data: {
                                    ...this.state.data,
                                    cover: imageUrl
                                }
                            });

                            this.addBook(this.state.data);
                        } else console.log('Brak adresu to okładki');
                    })
                    .catch(err => {
                        console.log('Błąd przy zapisie okładki', err);
                    })
            } else {
                this.addBook(this.state.data);
            }
        }
    }

    onImageDrop(files) {
        this.setState({
            uploadedFile: files[0]
          });
    }

    addBook(data) {
        this.props.addBook(data)
            .then(book =>{
                this.setState({
                    loading: false,
                    data: {
                        title: '',
                        author: '',
                        cover: ''
                    },
                    errors: {}
                });
                console.log('Dodano książkę');
            })
            .catch(err => {
                console.log('Wystąpił błąd przy dodawaniu pozycji do systemu');
            })
    }

    handleImageUpload(file) {
        let upload = request.post(CLOUDINARY_UPLOAD_URL)
                            .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                            .field('file', file);

        return upload;
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
                                <div className="formData">
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
                                </div>
                                <Dropzone
                                    multiple={false}
                                    accept="image/*"
                                    onDrop={this.onImageDrop.bind(this)}
                                    className="dropZone text-center">
                                        { this.state.uploadedFile.preview ? <img src={this.state.uploadedFile.preview} /> 
                                            : <div className="noUploadedFile">
                                                <h4>Brak okładki</h4>
                                                <p>Przeciągnij i upuść tutaj zdjęcie okładki bądź kliknij i wybierz zdjęcie</p>
                                              </div> }
                                </Dropzone>
                            </form>
                        </div> }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, { addBook })(AddBook);