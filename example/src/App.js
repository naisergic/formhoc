import React, { Component } from 'react'
import './index.css'
import FormHOC from 'formhoc'

export default class App extends Component {
  render() {
    return (
      <div>
        <FormHOC inputProps={{
          type: 'input',
          required:true
        }}
          labelProps={{
            label: 'Email:',
            inputProps: { className: "labels", id: "emailLabel" }
          }}
          errorProps={{
            errorMsgProps: {
              className: 'errorClass',
              id: 'emailError'
            },
            errorMsgParagraphProps: {
              id: 'emailErrorPara'
            }
          }}
          validationsToCheck={[
            {
              regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
              errorMsg: 'Invalid Email Format'
            }
          ]}
          checkValidationOnBlur
        />
        <FormHOC inputProps={{
          type: 'password',
        }}
          labelProps={{
            label: 'password:',
            inputProps: { className: "labels", id: "passwordLabel" }
          }}
          errorProps={{
            errorMsgProps: {
              className: 'errorClass',
              id: 'passwordError'
            },
            errorMsgParagraphProps: {
              id: 'passwordErrorPara'
            }
          }}
          validationsToCheck={[
            {
              regexToCheck: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
              errorMsg: 'Invalid Email Format'
            }
          ]}
          checkValidationOnChange
        />
        <FormHOC inputProps={{
          type: 'select',
          id: "select1"
        }}
          labelProps={{
            label: 'Country:',
            inputProps: { className: "labels", id: "countryLabel" }
          }}
          optionProps={{
            options: [{ value: "IN", label: "INDIA" }, { value: "US", label: "USA" }],
            inputProps: { className: "options" }
          }}
          ariaDescribedBy={{
            ariaDescribedByMsg: "list of country",
            inputProps: {
              className: "hide",
              id: "ariaDescribedForCountry"
            }
          }}
        />
        <FormHOC inputProps={{
          type: 'submit',
          id: 'submitBtn',
          value: 'Submit'
        }}
        onAfterClick={this.handleSubmit}
        />
      </div>
    )
  }
}
