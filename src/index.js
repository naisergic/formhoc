import React, { Component } from 'react'
import RenderForm from './RenderForm'

export default class FormHOC extends Component {
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
    const {formJson, classForParentDiv} = this.props
    if (Array.isArray(formJson) && formJson.length > 0) {
      return formJson.map(item => {
        let type = ''
        if (item.inputProps) {
          type = item.inputProps.type
        }
        return (
          <div className={classForParentDiv || ''}>
            <RenderForm {...item} handleSubmit={type === 'submit' ? this.handleSubmit : undefined} />
          </div>
        )
      })
    } else {
      return null
    }
  }
}
