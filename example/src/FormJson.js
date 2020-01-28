import ErrorComponet from './ErrorComponent';
import CheckBoxLabel from './CheckBoxLabel';
import DateComponent from './DateComponent';

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
    inputProps: { className: "label", id: "firstNameLabel" }
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
    inputProps: { className: "label", id: "lastNameLabel" }
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
    inputProps: { className: "label", id: "emailLabel" }
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
    inputProps: { className: "label", id: "emailLabel" }
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
    inputProps: { className: "label", id: "emailLabel" }
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
    inputProps: { className: "label", id: "emailLabel" }
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
    inputProps: { className: "label", id: "emailLabel" }
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
    inputProps: { className: "label", id: "countryLabel" }
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

export const checkBoxes1 = {
  inputProps:{
    type:"checkbox",
    name:"Dog",
    value:"Dog",
    id:'Dog',
    required:true
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('Dog', 'Dog'),
  }
}

export const checkBoxes2 = {
  inputProps:{
    type:"checkbox",
    name:"Cat",
    value:"Cat",
    id:'Cat',
    required:true
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('Cat','Cat'),
  }
}

export const checkBoxes3 = {
  inputProps:{
    type:"checkbox",
    name:"Rat",
    value:"Rat",
    id:'Rat',
    required:true
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('Rat','Rat'),
  }
}

export const checkBoxGroupError = {
minimumRequired:2,
errorProps:{
  errorMsg:"Please tick any two checkboxes",
  ErrorComponent:null,
  renderErrorMsgAfterInput:true,
  },
}

export const radioBoxGroupError = {
minimumRequired:1,
errorProps:{
  errorMsg:"Please tick any radiobox",
  ErrorComponent:null,
  renderErrorMsgAfterInput:true,
  },
}

export const radioBox1 = {
  inputProps: {
    type:"radio",
    name:"group1",
    value:"male",
    id:"male"
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('male','Male'),
  }
}

export const radioBox2 = {
  inputProps: {
    type:"radio",
    name:"group1",
    value:"female",
    id:"female"
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('female','Female'),
  }
}

export const radioBox3 = {
  inputProps: {
    type:"radio",
    name:"group2",
    value:"male"
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('Male'),
  }
}

export const radioBox4 = {
  inputProps: {
    type:"radio",
    name:"group2",
    value:"female",
    checked:true
  },
  renderLabelAfterInput:true,
  labelProps:{
    CustomComponent: CheckBoxLabel('Female'),
  }
}

export const custom = {
  UserComponent: DateComponent,
  isUserComponent: true,
  validationsToCheck:[
    {
      regexToCheck:/^(?!\s*$).+/,
      errorMsg:'Please Select Date'
    }],
  checkValidationOnBlur: true,
  checkValidationFunc: ()=>{},
  inputProps: {
    required: true
  }
}