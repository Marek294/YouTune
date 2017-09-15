import React, { Component } from 'react';
import shortid from 'shortid';
import classNames from 'classnames';
import _ from 'lodash';

import '../../sass/_Notificator.scss';

class Notificator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }

        this.show = this.show.bind(this);
    }

    hide(id, title, body, type) {
        const { notifications } = this.state;

        if(_.findIndex(notifications, function(o) { return o.key == id; }) > -1) {
            notifications.splice(_.findIndex(notifications, function(o) { return o.key == id; }),1, (
                <div key={id} className={classNames("notify-item", "animated", "fadeOut",type)}>
                <div className="notify-title">{title}</div>
                <div className="notify-body"><p>{body}</p></div>
            </div>
            ));

            this.setState({
                notifications
            });
    
            setTimeout(() => {
                notifications.splice(_.findIndex(notifications, function(o) { return o.key == id; }),1);
                this.setState({
                    notifications
                })
            }, 500);
        }

    }

    show(title, body, type, duration) {
        const { notifications } = this.state;
        const id = shortid.generate();

        const message = (
            <div key={id} className = {classNames("notify-item", "animated", "bounceInRight",type)} >
                <div className="notify-title">{title}</div>
                <div className="notify-body"><p>{body}</p></div>
            </div>
        )

        notifications.push(message);

        this.setState({
            notifications
        });

        setTimeout(() => {
            this.hide(id, title, body, type);
        }, duration);
    }
    
    render() {
        const { notifications } = this.state;
        return (
            <div className="notify-container">
                {notifications}
            </div>
        );
    }
}

export default Notificator;