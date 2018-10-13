import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { checkRegex } from './validation'

export default class FormHOC extends Component {
  /**
   * @property propTypes
   * @description Defined property types for component
   */
  static propTypes = {
    isRedux: PropTypes.bool,
    renerLabelAfterInput: PropTypes.bool,
    inputProps: PropTypes.object,
    optionprops: PropTypes.object,
    options: PropTypes.array
  }

  /**
   * @property defaultProps
   * @description defining defaultProps of the component
   */
  static defaultProps = {
    renerLabelAfterInput: false,
    isRedux: false,
    inputProps: {
      onAfterChange: () => { },
      onAfterBlur: () => { },
      checkvalidationonchange: false,
      checkValidationOnBlur: true,
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
  }

  /**
   * @function renderLabel
   * @description function to render label of input element
   */
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

  /**
   * @function renderErrorMsg
   * @description function to render error message on input element
   */
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

  /**
   * @function checkValidations
   * @description function to check the validation for the regex passed
   * @param {string} value  value of the element
   * @param {string} checkValidation prop to whether to check validation or not
   * @returns
   */
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

  /**
   * @function handleOnBlur
   * @description handle blur event on input
   * @param {*} e event
   */
  handleOnBlur(e) {
    const { checkValidationOnBlur, onAfterBlur } = this.props
    this.checkValidations(this.state.value, checkValidationOnBlur)
    if (typeof onAfterBlur === 'function') {
      onAfterBlur(e)
    }
  }

  /**
   * @function handleOnChange
   * @description handle change event on input
   * @param {*} e event
   */
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
     * callback function just in case user needs to perform
     * any function on change
     */
    if (typeof onAfterChange === 'function') {
      onAfterChange(e)
    }
  }

  /**
   * Render Input Elements
   * @param {Object} props
   */
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
        const { ariaDescribedBy } = this.props
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
