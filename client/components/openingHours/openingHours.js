import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Loader from '../loader/Loader';
import InlineError from '../messages/InlineError';

import { setOpeningHours, getOpeningHours } from '../../actions/openingHours';
import { addNotification } from '../../actions/notifications';

import '../../sass/_Card.scss';
import './_openingHours.scss';

function convertTime(time) {
    const response = time.split(':');
    return response[0]+":"+response[1];
}

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
            errors: {},
            loading: true
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const { data } = this.state;
        this.props.getOpeningHours()
            .then(openingHours => {
                openingHours.map( item => {
                    let tmp = Object.assign({}, _.find(data, { day: item.day }));
                    tmp.from = item.from;
                    tmp.to = item.to;
                    tmp.isOpen = item.isOpen

                    const index = _.findIndex(data, { day: item.day })
                    data.splice(index, 1, tmp);
                })

                this.setState({
                    data,
                    loading: false
                })
            })
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        })

        const { data } = this.state;

        this.props.setOpeningHours(data)
            .then(() => {
                const message = {
                    title: 'Sukces!',
                    body: 'Poprawnie zmieniono godziny otwarcia biblioteki',
                    type: 'success',
                    duration: 3000
                }
        
                this.props.addNotification(message)
                this.props.history.push('/Dashboard');
            })
            .catch(err => this.setState({ errors: err.response.data, loading: false }) )
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

    dayInput(dayString, day) {
        const { data, errors } = this.state;
        const { isOpen} = _.find(data, { day });
        let { from, to } = _.find(data, { day });

        from = convertTime(from);
        to = convertTime(to);

        return (
            <div className="form-group row">
                <div>
                    <label>{dayString}</label>
                    <div className="item">
                        { isOpen ?  <div className="time">
                                        <input type="time" className="form-control-plaintext" name={day+"from"} onChange={this.onChange} value={from} />
                                        <i className="fa fa-minus" aria-hidden="true" />
                                        <input type="time" className="form-control-plaintext" name={day+"to"} onChange={this.onChange} value={to} />
                                    </div>
                            : <div className="time" /> }
                        <select className="form-control" name={day+"isOpen"} onChange={this.onChange} value={isOpen}>
                            <option value="true" >Otwarty</option>
                            <option value="false" >Zamknięty</option>
                        </select>
                    </div>
                </div>
                { errors[day] ? <div className="error"><p>Niepoprawne dane!</p></div> : <div className="error" /> }
            </div>)
    }

    render() {
        const { errors, data, loading } = this.state;

        return (
            <div className="sass-ChangeOpeningHours myCard container">
                <div className="header">
                    <i className="fa fa-clock-o" aria-hidden="true" />
                    <h4>Godziny otwarcia</h4>
                </div>
                <div className="body">
                    { loading   ? <Loader text="Wczytywanie" />                       
                                :   <form onSubmit={this.onSubmit} >
                                        {this.dayInput('Poniedziałek','monday')}
                                        {this.dayInput('Wtorek','tuesday')}
                                        {this.dayInput('Środa','wednesday')}
                                        {this.dayInput('Czwartek','thursday')}
                                        {this.dayInput('Piątek','friday')}
                                        {this.dayInput('Sobota','saturday')}
                                        {this.dayInput('Niedziela','sunday')}
                                        <button type='submit' className='btn'>Zmień</button>
                                    </form>
                    }
                </div>
            </div>
        );
    }
}

export default connect(null, { setOpeningHours, addNotification, getOpeningHours })(OpeningHours);