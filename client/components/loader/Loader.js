import React, { Component } from 'react';

import './_Loader.scss';

class Loader extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="loading">
                <div className="sk-cube-grid">
                    <div className="sk-cube sk-cube1" />
                    <div className="sk-cube sk-cube2" />
                    <div className="sk-cube sk-cube3" />
                    <div className="sk-cube sk-cube4" />
                    <div className="sk-cube sk-cube5" />
                    <div className="sk-cube sk-cube6" />
                    <div className="sk-cube sk-cube7" />
                    <div className="sk-cube sk-cube8" />
                    <div className="sk-cube sk-cube9" />
                </div>
                <h4>{this.props.text}</h4>
            </div>
        );
    }
}

export default Loader;