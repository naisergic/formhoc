import React from 'react'
import PropTypes from 'prop-types'
import RenderForm from './RenderForm'

const propTypes = {
  selectedValue: PropTypes.string,
  inputTypeJson: PropTypes.object,
  disabled: PropTypes.bool,
  checkValidationFunc: PropTypes.func,
  onChangeCallback: PropTypes.func,
  onBlurCallback: PropTypes.func,
  formatter: PropTypes.func,
  onSubmitCallBack: PropTypes.func.isRequired,
  parentId: PropTypes.string.isRequired
}

const defaultProps = {
  selectedValue: '',
  inputTypeJson: {},
  disabled: false
}

const FormInput = props => {
  const {
    inputTypeJson,
    selectedValue,
    disabled,
    checkValidationFunc,
    onChangeCallback,
    onBlurCallback,
    formatter,
    onSubmitCallBack,
    parentId
  } = props

  if (inputTypeJson && typeof inputTypeJson === 'object') {
    return (
      <RenderForm
        {...inputTypeJson}
        selectedValue={selectedValue}
        disabled={disabled}
        checkValidationFunc={checkValidationFunc}
        onChangeCallback={onChangeCallback}
        onBlurCallback={onBlurCallback}
        formatter={formatter}
        onSubmitCallBack={onSubmitCallBack}
        parentId={parentId}
      />
    )
  } else {
    return null
  }
}

FormInput.propTypes = propTypes
FormInput.defaultProps = defaultProps

export default FormInput
