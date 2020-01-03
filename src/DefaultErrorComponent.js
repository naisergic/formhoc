import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.any
};

export const DefaultErrorComponent = (props) => {
  return <span>{props.children}</span>;
};

DefaultErrorComponent.propTypes = propTypes;

export default DefaultErrorComponent;
