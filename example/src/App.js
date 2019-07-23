import React, { Component } from 'react'
import FormHOC from 'formhoc'
import './index.css'
import {firstName,lastName,email,password, confirmPassword, submitButton} from './FormJson';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      error: false
    }
  }
  handleSubmit(e,isError){

    // both if and else-if is imp
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
    //this is imp
    submitButton.onAfterSubmit = this.handleSubmit;
    return (
      <React.Fragment>
        <form className="form1" name="form1">
          <div className="mb5">
            <FormHOC inputTypeJson={firstName} error={this.state.error} />
          </div>
          <div className="mb5">
            <FormHOC inputTypeJson={lastName} error={this.state.error} />
          </div>
          <div className="mb5">
            <FormHOC inputTypeJson={email} error={this.state.error} checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5">
            <FormHOC inputTypeJson={password} error={this.state.error} />
          </div>
          <div className="mb5">
            <FormHOC inputTypeJson={confirmPassword} error={this.state.error}/>
          </div>
          <div className="mb5">
            <FormHOC inputTypeJson={submitButton}/>
          </div>
        </form>


         <form className="form2" name="form2">
          <div className="mb5 relative">
            <FormHOC inputTypeJson={firstName} error={this.state.error} />
          </div>
          <div className="mb5 relative">
            <FormHOC inputTypeJson={lastName} error={this.state.error} />
          </div>
          <div className="mb5 relative">
            <FormHOC inputTypeJson={email} error={this.state.error} checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5 relative">
            <FormHOC inputTypeJson={password} error={this.state.error} />
          </div>
          <div className="mb5 relative">
            <FormHOC inputTypeJson={confirmPassword} error={this.state.error}/>
          </div>
          <div className="mb5 relative">
            <FormHOC inputTypeJson={submitButton}/>
          </div>
        </form>

      </React.Fragment>
    );
  }
}
