import React from 'react'

const ErrorComponet = (props)=>{
  return <span>{props.children}</span>
}

const format = (value)=>{
  let input = value
  input=`${input} done`
  //perform your logic
  return input;
}

export const submitButton = {
  inputProps:{
    type: 'submit',
    id: 'submitBtn',
    value: 'Submit'
  },
  onAfterSubmit:undefined
};

export const input1 =   {
  inputProps : {
  type: 'input',
  required:true
},
  labelProps:{
    label: 'Email:',
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
  formatter:format,
  checkValidationOnBlur:true
}

export const input2 = {
  inputProps:{
    type: 'password',
  },
  labelProps:{
    label: 'password:',
    inputProps: { className: "labels", id: "passwordLabel" }
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
  checkValidationOnChange:true
}

export const input3 = {
  inputProps:{
    type: 'text',
  },
    labelProps:{
      label: 'Name:',
      inputProps: { className: "labels", id: "nameLabel" }
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
    checkValidationOnChange:true
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


