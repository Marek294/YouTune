import React from 'react';

require('../sass/_Player.scss');

class Player extends React.Component {
    render() {
        return (
            <div className="sass-Player">
                <div className="radio">
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    <iframe width="600" height="500"
                            src="https://www.youtube.com/embed/Ar8QqHmuM18?autoplay=1">
                    </iframe>
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </div>
            </div>
        )
    }
}

export default Player;