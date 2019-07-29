# nform

> it is a HOC for all of the form input type it will handle error and also maintain the state of every form input type

[![NPM](https://img.shields.io/npm/v/formhoc.svg)](https://www.npmjs.com/package/formhoc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save nform
```

## Usage

```jsx
const ErrorComponet = (props)=>{
  return <span class="errorMsg">{props.children}</span>
}

export const submitButton = {
  inputProps: {
    type: 'submit',
    id: 'submitBtn',
    value: 'Submit'
  },
  onAfterSubmit: undefined
};

export const firstName = {
  inputProps: {
    type: 'input',
    required: true,
  },
  labelProps: {
    label: 'First Name',
    inputProps: { className: "labels", id: "firstNameLabel" }
  },
  errorWrapper: ErrorComponet,
  validationsToCheck: [
    {
      regexToCheck: /^[a-zA-Z]+$/,
      errorMsg: 'Invalid First Name, Must be 2 Characters long'
    }
  ],
  renderLabelAfterInput: true,
  checkValidationOnBlur: true
}

export const lastName = {
  inputProps: {
    type: 'input',
    required: true,
  },
  labelProps: {
    label: 'Last Name',
    inputProps: { className: "labels", id: "lastNameLabel" }
  },
  errorWrapper: ErrorComponet,
  validationsToCheck: [
    {
      regexToCheck: /[a-zA-Z]{2}/,
      errorMsg: 'Invalid last Name, Must be 4 Characters long'
    }
  ],
  renderLabelAfterInput: true,
  checkValidationOnBlur: true
}

export const email = {
  inputProps: {
    type: 'email',
    required: true,
  },
  labelProps: {
    label: 'Email',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper: ErrorComponet,
  validationsToCheck: [
    {
      regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      errorMsg: 'Invalid Email Format'
    }
  ],
  renderLabelAfterInput: true,
  checkValidationOnBlur: true
}
export const password = {
  inputProps: {
    type: 'password',
    required: true,
  },
  labelProps: {
    label: 'Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper: ErrorComponet,
  validationsToCheck: [
    {
      regexToCheck: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      errorMsg: 'Invalid Password'
    }
  ],
  renderLabelAfterInput: true,
  checkValidationOnBlur: true,
  confirmMatchTo: {
    id: "confirmPassword",
    hideErrorComponent: true,
    checkValidationOnBlur: true,
    hideErrorComponent: true,
  }
}

export const confirmPassword = {
  inputProps: {
    type: 'password',
    required: true,
  },
  labelProps: {
    label: 'Confirm Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper:  ErrorComponet,
  confirmMatchWith: {
    id: "confirmPassword",
    errorMsg: "Password Doesn't Match",
    ErrorComponent: ErrorComponet,
    checkValidationOnBlur: true,
  },
  renderLabelAfterInput: true,
}
export const password1 = {
  inputProps: {
    type: 'password',
    required: true,
  },
  labelProps: {
    label: 'Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper:  ErrorComponet,
  validationsToCheck: [
    {
      regexToCheck: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/,
      errorMsg: 'Invalid Password'
    }
  ],
  renderLabelAfterInput: true,
  checkValidationOnBlur: true,
  confirmMatchTo: {
    id: "confirmPassword1",
    hideErrorComponent: true,
    checkValidationOnBlur: true,
    hideErrorComponent: true,
  }
}

export const confirmPassword1 = {
  inputProps: {
    type: 'password',
    required: true,
  },
  labelProps: {
    label: 'Confirm Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper: ErrorComponet,
  confirmMatchWith: {
    id: "confirmPassword1",
    errorMsg: "Password Doesn't Match",
    ErrorComponent: ErrorComponet,
    checkValidationOnBlur: true,
  },
  renderLabelAfterInput: true,
}

export const dropdown = {
  inputProps: {
    type: 'select',
    id: "select1"
  },
  labelProps: {
    label: 'Country:',
    inputProps: { className: "labels", id: "countryLabel" }
  },
  optionProps: {
    options: [{ value: "IN", label: "INDIA" }, { value: "US", label: "USA" }],
    inputProps: { className: "options" }
  },
  ariaDescribedBy: {
    ariaDescribedByMsg: "list of country",
    inputProps: {
      className: "hide",
      id: "ariaDescribedForCountry"
    }
  }
}



import React, { Component } from 'react'
import { FormInput, ReactForm } from 'nform'
import './index.css'
import {firstName,lastName,email,password, confirmPassword, submitButton,password1,confirmPassword1} from './FormJson';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e,formObj,errorObj,isError){
    /**
     * you can write
     * your logic here
     */
    console.log(isError);
  }
  render() {
    return (
      <React.Fragment>
        <ReactForm onSubmit={this.handleSubmit} inputProps={{className:"form1",name:"form1"}}>
          <div className="mb5">
            <FormInput inputTypeJson={firstName}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={lastName}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={email}  checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={password1}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={confirmPassword1} />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={submitButton}/>
          </div>
        </ReactForm>

        <ReactForm onSubmit={this.handleSubmit} inputProps={{className:"form1",name:"form1"}}>
          <div className="mb5 relative">
            <FormInput inputTypeJson={firstName}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={lastName}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={email}  checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={password}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={confirmPassword} />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={submitButton}/>
          </div>

        </ReactForm>

      </React.Fragment>
    );
  }
}

```

## License

y © [Naisergic](https://github.com/Naisergic)
y © [Ayush-krishnatray](https://github.com/Ayush-krishnatray)
