import React, { Component } from 'react'

import FormHOC from 'formhoc'

export default class App extends Component {
  render () {
    return (
      <div>
        <FormHOC inputProps={{type: 'input'}} />
      </div>
    )
  }
}
