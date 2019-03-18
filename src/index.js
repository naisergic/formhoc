import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RenderForm from './RenderForm'

export default class FormHOC extends Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    inputTypeJson: PropTypes.object,
    disabled: PropTypes.bool,
    divWrapperNeeded: PropTypes.bool
  }

  static defaultProps = {
    selectedValue: '',
    inputTypeJson: {},
    disabled: false,
    divWrapperNeeded: false
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e, isError) {
    if (isError) {
      this.forceUpdate()
    }
  }
  render() {
    const {inputTypeJson, classForParentDiv, selectedValue, disabled, divWrapperNeeded} = this.props
    if (inputTypeJson && typeof inputTypeJson === 'object') {
      const type = inputTypeJson.inputProps && inputTypeJson.inputProps.type
      if (divWrapperNeeded) {
        return (
          <div className={classForParentDiv || ''}>
            <RenderForm {...inputTypeJson} selectedValue={selectedValue} handleSubmit={type === 'submit' ? this.handleSubmit : undefined} disabled={disabled} />
          </div>
        )
      } else {
        return (
          <RenderForm {...inputTypeJson} selectedValue={selectedValue} handleSubmit={type === 'submit' ? this.handleSubmit : undefined} disabled={disabled} />
        )
      }
    } else {
      return null
    }
  }
}
