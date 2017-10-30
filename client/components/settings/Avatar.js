import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { updateAvatar } from '../../actions/users';

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
            
        this.props.updateAvatar(sendData).then(user => {

        })
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

export default connect(null, { updateAvatar })(Avatar);