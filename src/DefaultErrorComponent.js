import React from 'react'
import PropTypes from 'prop-types'

export const DefaultErrorComponent = ({ children }) => {
  return <span>{ children }</span>
}

DefaultErrorComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default DefaultErrorComponent
