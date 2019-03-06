import React, { Component } from 'react'
import FormHOC from 'formhoc'
import './index.css'
import {input1,input2,dropdown,submitButton} from './FormJson';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e,isError){
    if(isError){
      console.log("some Error");
    }
    // else
    // execute your logic
  }
  render() {
    submitButton.onAfterSubmit = this.handleSubmit;
    const FORM_JSON = [
      {...input1},
      {...input2},
      {...dropdown},
      {...submitButton}
    ]
    return (
      <div>
        <FormHOC formJson={FORM_JSON}/>
      </div>
    )
  }
}
