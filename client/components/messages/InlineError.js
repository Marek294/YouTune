/* eslint linebreak-style: ["error", "windows"] */

import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    color: "#ae5856",
    fontSize: "15px"
}

const InlineError = ({ text }) => <span style={styles}>{text}</span>

InlineError.propTypes = {
    text: PropTypes.string.isRequired
};

export default InlineError;