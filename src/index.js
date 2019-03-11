import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RenderForm from './RenderForm'

export default class FormHOC extends Component {
  static propTypes = {
    selectedValue: PropTypes.string,
    inputTypeJson: PropTypes.object
  }

  static defaultProps = {
    selectedValue: '',
    inputTypeJson: {}
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
    const {inputTypeJson, classForParentDiv, selectedValue} = this.props
    if (inputTypeJson && typeof inputTypeJson === 'object') {
      const type = inputTypeJson.inputProps && inputTypeJson.inputProps.type
      return (
        <div className={classForParentDiv || ''}>
          <RenderForm {...inputTypeJson} selectedValue={selectedValue} handleSubmit={type === 'submit' ? this.handleSubmit : undefined} />
        </div>
      )
    } else {
      return null
    }
  }
}
