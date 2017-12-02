import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import _ from 'lodash'
import PropTypes from 'prop-types'

import { destroyNotification } from '../../actions/notifications'

import './_Notificator.scss';

class Notificator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: [],
            displayNotifications: []
        }
    }

    componentWillReceiveProps(nextProps) {
        const reduxNotifications = nextProps.notifications;
        let { notifications } = this.state;
        const { displayNotifications } = this.state;

        _.difference(reduxNotifications,notifications).map( item => {

            const message = (
                <div key={item.id} className = {classNames("notify-item", "animated", "bounceInRight",item.type)} >
                    <div className="notify-title">{item.title}</div>
                    <div className="notify-body"><p>{item.body}</p></div>
                </div>
            )

            displayNotifications.push(message);

            setTimeout(() => {
                this.hide(item.id, item.title, item.body, item.type);
            }, item.duration);
        })

        notifications = reduxNotifications;

        this.setState({
            notifications,
            displayNotifications
        })
    }

    hide(id, title, body, type) {
        const { displayNotifications, notifications } = this.state;

        if(_.findIndex(displayNotifications, function(o) { return o.key == id; }) > -1) {
            displayNotifications.splice(_.findIndex(displayNotifications, function(o) { return o.key == id; }),1, (
                <div key={id} className={classNames("notify-item", "animated", "fadeOut",type)}>
                <div className="notify-title">{title}</div>
                <div className="notify-body"><p>{body}</p></div>
            </div>
            ));

            this.setState({
                displayNotifications
            });
    
            setTimeout(() => {
                displayNotifications.splice(_.findIndex(displayNotifications, function(o) { return o.key == id; }),1);

                this.props.destroyNotification(notifications[_.findIndex(notifications, function(o) { return o.id == id; })])

                this.setState({
                    displayNotifications
                })
            }, 500);
        }

    }
    
    render() {
        const { displayNotifications } = this.state;

        return (
            ReactDOM.createPortal(
                <div className="notify-container">
                    {displayNotifications}
                </div>,
                 document.getElementById('notifications')
            )  
        );
    }
}

Notificator.propTypes = {
    destroyNotification: PropTypes.func.isRequired,
    notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    }
};

export default connect(mapStateToProps, { destroyNotification })(Notificator);