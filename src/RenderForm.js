import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import FormContext from './context'
import DefaultErrorComponent from './DefaultErrorComponent'
import { checkRegex } from './validation'

let formObj = {}
let confirmObj = {
  confirmTo: {},
  confirmWith: {}
}
let index = 0
const defaultRadioGroup = 'radio1'

export default class RenderForm extends Component {
  /**
   * @property propTypes
   * @description Defined property types for component
   */
  static propTypes = {
    renderLabelAfterInput: PropTypes.bool,
    inputProps: PropTypes.object,
    optionProps: PropTypes.object,
    options: PropTypes.array,
    onAfterSubmit: PropTypes.func, // use this for cheking error after pressing submit button
    errorWrapper: PropTypes.element,
    formatter: PropTypes.func,
    confirmMatchWith: PropTypes.object,
    confirmMatchTo: PropTypes.object,
    checkValidationFunc: PropTypes.func,
    onChangeCallback: PropTypes.func,
    onBlurCallback: PropTypes.func,
    ariaDescribedBy: PropTypes.any,
    validationsToCheck: PropTypes.array,
    selectedValue: PropTypes.any,
    labelProps: PropTypes.any,
    checkValidationOnBlur: PropTypes.any,
    checkValidationOnChange: PropTypes.any,
    disabled: PropTypes.any,
    isUserComponent: PropTypes.bool,
    UserComponent: PropTypes.element
  }

  /**
   * @property defaultProps
   * @description defining defaultProps of the component
   */
  static defaultProps = {
    renderLabelAfterInput: false,
    inputProps: {
      checkValidationOnChange: false,
      checkValidationOnBlur: true
    },
    onChangeCallback: () => { },
    onBlurCallback: () => { }
  };

  static contextType = FormContext;

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      error: '',
      checked: false
    }
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.checkValidations = this.checkValidations.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getId = this.getId.bind(this)
    this.getRadioBoxId = this.getRadioBoxId.bind(this)
    this.id = undefined
  }

  componentWillMount() {
    const {
      inputProps,
      validationsToCheck,
      optionProps,
      confirmMatchTo,
      confirmMatchWith,
      selectedValue,
      isUserComponent
    } = this.props
    let id, type, options, optionsFirstValue, isRequired, radioBoxGroup, checked
    if (!this.context || Object.keys(this.context).length <= 0) {
      throw new Error('It uses React Context API, please upgrade React to 16.8.6 or higher')
    }
    if (inputProps) {
      type = inputProps.type
      id = inputProps.id
      isRequired = inputProps.required
      radioBoxGroup = inputProps.name
      checked = inputProps.checked
      const value = inputProps.value
      if (checked) {
        this.setState({value})
      }
    }
    if (optionProps) {
      options = optionProps.options
    }
    if (Array.isArray(options) && options.length > 0) {
      optionsFirstValue = options[0].value
    }
    this.id = id || this.getId(type, isUserComponent)
    if (type !== 'submit' && type !== 'button' && type !== 'select' && type !== 'radio') {
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
    } else if (type === 'radio') {
      let radioboxId = this.getRadioBoxId(radioBoxGroup)
      const value = checked ? inputProps.value : selectedValue
      formObj[radioboxId] = {
        validationsToCheck: validationsToCheck,
        value: this.state.value || value,
        isRequired
      }
    }
    if (confirmMatchTo) {
      confirmObj.confirmTo[`${confirmMatchTo.id}`] = {
        id: this.id,
        errorMsg: confirmMatchTo.errorMsg,
        hideErrorComponent: confirmMatchTo.hideErrorComponent
      }
    }
    if (confirmMatchWith) {
      confirmObj.confirmWith[`${confirmMatchWith.id}`] = {
        id: this.id,
        errorMsg: confirmMatchWith.errorMsg,
        hideErrorComponent: confirmMatchWith.hideErrorComponent
      }
    }
  }

  componentWillUnMount() {
    index = 0
    formObj = {}
    confirmObj = {
      confirmTo: {},
      confirmWith: {}
    }
  }

  getId(type, isUserComponent) {
    index += 1
    if (isUserComponent) {
      return `userDefined${index}`
    }
    return `${type}${index}`
  }

  getRadioBoxId(radioBoxGroup) {
    let radioGroup = radioBoxGroup || defaultRadioGroup
    return radioGroup
  }

  handleSubmit(e, submitHandle) {
    e.preventDefault()
    const keys = Object.keys(formObj)
    let error
    keys.forEach(item => {
      if (formObj[item].isRequired || formObj[item].value) {
        const checkValidation = true
        this.checkValidations(formObj[item], checkValidation)
      }
    })
    this.checkConfirmValidations()
    keys.some(item => {
      if (formObj[item].error) {
        error = true
        return true
      }
    })
    this.setState({error: error})
    if (typeof submitHandle === 'function') {
      submitHandle(e, formObj, error)
    }
  }

  /**
   * @function renderLabel
   * @description function to render label of input element
   */
  renderLabel(type) {
    const { labelProps } = this.props
    let labelInputProps, label, CustomComponent
    if (labelProps) {
      labelInputProps = labelProps.inputProps
      label = labelProps.label
      CustomComponent = labelProps.CustomComponent
    }
    if (!CustomComponent) {
      return (
        <Fragment>
          {label && <label {...labelInputProps}>
            {label}
          </label>}
        </Fragment>
      )
    }
    return (
      <Fragment>
        {CustomComponent}
      </Fragment>
    )
  }

  /**
   *
   * @param {*string} id
   * check if error is present in obj or not
   */
  checkIfError(id) {
    return formObj[id] && formObj[id].error
  }

  /**
   * @function renderErrorMsg
   * @description function to render error message on input element
   */
  renderErrorMsg(id) {
    const {errorWrapper, confirmMatchWith, confirmMatchTo} = this.props
    const confirmMatchWithErrorComponet = confirmMatchWith && confirmMatchWith.ErrorComponent
    const confirmMatchToErrorComponet = confirmMatchTo && confirmMatchTo.ErrorComponent
    let ErrorComponent = errorWrapper || DefaultErrorComponent

    if (formObj[id].confirmError && (confirmMatchWithErrorComponet || confirmMatchToErrorComponet)) {
      ErrorComponent = confirmMatchWithErrorComponet || confirmMatchToErrorComponet
    }
    if (formObj[id].hideErrorComponent) {
      return null
    }
    return (
      <ErrorComponent>
        {formObj[id].errorMsg}
      </ErrorComponent>
    )
  }

  /**
   * @function checkValidations
   * @description function to check the validation for the regex passed
   * @param {object} formObject item on which validation need to be perform
   * @param {boolean} checkValidation prop to whether to check validation or not
   * @returns
   */
  checkValidations(formObjItem = {}, checkValidation) {
    const {checkValidationFunc} = this.props
    const validationArray = formObjItem.validationsToCheck
    let isValidFormat
    if (Array.isArray(validationArray) && validationArray.length > 0 && checkValidation) {
      validationArray.some(item => {
        const { regexToCheck, errorMsg } = item
        isValidFormat = checkRegex(regexToCheck, formObjItem.value)
        if (!isValidFormat) {
          formObjItem.errorMsg = errorMsg
          formObjItem.error = true
          return true
        }
        formObjItem.errorMsg = ''
        formObjItem.error = false
        return false
      })
    }
    if (checkValidation && typeof checkValidationFunc === 'function' && !formObjItem.error) {
      let errorObj = checkValidationFunc(formObjItem.value)
      if (errorObj && errorObj.isError) {
        formObjItem.errorMsg = errorObj.errorMsg
        formObjItem.error = true
      }
      formObjItem.errorMsg = ''
      formObjItem.error = false
    }
  }

  checkConfirmValidations(id) {
    const keys = Object.keys(confirmObj.confirmTo)

    keys.some(key => {
      const toId = confirmObj.confirmTo[key].id
      const toErrorMsg = confirmObj.confirmTo[key].errorMsg
      const withId = confirmObj.confirmWith[key].id
      const withErrorMsg = confirmObj.confirmWith[key].errorMsg
      if (id) {
        if (id === toId) {
          this.checkAndSetError(id, toId, withId, toErrorMsg)
          this.checkConfirmValidations(withId)
        } else if (id === withId) {
          this.checkAndSetError(id, toId, withId, withErrorMsg)
          this.checkValidations(formObj[toId], true)
        }
        this.context.handleConfirmationError(formObj)
        return true
      } else {
        this.checkAndSetError(toId, toId, withId, toErrorMsg)
        this.checkAndSetError(withId, toId, withId, withErrorMsg)
      }
    })
  }

  checkAndSetError(id, toId, withId, errorMsgs, allowNullValue = false) {
    if ((!formObj[id].error || formObj[id].confirmError) && ((!allowNullValue && !formObj[id].value) || formObj[toId].value !== formObj[withId].value)) {
      formObj[id].error = true
      formObj[id].confirmError = true
      formObj[id].errorMsg = errorMsgs
      this.forceUpdate()
    } else if (formObj[id].confirmError) {
      formObj[id].error = false
      formObj[id].confirmError = false
      formObj[id].errorMsg = ''
      this.forceUpdate()
    }
  }
  /**
   * @function handleOnBlur
   * @description handle blur event on input
   * @param {*} e event
   */
  handleOnBlur(e) {
    const {checkValidationOnBlur, onBlurCallback, confirmMatchTo, confirmMatchWith} = this.props
    const id = e.target.id
    this.checkValidations(formObj[id], checkValidationOnBlur)
    if ((confirmMatchTo && confirmMatchTo.checkValidationOnBlur) || (confirmMatchWith && confirmMatchWith.checkValidationOnBlur)) {
      this.checkConfirmValidations(id)
    }
    if (typeof onBlurCallback === 'function') {
      onBlurCallback(e)
    }
  }

  /**
   * @function handleOnChange
   * @description handle change event on input
   * @param {*} e event
   */
  handleOnChange(e, type) {
    const { checkValidationOnChange, onChangeCallback, formatter, confirmMatchTo, confirmMatchWith } = this.props
    /**
     * Todo: we need to discuss the name of method will it be onChangeCallback or onChange
     */
    let value = e.target.value
    let id = e.target.id
    if (formatter) {
      value = formatter(e.target.value)
    }
    if (type === 'checkbox' || type === 'radio') {
      value = e.target.checked ? value : ''
      this.setState({
        checked: e.target.checked
      })
    }

    this.setState({
      value: value
    })

    if (type === 'radio') {
      id = e.target.name || defaultRadioGroup
    }

    if (formObj[id]) {
      formObj[id].value = value
    }

    this.checkValidations(formObj[id], checkValidationOnChange)
    if ((confirmMatchTo && confirmMatchTo.checkValidationOnChange) || (confirmMatchWith && confirmMatchWith.checkValidationOnChange)) {
      this.checkConfirmValidations(id)
    }
    /**
     * callback function just in case user needs to perform
     * any function on change
     */
    if (typeof onChangeCallback === 'function') {
      onChangeCallback(e)
    }
    if (type === 'radio') {
      this.context.radioHandler(id, value)
    }
  }

  /**
   * Render Input Elements
   * @param {Object} props
   */
  render() {
    const { inputProps, renderLabelAfterInput, optionProps, selectedValue, disabled,
      isUserComponent, UserComponent } = this.props
    let type, options, optionInputProps, classes, isError, value, radioBoxGroup

    if (inputProps) {
      isError = this.checkIfError(this.id)
      type = inputProps.type
      classes = inputProps.class ? inputProps.class : ''
      classes = isError ? `${classes} error` : classes
      value = inputProps.value
      radioBoxGroup = inputProps.name || defaultRadioGroup
    }
    if (optionProps) {
      options = optionProps.options
      optionInputProps = optionProps.inputProps
    }

    if (isUserComponent) {
      return (
        <Fragment>
          <UserComponent id={this.id} onBlur={(e) => { this.handleOnBlur(e) }} onChange={(e) => { this.handleOnChange(e) }} />
        </Fragment>
      )
    }

    if (type) {
      if (type !== 'select' && type !== 'submit' && type !== 'radio' && type !== 'checkbox') {
        return (
          <Fragment>
            {!renderLabelAfterInput && this.renderLabel(type)}
            <input
              id={this.id}
              {...inputProps}
              className={`${classes}`}
              disabled={disabled}
              onChange={(e) => { this.handleOnChange(e, type) }}
              onBlur={(e) => { this.handleOnBlur(e) }}
              value={this.state.value || selectedValue || value}
            />
            {renderLabelAfterInput && this.renderLabel(type)}
            {isError && this.renderErrorMsg(this.id)}
          </Fragment>
        )
      }
      if (type === 'radio' || type === 'checkbox') {
        let checkedValue;
        if (type === 'radio') {
          checkedValue = formObj[radioBoxGroup].value !== '' && formObj[radioBoxGroup].value === this.state.value
        } else {
          checkedValue = this.state.checked
        }
        
        const classesToApply = checkedValue ? `${classes} checked` : classes
        return (
          <Fragment>
            {!renderLabelAfterInput && this.renderLabel(type)}
            <input
              id={this.id}
              {...inputProps}
              className={`${classesToApply}`}
              disabled={disabled}
              onChange={(e) => { this.handleOnChange(e, type) }}
              value={this.state.value || selectedValue || value}
              checked={checkedValue}
            />
            {renderLabelAfterInput && this.renderLabel(type)}
            {isError && this.renderErrorMsg(this.id)}
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
            {!renderLabelAfterInput && this.renderLabel()}
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
            {renderLabelAfterInput && this.renderLabel()}
            {this.renderErrorMsg(this.id)}
          </Fragment>
        )
      }
      if (type === 'submit') {
        return (
          <input
            {...inputProps}
            onClick={(e) => { this.handleSubmit(e, this.context.submitHandle) }}
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
