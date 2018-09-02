import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import {checkRegex} from './validation'

export default class formHoc extends PureComponent {
  static propTypes = {
    isRedux: PropTypes.bool,
    inputProps: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      value: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.checkValidations = this.checkValidations.bind(this)
  }

  checkValidations(value, checkValidation) {
    const {inputProps} = this.props
    let isError
    const {validationsToCheck} = inputProps
    if (Array.isArray(validationsToCheck) && validationsToCheck.length > 0 && checkValidation) {
      validationsToCheck.some(item => {
        const {regexVal, errorVal} = item
        isError = checkRegex(regexVal, value)
        if (isError) {
          this.setState({
            errorMsg: errorVal
          })
          return true
        }
        return false
      })
    }
  }

  handleOnBlur(e) {
    const {inputProps} = this.props
    const {checkValidationOnBlur, onBlur} = {inputProps}
    this.checkValidations(this.state.value, checkValidationOnBlur)
    if (typeof onBlur === 'function') {
      this.props.onBlur(e)
    }
  }

  handleOnChange(e) {
    const {inputProps} = this.props
    const {onChange, getValue, checkValidationOnError} = inputProps
    this.setState({
      value: e.target.value
    })
    this.checkValidations(e.target.value, checkValidationOnError)
    /**
    * you guyz don't need to check for the value
    * call only if you need business logic on this function
    * but for validation find a regex or develop a one
    */
    if (typeof onChange === 'function') {
      this.props.onChange(e)
    }
    // please take value from this call back
    if (typeof getValue === 'function') {
      this.props.getValue(e.target.value)
    }
  }

  render() {
    const {isRedux, inputProps} = this.props
    const {classNameForErrorSpan, classNameForErrorSpanParagraph} = inputProps
    const {type} = inputProps
    /**
     * isRedux will check that is Application using Redux or not
     */
    if (isRedux && type) {
      return null
    } else if (type) {
      if (type !== 'select') {
        return (
          <Fragment>
            <input
              {...inputProps}
              onChange={(e) => { this.handleOnChange(e) }}
              onBlur={(e) => { this.handleOnBlur(e) }}
            />
            <span className={classNameForErrorSpan}>
              <p className={classNameForErrorSpanParagraph}>{this.state.errorMsg}</p>
            </span>
          </Fragment>
        )
      }
      if (type === 'select') {
        const {options, selectedValue} = inputProps
        let optionsVal
        if (Array.isArray(options)) {
          optionsVal = optionsVal.map(item => {
            return (
              <option value={item.value}>
                {item.label}
              </option>
            )
          })
        }
        return (
          <Fragment>
            <select value={selectedValue}>
              {optionsVal}
            </select>
          </Fragment>
        )
      } else {
        return (
          <div>
            <p>type is not defined</p>
          </div>
        )
      }
    }
  }
}
