/* eslint linebreak-style: ["error", "windows"] */

import React, { Component } from 'react';
import Validator from 'validator';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import Modal from 'react-modal';
import Loader from '../loader/Loader';
import InlineError from '../messages/InlineError';

import { addBook } from '../../actions/books';
import { addNotification } from '../../actions/notifications';

import './_AddBook.scss';

function isSummaryTooLong(name,value) {
    if(name === "summary" && value.length > 2000) return value.slice(0,2000);
    
    return value;
}

class AddBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                title: '',
                author: '',
                summary: '',
                cover: ''
            },
            loading: false,
            errors: {},
            modalIsOpen: false
        }

        this.validate = this.validate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.addBook = this.addBook.bind(this);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.modalDiv = this.modalDiv.bind(this);
        this.modalAccept = this.modalAccept.bind(this);
    }

    componentWillMount() {
        Modal.setAppElement('body');
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
                modalIsOpen: true
            });
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

    openModal() {
        this.setState({modalIsOpen: true});
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    modalAccept() {
        this.setState({
            loading: true
        });

        const { data } = this.state;
        const sendData = new FormData();
        
        Object.keys(data).map(objectKey => {
            const value = data[objectKey];
            return sendData.append(objectKey, value)
        });

        this.addBook(sendData);
    }

    addBook(data) {
        this.props.addBook(data)
            .then(book =>{
                this.setState({
                    loading: false,
                    data: {
                        title: '',
                        author: '',
                        summary: '',
                        cover: ''
                    },
                    uploadedFile: {},
                    errors: {},
                    modalIsOpen: false
                });

                const message = {
                    title: 'Sukces!',
                    body: 'Dodano książkę do systemu',
                    type: 'success',
                    duration: 3000
                }
        
                this.props.addNotification(message)

                this.props.history.push('/Dashboard')        
            })
            .catch(err => {
                this.setState({
                    loading: false,
                    modalIsOpen: false
                });

                const message = {
                    title: 'Błąd!',
                    body: 'Wystąpił błąd przy dodawaniu pozycji do systemu. Spróbuj jeszcze raz, bądź zgłoś problem do administratora',
                    type: 'danger',
                    duration: 3000
                }
        
                this.props.addNotification(message)
            })
    }

    validate(data) {
        const errors = {};

        if(Validator.isEmpty(data.title)) errors.title = "Wprowadź tytuł";
        if(Validator.isEmpty(data.author)) errors.author = "Wprowadź autora";

        return errors;
    }

    modalDiv() {
        const { loading } = this.state;
        return (
            <div className="ModalCard card add">
                { loading ? <div className="loadPadding"><Loader text="Zapisywanie" /></div> :
                <div>
                    <div className="card-header">
                        <i className="fa fa-check-square-o" aria-hidden="true" />
                        <h4>Potwierdzenie</h4>
                    </div>
                    <div className="card-body">
                        <p>Czy jesteś pewien, że chcesz dodać tą pozycję do systemu?</p>
                        <div className="buttons">
                            <button onClick={this.modalAccept} className="add">Dodaj</button>
                            <button onClick={this.closeModal} className="cancel">Anuluj</button>
                        </div>
                    </div>
                </div> }
            </div>
        )
    }

    render() {
        const { errors, data } = this.state;
        return (
            <div className="sass-BookForm container">
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
                        <img src="addBook.jpg" alt="" />
                        <h4>Dodawanie pozycji</h4>
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
                                    <button type="submit" className="btn">Dodaj</button>
                                </div>
                            </form>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="ReactModal"
                    overlayClassName="Overlay"
                >
                    {this.modalDiv()}
                </Modal> 
            </div>
        );
    }
}

AddBook.propTypes = {
    addBook: PropTypes.func.isRequired
}

export default connect(null, { addBook, addNotification })(AddBook);