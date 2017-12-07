import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../../sass/_DashboardCard.scss';
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
            <div className="sass-BookLendingHistoryForm DashboardCard">
                <DatePicker
                    selected={initialDate}
                    onChange={this.initialDateChange}
                    dateFormat="LL"
                />

                <DatePicker
                    selected={finalDate}
                    onChange={this.finalDateChange}
                    dateFormat="LL"
                />
            </div>
        );
    }
}

export default BookLendingHistoryForm;