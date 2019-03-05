import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { checkRegex } from './validation'

let formObj = {}
let index = 0
export default class RenderForm extends Component {
  /**
   * @property propTypes
   * @description Defined property types for component
   */
  static propTypes = {
    isRedux: PropTypes.bool,
    renerLabelAfterInput: PropTypes.bool,
    inputProps: PropTypes.object,
    optionprops: PropTypes.object,
    options: PropTypes.array,
    onAfterClick: PropTypes.func
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
      checkValidationOnChange: false,
      checkValidationOnBlur: true
    }
  };

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      error: ''
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.checkValidations = this.checkValidations.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getId = this.getId.bind(this)
    this.id = undefined
  }

  componentWillMount() {
    const {inputProps, validationsToCheck, optionProps} = this.props
    let id, type, selectedValue, options, optionsFirstValue, isRequired
    if (inputProps) {
      type = inputProps.type
      selectedValue = inputProps.selectedValue
      id = inputProps.id
      isRequired = inputProps.required
    }
    if (optionProps) {
      options = optionProps.options
    }
    if (Array.isArray(options) && options.length > 0) {
      optionsFirstValue = options[0].value
    }
    this.id = id || this.getId(type)
    if (type !== 'submit' && type !== 'button' && type !== 'select') {
      formObj[this.id] = {
        validationsToCheck: validationsToCheck,
        value: this.state.value || selectedValue,
        isRequired
      }
    } else if (type === 'select') {
      formObj[this.id] = {
        validationsToCheck: validationsToCheck,
        value: this.state.value || selectedValue || optionsFirstValue,
        isRequired
      }
    }
  }

  componentWillUnMount() {
    index = 0
    formObj = {}
  }

  getId(type) {
    index += 1
    return `${type}${index}`
  }

  handleSubmit(e) {
    const {onAfterSubmit, handleSubmit} = this.props
    const keys = Object.keys(formObj)
    let error
    keys.forEach(item => {
      if (formObj[item].isRequired || formObj[item].value) {
        const checkValidation = true
        this.checkValidations(formObj[item].value, checkValidation, formObj[item].validationsToCheck, formObj[item])
      }
    })
    keys.some(item => {
      if (formObj[item].error) {
        error = true
        return true
      }
    })
    this.setState({error: error})
    handleSubmit(e, error)
    if (typeof onAfterSubmit === 'function') {
      onAfterSubmit(e, error)
    }
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
  renderErrorMsg(id) {
    const { errorProps } = this.props
    let errorMsgProps, errorMsgParagraphProps
    if (errorProps) {
      errorMsgProps = errorProps.errorMsgProps
      errorMsgParagraphProps = errorProps.errorMsgParagraphProps
    }

    if (formObj[id] && formObj[id].error) {
      return (
        <span {...errorMsgProps}>
          <p {...errorMsgParagraphProps}>{formObj[id].errorMsg}</p>
        </span>
      )
    } else {
      return null
    }
  }

  /**
   * @function checkValidations
   * @description function to check the validation for the regex passed
   * @param {string} value  value of the element
   * @param {string} checkValidation prop to whether to check validation or not
   * @returns
   */
  checkValidations(value, checkValidation, validationToCheckFromObject, obj) {
    const { validationsToCheck } = this.props
    const validationArray = validationsToCheck || validationToCheckFromObject
    let isValidFormat
    if (Array.isArray(validationArray) && validationArray.length > 0 && checkValidation) {
      validationArray.some(item => {
        const { regexToCheck, errorMsg } = item
        isValidFormat = checkRegex(regexToCheck, value)
        if (!isValidFormat) {
          obj.errorMsg = errorMsg
          obj.error = true
          this.forceUpdate()
          return true
        }
        obj.errorMsg = ''
        obj.error = false
        this.forceUpdate()
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
    const id = e.target.id
    // this.checkValidations(this.state.value, checkValidationOnBlur)
    this.checkValidations(formObj[id].value, checkValidationOnBlur, formObj[id].validationsToCheck, formObj[id])
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
    const id = e.target.id
    if (formObj[id]) {
      formObj[id].value = e.target.value
    }
    // this.checkValidations(e.target.value, checkValidationOnChange)
    this.checkValidations(formObj[id].value, checkValidationOnChange, formObj[id].validationsToCheck, formObj[id])
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
      if (type !== 'select' && type !== 'submit') {
        return (
          <Fragment>
            {!renerLabelAfterInput && this.renderLabel()}
            <input
              id={this.id}
              {...inputProps}
              onChange={(e) => { this.handleOnChange(e) }}
              onBlur={(e) => { this.handleOnBlur(e) }}
              value={this.state.value || selectedValue}
            />
            {renerLabelAfterInput && this.renderLabel()}
            {this.renderErrorMsg(this.id)}
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
            {this.renderErrorMsg(this.id)}
          </Fragment>
        )
      }
      if (type === 'submit') {
        return (
          <input
            {...inputProps}
            onClick={(e) => { this.handleSubmit(e) }}
          />
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
