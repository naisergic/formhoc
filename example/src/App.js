import React, { Component } from 'react'

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
      </div>
    )
  }
}
