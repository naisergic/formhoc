import React, { Component } from 'react'
import './index.css'
import FormHOC from 'formhoc'

export default class App extends Component {
  render () {
    return (
      <div>
        <FormHOC inputProps={
          {
            type: 'input',
            labelProps: {label: 'Email'},
            checkValidationOnBlur: true,
            validationsToCheck: [{regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, errorMsg: 'Invalid Email Format'}]
          }} />
        <FormHOC inputProps={
          {
            type: 'password',
            labelProps: {label: 'Password'},
            checkValidationOnBlur: true,
            validationsToCheck: [{regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, errorMsg: 'Invalid Password Format'}]
          }} />
          <FormHOC inputProps={
          {
            type: 'select',
            options:[{value:"IN",label:"INDIA"},{value:"US",label:"USA"}],
            labelProps: {label: 'Country'},
            optionProps:{},
            id:"select1",
            ariaDescribedBy:{
              ariadescribedByMsg:"list of country",
              className:"hide",
              id:"ariaDescribedForCountry"
            }
          }} />
      </div>
    )
  }
}
