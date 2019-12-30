import React from 'react'
import PropTypes from 'prop-types'
import {FormProvider} from './context'

class ReactForm extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleConfirmationError = this.handleConfirmationError.bind(this)
    this.parseFormObj = this.parseFormObj.bind(this)
    this.createContextObj = this.createContextObj.bind(this)
    this.radioHandler = this.radioHandler.bind(this)
    this.state = {
      obj: {
        submitHandle: this.handleFormSubmit,
        handleConfirmationError: this.handleConfirmationError,
        radioHandler: this.radioHandler
      }
    }
  }
  handleFormSubmit(e, formObj, error) {
    const {onSubmit} = this.props
    const {errorObj, formValueObj} = this.parseFormObj(formObj)
    this.createContextObj(errorObj)
    if (onSubmit && typeof onSubmit === 'function') {
      onSubmit(e, formValueObj, errorObj, error)
    }
  }
  handleConfirmationError(formObj) {
    const {errorObj} = this.parseFormObj(formObj)
    this.createContextObj(errorObj)
  }
  parseFormObj(formObj) {
    let errorObj = {}
    let formValueObj = {}
    const keys = Object.keys(formObj)
    if (Array.isArray(keys)) {
      keys.some(key => {
        formValueObj = Object.assign({}, formValueObj, {[key]: {}})
        formValueObj[key].value = formObj[key].value
        if (formObj[key].error || formObj[key].confirmError) {
          errorObj = Object.assign({}, errorObj, {[key]: {}})
          errorObj[key].error = formObj[key].error
          errorObj[key].errorMsg = formObj[key].errorMsg
        }
      })
    }
    return {errorObj, formValueObj}
  }
  createContextObj(errorObj) {
    if (errorObj && Object.keys(errorObj).length > 0) {
      errorObj.submitHandle = this.handleFormSubmit
      errorObj.handleConfirmationError = this.handleConfirmationError
      errorObj.radioHandler = this.radioHandler
      this.setState({
        obj: errorObj
      })
    } else {
      this.setState({
        obj: {
          submitHandle: this.handleFormSubmit,
          handleConfirmationError: this.handleConfirmationError,
          radioHandler: this.radioHandler
        }
      })
    }
  }
  radioHandler(id, value) {
    this.createContextObj()
  }
  render() {
    const {children, inputProps} = this.props
    return (
      <FormProvider value={this.state.obj}>
        <form {...inputProps} onSubmit={(e) => { this.handleFormSubmit(e) }}>{children}</form>
      </FormProvider>

    )
  }
}

ReactForm.propTypes = {
  children: PropTypes.any,
  inputProps: PropTypes.any,
  onSubmit: PropTypes.func
}

export default ReactForm
