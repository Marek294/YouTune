import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({ isAuthenticated, isLibrarian, component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (isAuthenticated && isLibrarian) ? <Component {...props} /> : <Redirect to="/dashboard" />} />
    );
};

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLibrarian: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
        isLibrarian: state.user.librarian
    }
};

export default connect(mapStateToProps)(UserRoute);