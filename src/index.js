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
    const { labelProps } = this.props
    let labelInputProps, label
    if (labelProps) {
      labelInputProps = labelProps.inputProps
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
    const { errorProps } = this.props
    let errorMsgProps, errorMsgParagraphProps
    if (errorProps) {
      errorMsgProps = errorProps.errorMsgProps
      errorMsgParagraphProps = errorProps.errorMsgParagraphProps
    }

    if (this.state.errorMsg) {
      return (
        <span {...errorMsgProps}>
          <p {...errorMsgParagraphProps}>{this.state.errorMsg}</p>
        </span>
      )
    }
    return null
  }

  checkValidations(value, checkValidation) {
    const { validationsToCheck } = this.props
    let isValidFormat
    if (Array.isArray(validationsToCheck) && validationsToCheck.length > 0 && checkValidation) {
      validationsToCheck.some(item => {
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
    const { checkValidationOnBlur, onBlur } = this.props
    this.checkValidations(this.state.value, checkValidationOnBlur)
    if (typeof onBlur === 'function') {
      this.props.onBlur(e)
    }
  }

  handleOnChange(e) {
    const { checkValidationOnChange, onAfterChange } = this.props
    /**
     * Todo: we need to discuss the name of method will it be onAfterChange or onChange
     */
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
    const { isRedux, inputProps, renerLabelAfterInput, optionProps } = this.props
    let type, selectedValue, options, optionInputProps
    if (inputProps) {
      type = inputProps.type
      selectedValue = inputProps.selectedValue
    }
    if (optionProps) {
      options = optionProps.options
      optionInputProps = optionProps.inputProps
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
        const {ariaDescribedBy} = this.props
        let propsForAriaDescribedBy, ariaDescribedByMsg
        if (ariaDescribedBy) {
          propsForAriaDescribedBy = ariaDescribedBy.inputProps
          ariaDescribedByMsg = ariaDescribedBy.ariaDescribedByMsg
        }
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
              <option key={`${inputProps.id}${idx}`} value={item.value} aria-label={ariaLabel} {...optionInputProps}>
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
            {ariaDescribedBy && ariaDescribedByMsg && <span {...propsForAriaDescribedBy}>{ariaDescribedBy.ariaDescribedByMsg}</span>}
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
