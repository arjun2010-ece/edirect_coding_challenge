import React, { useState } from 'react';
import {  Redirect } from "react-router-dom";
import { signin } from "../middlewares";
import {isAuthenticated, authenticate} from "../helpers";
import FormGroup from "./reusable/FormGroup";
import "../App.css";

const Signin = () => {
  const [formdata, setFormdata] = useState({
    email: "korean@thehuub.io",
    password: "HUUBrocks2020sucks",
    loading: false,
    error: "",
    redirectToReferrer: false
  });
  const {email, password, loading, error, redirectToReferrer} = formdata;
  const {jwt} = isAuthenticated();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormdata({...formdata, loading: true, error: "" });
    let response = await signin(formdata);
    if(response){
      authenticate(response?.data, () => {
              setFormdata({ ...formdata, loading: false, redirectToReferrer: true });
        });
    }
    else{
      setFormdata({...formdata, loading: false, error: "Could not Sign in." });
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
    if (redirectToReferrer) {
        if (jwt) {
            return <Redirect to="/projects" />;
        }
    }
    if (isAuthenticated()) {
        return <Redirect to="/projects" />;
    }
  };

  return (
    <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-6 mx-auto my-5">
                {loader()}
                {showError()}
                {redirectUser()}
              <form onSubmit={handleSubmit} className="my-5">

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
                  <button type="submit" className="btn btn-primary">Signin</button>
              </form>
          </div>
        </div>
      </div>
  )
}

export default Signin;

// case_study@thehuub.io
// HUUBrocks2020sucks