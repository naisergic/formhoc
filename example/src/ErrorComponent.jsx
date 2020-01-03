import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any
};

const ErrorComponent = (props) => {
  return <span className='errorMsg'>{props.children}</span>;
};

ErrorComponent.propTypes = propTypes;

export default ErrorComponent;
