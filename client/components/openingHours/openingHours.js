import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { setOpeningHours } from '../../actions/openingHours';
import { addNotification } from '../../actions/notifications';

import '../../sass/_Card.scss';
import './_openingHours.scss';

class OpeningHours extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    day: 'monday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'tuesday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'wednesday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'thursday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'friday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'saturday',
                    from: '',
                    to: '',
                    isOpen: true
                },
                {
                    day: 'sunday',
                    from: '',
                    to: '',
                    isOpen: true
                } 
            ],
            errors: {}
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const { data } = this.state;

        const promises = [];
        
        data.map(item => 
            promises.push(this.props.setOpeningHours(item))
        )
        
        Promise.all(promises)
            .then(() => {
                const message = {
                    title: 'Sukces!',
                    body: 'Poprawnie zmieniono godziny otwarcia biblioteki',
                    type: 'success',
                    duration: 3000
                }
        
                this.props.addNotification(message)
            })
            .catch(err => {
                const errors = err.response.data;
                let body;
                if(errors.from && errors.to) body = errors.from.concat("\n\n",errors.to);
                if(errors.from && !errors.to) body = errors.from;
                if(!errors.from && errors.to) body = errors.to;

                const message = {
                    title: 'Błąd!',
                    body,
                    type: 'danger',
                    duration: 5000
                }
        
                this.props.addNotification(message)
                this.setState({ errors: err.response.data })
            })
    }

    onChange(e) {
        const name = e.target.name;
        const index = Math.max(name.indexOf('from'), name.indexOf('to'), name.indexOf('isOpen'));

        const day = name.substring(0, index);
        const key = name.substring(index, name.length);

        let value = e.target.value;
        if(e.target.value === 'true') value = true;
        if(e.target.value === 'false') value = false;

        const { data } = this.state;
        const indexOfObject = _.findIndex(data, { day })
        data[indexOfObject][key] = value;

        this.setState({ data });
    }

    dayInput(day, name) {
        const { data } = this.state;
        const { isOpen } = data[_.findIndex(data, { 'day': name })];

        return (
            <div className="form-group row">
                <label>{day}</label>
                <div>
                    { isOpen ?  <div className="time">
                                    <input type="time" className="form-control-plaintext" name={name+"from"} onChange={this.onChange} />
                                    <i className="fa fa-minus" aria-hidden="true" />
                                    <input type="time" className="form-control-plaintext" name={name+"to"} onChange={this.onChange} />
                                </div>
                        : <div className="time" /> }
                    <select className="form-control" name={name+"isOpen"} onChange={this.onChange}>
                        <option value="true" >Otwarty</option>
                        <option value="false" >Zamknięty</option>
                    </select>
                </div>
            </div>)
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="sass-ChangeOpeningHours myCard container">
                <div className="header">
                    <i className="fa fa-clock-o" aria-hidden="true" />
                    <h4>Godziny otwarcia</h4>
                </div>
                <div className="body">
                    <form onSubmit={this.onSubmit} >
                        {this.dayInput('Poniedziałek','monday')}
                        {this.dayInput('Wtorek','tuesday')}
                        {this.dayInput('Środa','wednesday')}
                        {this.dayInput('Czwartek','thursday')}
                        {this.dayInput('Piątek','friday')}
                        {this.dayInput('Sobota','saturday')}
                        {this.dayInput('Niedziela','sunday')}
                        <button type='submit' className='btn'>Zmień</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect(null, { setOpeningHours, addNotification })(OpeningHours);