import React, { Component } from 'react';
import { connect } from 'react-redux';

import './_ModifyUserDataForm.scss';

class ModifyUserDataForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                firstname: '',
                lastname: ''
            }
        }

        this.submit = this.submit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        const { user } = this.props;

        this.setState({
            data: {
                firstname: user.firstname,
                lastname: user.lastname
            }
        })
    }

    onChange(e) { 
        this.setState({ 
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });
    }

    submit(e) {
        e.preventDefault();
        console.log(this.state);
    }

    render() {
        const { firstname, lastname } = this.state.data;
        return (
            <div className="sass-ModifyUserDataForm">
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <label htmlFor="firstname" className="col-sm-2 col-form-label">Imię</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="firstname" placeholder="Imię" name="firstname" onChange={this.onChange} value={firstname} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastname" className="col-sm-2 col-form-label">Nazwisko</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" id="lastname" placeholder="Nazwisko" name="lastname" onChange={this.onChange} value={lastname} />
                        </div>
                    </div>
                    <button type="submit" className="btn">Zapisz</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(ModifyUserDataForm);