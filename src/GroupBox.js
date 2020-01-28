import React from 'react'
import PropTypes from 'prop-types'
import DefaultErrorComponent from './DefaultErrorComponent'
let parentId = 0
export default class GroupBox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      error: false
    }
    this.onSubmitCallBack = this.onSubmitCallBack.bind(this)
    this.getParentId = this.getParentId.bind(this)
    this.getChildrenWithProps = this.getChildrenWithProps.bind(this)
    this.getType = this.getType.bind(this)
    this.displayError = this.displayError.bind(this)
    this.parentId = ''
  }
  onSubmitCallBack(formObj, childrenObj) {
    const {inputTypeJson} = this.props
    const {errorProps, minimumRequired} = inputTypeJson || {}
    const {errorMsg} = errorProps

    let ticked = 0
    const currentParentObj = childrenObj[this.parentId]
    const keys = Object.keys(currentParentObj)
    keys.map(key => {
      if (currentParentObj[key].checked) {
        ticked++
      }
    })
    if (!ticked || ticked < minimumRequired) {
      this.setState({error: true})
      keys.forEach(key => {
        formObj[key].error = true
        formObj[key].errorMsg = errorMsg
      })
    } else {
      keys.forEach(key => {
        formObj[key].error = false
        formObj[key].errorMsg = ''
      })
      this.setState({error: false})
    }
    return formObj
  }
  getParentId() {
    return ++parentId
  }
  componentWillMount() {
    this.parentId = `group${this.getParentId()}`
  }
  componentWillUnMount() {
    parentId = 0
  }
  getChildrenWithProps(props, parentElement) {
    const {children} = props
    let updateChild
    let childElement
    if (Array.isArray(children)) {
      const updateChildren = children.map(item => {
        const type = this.getType(item.props)
        if (type === 'checkbox' || type === 'radio') {
          updateChild = React.cloneElement(item, {onSubmitCallBack: this.onSubmitCallBack, parentId: this.parentId})
        } else if (item.props.children) {
          childElement = this.getChildrenWithProps(item.props)
          updateChild = React.cloneElement(item, {children: childElement})
        }
        return updateChild
      })
      return updateChildren
    } else if (children) {
      const childType = this.getType(children.props)
      let subLevelChild
      if (childType === 'checkbox' || childType === 'radio') {
        return React.cloneElement(children, {onSubmitCallBack: this.onSubmitCallBack, parentId: this.parentId})
      } else if (children.props && children.props.children) {
        subLevelChild = this.getChildrenWithProps(children.props)
        return React.cloneElement(children, {children: subLevelChild})
      } else {
        return children
      }
    }
  }
  getType(props) {
    const inputTypeJson = props && props.inputTypeJson
    const inputProps = inputTypeJson && inputTypeJson.inputProps
    const type = inputProps && inputProps.type
    return type
  }
  displayError() {
    const {inputTypeJson} = this.props
    const {errorMsg, ErrorComponent} = inputTypeJson && inputTypeJson.errorProps

    if (ErrorComponent) {
      return <ErrorComponent />
    }
    return (
      <DefaultErrorComponent >{errorMsg}</DefaultErrorComponent>
    )
  }
  render() {
    const {error} = this.state
    const {inputTypeJson} = this.props
    let errorProps
    if (inputTypeJson) {
      errorProps = inputTypeJson.errorProps
    }
    const {renderErrorMsgAfterInput} = errorProps || true

    const updateChildren = this.getChildrenWithProps(this.props)
    return (
      <>
        {!renderErrorMsgAfterInput && error && this.displayError()}
        {updateChildren}
        {renderErrorMsgAfterInput && error && this.displayError()}
      </>
    )
  }
}

GroupBox.propTypes = {
  inputTypeJson: PropTypes.object
}
