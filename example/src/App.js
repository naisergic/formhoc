import React, { Component } from 'react'
import { FormInput, ReactForm } from 'reactformwrapper'
import './index.css'
import {firstName,lastName,email,password, confirmPassword, submitButton,password1,confirmPassword1} from './FormJson';

export default class App extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e,formObj,errorObj,isError){
    /**
     * you can write
     * your logic here
     */
    console.log(isError);
  }
  render() {
    return (
      <React.Fragment>
        <ReactForm onSubmit={this.handleSubmit} inputProps={{className:"form1",name:"form1"}}>
          <div className="mb5">
            <FormInput inputTypeJson={firstName}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={lastName}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={email}  checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={password1}  />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={confirmPassword1} />
          </div>
          <div className="mb5">
            <FormInput inputTypeJson={submitButton}/>
          </div>
        </ReactForm>

        <ReactForm onSubmit={this.handleSubmit} inputProps={{className:"form1",name:"form1"}}>
          <div className="mb5 relative">
            <FormInput inputTypeJson={firstName}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={lastName}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={email}  checkValidationFunc={()=>{}}/>
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={password}  />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={confirmPassword} />
          </div>
          <div className="mb5 relative">
            <FormInput inputTypeJson={submitButton}/>
          </div>

        </ReactForm>

      </React.Fragment>
    );
  }
}
