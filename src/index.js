import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { checkRegex } from './validation'

export default class FormHOC extends Component {
  static propTypes = {
    isRedux: PropTypes.bool,
    renerLabelAfterInput: PropTypes.bool,
    inputProps: PropTypes.object,
    optionprops: PropTypes.object,
    options: PropTypes.array
  }

  static defaultProps = {
    renerLabelAfterInput: false,
    isRedux: false,
    inputProps: {
      onAfterChange: () => {}
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
    let labelProps, labelInputProps, label
    if (inputProps) {
      labelProps = inputProps.labelprops
    }
    if (labelProps) {
      labelInputProps = labelProps.inputprops
      label = labelProps.label
    }
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
    const { errormsgprops, errormsgparagraphprops } = inputProps
    if (this.state.errorMsg) {
      return (
        <span {...errormsgprops}>
          <p {...errormsgparagraphprops}>{this.state.errorMsg}</p>
        </span>
      )
    }
    return null
  }

  checkValidations(value, checkValidation) {
    const { inputProps } = this.props
    let isValidFormat
    const { validationstocheck } = inputProps
    if (Array.isArray(validationstocheck) && validationstocheck.length > 0 && checkValidation) {
      validationstocheck.some(item => {
        const { regexToCheck, errorMsg } = item
        isValidFormat = checkRegex(regexToCheck, value)
        if (!isValidFormat) {
          this.setState({
            errorMsg: errorMsg
          })
          return true
        }
        this.setState({
          errorMsg: ''
        })
        return false
      })
    }
  }

  handleOnBlur(e) {
    const { inputProps } = this.props
    let checkValidationOnBlur, onBlur
    if (inputProps) {
      checkValidationOnBlur = inputProps.checkvalidationonblur
      onBlur = inputProps.onBlur
    }
    this.checkValidations(this.state.value, checkValidationOnBlur)
    if (typeof onBlur === 'function') {
      this.props.onBlur(e)
    }
  }

  handleOnChange(e) {
    const { inputProps } = this.props
    /**
     * Todo: we need to discuss the name of method will it be onAfterChange or onChange
     */
    const { onAfterChange, checkValidationOnChange } = inputProps
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
  }

  render() {
    const { isRedux, inputProps, renerLabelAfterInput } = this.props
    let type, selectedValue, options, optionProps
    if (inputProps) {
      type = inputProps.type
      selectedValue = inputProps.selectedValue
      options = inputProps.options
      optionProps = inputProps.optionprops
    }

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
        let optionsVal
        const propsForAriaDescribedBy = inputProps.ariadescribedby
        if (Array.isArray(options)) {
          optionsVal = options.map((item, idx) => {
            let isItemSelected
            if (selectedValue || this.state.value) {
              isItemSelected = (item.value === selectedValue || item.value === this.state.value)
            } else if (idx === 0) {
              isItemSelected = true
            }
            const ariaLabel = isItemSelected ? `Selected ${item.label}` : item.label
            return (
              <option key={`${inputProps.id}${idx}`} value={item.value} aria-label={ariaLabel} {...optionProps}>
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
              value={this.state.value || selectedValue}
              aria-describedby={`${inputProps.id}AriaDescribed`}
            >
              {optionsVal}
            </select>
            {propsForAriaDescribedBy && propsForAriaDescribedBy.ariadescribedbymsg && <span {...propsForAriaDescribedBy}>{propsForAriaDescribedBy.ariadescribedbymsg}</span>}
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
