/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';

require('../sass/_Player.scss');

const Player = () => 
    <div className="sass-Player">
        <div className="radio">
            <i className="fa fa-chevron-left" aria-hidden="true" />
            <iframe title="player" width="600" height="500" src="https://www.youtube.com/embed/Ar8QqHmuM18?autoplay=1"/>
            <i className="fa fa-chevron-right" aria-hidden="true" />
        </div>
    </div>

export default Player;