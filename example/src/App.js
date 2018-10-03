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
            labelprops: {label: 'Email:', inputprops:{className:"labels",id:"emailLabel"}},
            checkvalidationonblur: "true",
            validationstocheck: [{regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, errorMsg: 'Invalid Email Format'}],
            errormsgprops:{
              className:'errorClass',
              id:'emailError'
            },
            errormsgparagraphprops: {
              id: 'emailErrorPara'
            }
          }} />
        <FormHOC inputProps={
          {
            type: 'password',
            labelprops: {label: 'Password:', inputprops:{className:"labels",id:"passwordLabel"}},
            checkvalidationonchange: "true",
            validationstocheck: [{regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, errorMsg: 'Invalid Password Format'}],
            errormsgprops:{
              className:'errorClass',
              id:'passwordError'
            },
            errormsgparagraphprops: {
              id: 'passwordErrorPara'
            }
          }} />
          <FormHOC inputProps={
          {
            type: 'select',
            options:[{value:"IN",label:"INDIA"},{value:"US",label:"USA"}],
            labelprops: {label: 'Country:', inputprops:{className:"labels",id:"countryLabel"}},
            optionprops:{className:"options"},
            id:"select1",
            ariadescribedby:{
              ariadescribedbymsg:"list of country",
              className:"hide",
              id:"ariaDescribedForCountry"
            }
          }} />
      </div>
    )
  }
}
