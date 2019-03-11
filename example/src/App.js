import React, { Component } from 'react'
import FormHOC from 'formhoc'
import './index.css'
import {input1,input2,dropdown,submitButton} from './FormJson';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    }
  }
  handleSubmit(e,isError){

    // both if and else if is imp
    // for handling of error
    // on submit

    if(isError){
      console.log("some Error");
      this.setState({
        error: true
      })
    }
    else if(this.state.error) {
      this.setState({
        error: false
      })
    }
    // else
    // execute your logic
  }
  render() {
    submitButton.onAfterSubmit = this.handleSubmit;
    return (
      <div>
        <FormHOC inputTypeJson={input1} error={this.state.error} />
        <FormHOC inputTypeJson={input2} error={this.state.error}/>
        <FormHOC inputTypeJson={dropdown} error={this.state.error}/>
        <FormHOC inputTypeJson={submitButton} error={this.state.error}/>
      </div>
    )
  }
}
