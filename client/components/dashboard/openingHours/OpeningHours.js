import React from 'react';

import './_OpeningHours.scss';
import '../../../sass/_Card.scss';

function convertDay(dayString) {
    switch(dayString) {
        case 'monday':
            return 'Poniedziałek'
        case 'tuesday':
            return 'Wtorek'
        case 'wednesday':
            return 'Środa'
        case 'thursday':
            return 'Czwartek'
        case 'friday':
            return 'Piątek'
        case 'saturday':
            return 'Sobota'
        case 'sunday':
            return 'Niedziela'
        default:
            return null
    }
}

function convertTime(time) {
    const response = time.split(':');
    return response[0]+":"+response[1];
}

const OpeningHours = ({ openingHours }) => {
    const displayOpeningHours = openingHours.map((item,i) => {
        return (
            <div key={i} className="day">
                <p className="primary">{convertDay(item.day)}</p>
                { item.isOpen   ? <p className="secondary">{convertTime(item.from)} - {convertTime(item.to)}</p>
                                : <p className="secondary">Zamknięte</p> }
            </div>
        )
    })

    return (
        <div className="sass-OpeningHours myCard">
                <div>
                    <div className="header">
                        <i className="fa fa-clock-o" aria-hidden="true" />
                        <h4>Godziny otwarcia</h4>
                    </div>
                    <div className="body">
                        { displayOpeningHours }
                    </div>
                </div>
            </div>
    );
};

export default OpeningHours;