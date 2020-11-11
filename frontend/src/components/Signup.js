import React, { useState } from 'react';
import {  Redirect } from "react-router-dom";
import { signup } from "../middlewares";
import {isAuthenticated} from "../helpers";
import FormGroup from "./reusable/FormGroup";

import "../App.css";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    email: "case_study@thehuub.io",
    password: "HUUBrocks2020sucks",
    fullName: "",
    username: "",
    loading: false,
    error: "",
    success: false
  });
  const {email, password, fullName, username, loading, error, success} = formdata;


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata({...formdata, loading: true, error: "" });
    let response = await signup(formdata);
    if(response){
        setFormdata({ email: "", password: "", fullName: "", username: "", loading: false, success: true });
    }
    else{
      setFormdata({...formdata, loading: false, error: "Could not Sign up.", success: false });
    }
     
  }

  const showError = () => {
    if(error){
      return (
        <div className="alert alert-primary text-center my-3" role="alert">
            {error}
        </div>
      )
    }
  }

  const showSuccess = () => {
    if(success){
      return (
        <div className="alert alert-primary text-center my-3" role="alert">
            Signup success. Now You can login with your credentials.
        </div>
      )
    }
  }

  const loader =() => {
    if(loading){
      return (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-center" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )
    }
  }

  const handeChange = (e) =>{
    setFormdata({...formdata, error: "", [e.target.name]: e.target.value });
  }

  const redirectUser = () => {
    if (isAuthenticated()) {
        return <Redirect to="/projects" />;
    }
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto my-5">
              <h3>Signup Page</h3>
              <small>Already Signed up ? Then Login from above.</small>
                {loader()}
                {showError()}
                {redirectUser()}
                {showSuccess()}
              <form onSubmit={handleSubmit} className="my-5">
                  <FormGroup
                      type="text"
                      name="fullName"
                      value={fullName}
                      handeChange={handeChange}
                      placeholder="Enter Full Name"
                      label="Name"
                  />

                  <FormGroup
                      type="text"
                      name="username"
                      value={username}
                      handeChange={handeChange}
                      placeholder="Enter user name"
                      label="Username"
                  />

                  <FormGroup
                      type="email"
                      name="email"
                      value={email}
                      handeChange={handeChange}
                      placeholder="Enter email"
                      label="Email"
                  />

                  <FormGroup
                      type="password"
                      name="password"
                      value={password}
                      handeChange={handeChange}
                      placeholder="Password"
                      label="Password"
                  />

                  <button type="submit" className="btn btn-primary">Signup</button>
              </form>
          </div>
        </div>
      </div>
  )
}

export default Signup;

// case_study@thehuub.io
// HUUBrocks2020sucks