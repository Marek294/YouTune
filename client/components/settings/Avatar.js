import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import './_Avatar.scss';

class Avatar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar: ''
        }

        this.onImageDrop = this.onImageDrop.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            avatar: this.props.avatar
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const sendData = new FormData();
        
        sendData.append('avatar', this.state.avatar);
            
        this.props.submitUserAvatar(sendData);
    }

    onImageDrop(files) {
        this.setState({
            avatar: files[0]
          });
    }

    render() {
        const { avatar } = this.state;
        return (
            <div className="sass-Avatar">
                <div className="header">
                    <i className="fa fa-pencil-square-o" aria-hidden="true" />
                    <h4>Zdjęcie profilowe</h4>
                </div>
                <form onSubmit={this.onSubmit}>
                    <Dropzone
                        multiple={false}
                        accept="image/*"
                        onDrop={this.onImageDrop}
                        className="dropZone">
                            { (avatar && avatar.preview) && <img src={avatar.preview} alt="" /> }
                            { (avatar && !avatar.preview) && <img src={avatar} alt="" /> }
                            { !avatar && <img src="noAvatar.jpg" alt="" />}
                    </Dropzone>

                    <button type="submit" className="btn">Zmień</button>
                </form>
            </div>
        );
    }
}

Avatar.propTypes = {
    submitUserAvatar: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired
}

export default Avatar;