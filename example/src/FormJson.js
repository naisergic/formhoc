import ErrorComponet from './ErrorComponent';

export const submitButton = {
  inputProps:{
    type: 'submit',
    id: 'submitBtn',
    value: 'Submit'
  },
  onAfterSubmit:undefined
};

export const firstName =   {
  inputProps : {
  type: 'input',
  required:true,
},
  labelProps:{
    label: 'First Name',
    inputProps: { className: "labels", id: "firstNameLabel" }
  },
  errorWrapper:{
    component: ErrorComponet
  },
  validationsToCheck:[
    {
      regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      errorMsg: 'Invalid Email Format'
    }
  ],
  checkValidationOnBlur:true
}

export const lastName =   {
  inputProps : {
  type: 'input',
  required:true,
},
  labelProps:{
    label: 'Last Name',
    inputProps: { className: "labels", id: "lastNameLabel" }
  },
  errorWrapper:{
    component: ErrorComponet
  },
  validationsToCheck:[
    {
      regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      errorMsg: 'Invalid Email Format'
    }
  ],
  checkValidationOnBlur:true
}

export const email =   {
  inputProps : {
  type: 'email',
  required:true,
},
  labelProps:{
    label: 'Email',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper:{
    component: ErrorComponet
  },
  validationsToCheck:[
    {
      regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      errorMsg: 'Invalid Email Format'
    }
  ],
  checkValidationOnBlur:true
}
export const password =   {
  inputProps : {
  type: 'password',
  required:true,
},
  labelProps:{
    label: 'Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper:{
    component: ErrorComponet
  },
  validationsToCheck:[
    {
      regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      errorMsg: 'Invalid Email Format'
    }
  ],
  checkValidationOnBlur:true,
  confirmMatchTo: {
    id: "confirmPassword",
    hideErrorComponent:true,
    checkValidationOnBlur:true,
    hideErrorComponent:true,
  }
}

export const confirmPassword =   {
  inputProps : {
  type: 'password',
  required:true,
},
  labelProps:{
    label: 'Confirm Password',
    inputProps: { className: "labels", id: "emailLabel" }
  },
  errorWrapper:{
    component: ErrorComponet
  },
  confirmMatchWith:{
    id:"confirmPassword",
    errorMsg:"Password Doesn't Match",
    ErrorComponent:ErrorComponet,
    checkValidationOnBlur:true,
  }
}

export const dropdown = {
  inputProps:{
    type: 'select',
    id: "select1"
  },
    labelProps:{
      label: 'Country:',
      inputProps: { className: "labels", id: "countryLabel" }
    },
    optionProps:{
      options: [{ value: "IN", label: "INDIA" }, { value: "US", label: "USA" }],
      inputProps: { className: "options" }
    },
    ariaDescribedBy:{
      ariaDescribedByMsg: "list of country",
      inputProps: {
        className: "hide",
        id: "ariaDescribedForCountry"
      }
    }
}


