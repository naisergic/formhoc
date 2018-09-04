import React, { Component } from 'react'

import formHoc from 'form-hoc'

export default class App extends Component {
  render () {
    return (
      <div>
        <formHoc text='Modern React component module' />
      </div>
    )
  }
}
