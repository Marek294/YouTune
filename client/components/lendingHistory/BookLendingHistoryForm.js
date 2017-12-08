import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../sass/_Card.scss';
import './_BookLendingHistoryForm.scss';

class BookLendingHistoryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialDate: moment(),
            finalDate: moment()
        }

        this.initialDateChange = this.initialDateChange.bind(this);
        this.finalDateChange = this.finalDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { initialDate, finalDate } = this.state;

        this.props.getLendingHistoryByDate(initialDate._d, finalDate._d);
    }

    initialDateChange(date) {
        this.setState({
            initialDate: date
        });
    }

    finalDateChange(date) {
        this.setState({
            finalDate: date
        });
    }

    render() {
        const { initialDate, finalDate } = this.state;

        moment.locale('pl'); 

        return (
            <div className="sass-BookLendingHistoryForm myCard">
                <div className="header">
                    <i className="fa fa-search" aria-hidden="true" />
                    <h4>Wyszukiwanie</h4>
                </div>
                <div className="body">
                <form onSubmit={this.onSubmit} >
                    <div className="form-group row">
                        <label htmlFor="datePicker1" className="col-sm-2 col-form-label">Od</label>
                        <div className="col-sm-10">
                            <DatePicker
                                id="datePicker1"
                                className="form-control"
                                selected={initialDate}
                                onChange={this.initialDateChange}
                                dateFormat="LL"
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label htmlFor="datePicker2" className="col-sm-2 col-form-label">Do</label>
                        <div className="col-sm-10">
                            <DatePicker
                                id="datePicker2"
                                className="form-control"
                                selected={finalDate}
                                onChange={this.finalDateChange}
                                dateFormat="LL"
                            />
                        </div>
                    </div>
                    
                    <button type="submit" className="btn" >
                        <i className="fa fa-search" aria-hidden="true" />
                    </button>
                </form>
                </div>
            </div>
        );
    }
}

export default BookLendingHistoryForm;