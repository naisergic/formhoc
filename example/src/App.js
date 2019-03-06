import React, { Component } from 'react'
import FormHOC from 'formhoc'
import './index.css'
import {submitButton,FORM_JSON} from './FormJson';

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
    FORM_JSON[3].onAfterSubmit = this.handleSubmit;
    return (
      <div>
        <FormHOC formJson={FORM_JSON}/>
      </div>
    )
  }
}
