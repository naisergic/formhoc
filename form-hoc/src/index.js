import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { checkRegex } from './validation'

export default class formHoc extends PureComponent {
  static propTypes = {
    isRedux: PropTypes.bool,
    renerLabelAfterInput: PropTypes.bool,
    inputProps: PropTypes.object
  }

  static defaultProps = {
    renerLabelAfterInput: false,
    isRedux: false,
    inputProps: {
      onAfterChange : () => {},
      getValue: () => {},
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      errorMsg: '',
      value: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.checkValidations = this.checkValidations.bind(this)
    this.renderErrorMsg = this.renderErrorMsg.bind(this)
    this.renderLabel = this.renderLabel.bind(this)
  }

  renderLabel() {
    const { inputProps } = this.props
    const { labelProps } = inputProps
    const { labelInputProps, label } = labelProps
    return (
      <Fragment>
        {label && <label {...labelInputProps}>
          {label}
        </label>}
      </Fragment>
    )
  }

  renderErrorMsg() {
    const { inputProps } = this.props
    const { classNameForErrorSpan, classNameForErrorSpanParagraph } = inputProps
    if (this.state.errorMsg) {
      return (
        <span className={classNameForErrorSpan}>
          <p className={classNameForErrorSpanParagraph}>{this.state.errorMsg}</p>
        </span>
      )
    }
    return null
  }

  checkValidations(value, checkValidation) {
    const { inputProps } = this.props
    let isError
    const { validationsToCheck } = inputProps
    if (Array.isArray(validationsToCheck) && validationsToCheck.length > 0 && checkValidation) {
      validationsToCheck.some(item => {
        const { regexVal, errorVal } = item
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
    const { inputProps } = this.props
    const { checkValidationOnBlur, onBlur } = { inputProps }
    this.checkValidations(this.state.value, checkValidationOnBlur)
    if (typeof onBlur === 'function') {
      this.props.onBlur(e)
    }
  }

  handleOnChange(e) {
    const { inputProps } = this.props
    const { onAfterChange, getValue, checkValidationOnChange } = inputProps
    this.setState({
      value: e.target.value
    })
    this.checkValidations(e.target.value, checkValidationOnChange)
    /**
     * you guyz don't need to check for the value
     * call only if you need business logic on this function
     * but for validation find a regex or develop a one
     */
    if (typeof onAfterChange === 'function') {
      onAfterChange(e)
    }
    /**
     * please catch value from this call back
     */
    if (typeof getValue === 'function') {
      getValue(e.target.value)
    }
  }

  render() {
    const { isRedux, inputProps, renerLabelAfterInput } = this.props

    const { type, selectedValue } = inputProps

    /**
     * isRedux will check that is Application using Redux or not
     */
    if (isRedux && type) {
      return null
    } else if (type) {
      if (type !== 'select') {
        return (
          <Fragment>
            {!renerLabelAfterInput && this.renderLabel()}
            <input
              {...inputProps}
              onChange={(e) => { this.handleOnChange(e) }}
              onBlur={(e) => { this.handleOnBlur(e) }}
              value={this.state.value || selectedValue}
            />
            {renerLabelAfterInput && this.renderLabel()}
            {this.renderErrorMsg()}
          </Fragment>
        )
      }
      if (type === 'select') {
        const { options } = inputProps
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
            {!renerLabelAfterInput && this.renderLabel()}
            <select
              {...inputProps}
              onChange={(e) => { this.handleOnChange(e) }}
              onBlur={(e) => { this.handleOnBlur(e) }}
              value={this.state.vlaue || selectedValue}
            >
              {optionsVal}
            </select>
            {renerLabelAfterInput && this.renderLabel()}
            {this.renderErrorMsg()}
          </Fragment>
        )
      }
    } else {
      return (
        <div>
          <p>type is not defined</p>
        </div>
      )
    }
  }
}
