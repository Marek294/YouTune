import React, { Component } from 'react';
import classNames from 'classnames';

import SearchForm from './SearchForm';

import '../../sass/_Catalog.scss';

class Catalog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            advanced: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            advanced: !this.state.advanced
        });
    }

    render() {
        const { advanced } = this.state
        return (
            <div className="sass-Catalog container-fluid">
                <div className={classNames("card","search-form",advanced && 'extended')}>
                    <div className="card-header">
                        <h4>Wyszukiwanie</h4>
                    </div>
                    <div className="card-body">
                        <SearchForm toggle={this.toggle}/>
                    </div>
                </div>

                <div className="card books">
                    <div className="card-header">
                        <h4>Pozycje</h4>
                    </div>
                    <div className="card-body">
                        <p>miliard książek</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Catalog;