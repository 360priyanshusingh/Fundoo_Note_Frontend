import React, { useState } from 'react';
import './Signup.scss'; 
import SnackbarContent from '@mui/material/SnackbarContent';
import { signupApiCall } from '../../utils/Api';
import { Link, Navigate, useNavigate } from 'react-router-dom';



const Signup = () => {
  let firstName='';
  let lastName='';
  let email='';
  let password='';
  let confirmPassword='';
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!firstName){
      return alert('first Name is required !');
    }

    if(!lastName){
      return alert('last Name is required !');
    }

    if(!email){
      return alert('email is required !');
    }

    if(!password){
      return alert('password is required !');
    }

    if(!confirmPassword){
      return alert('confirm password is required !');
    }
    
    if(password!=confirmPassword){
      return alert('password and confirm password is not same !')
    }

    signupApiCall({firstName,lastName,email,password},`users/signup`)
    .then((result)=>{
      const {data}=result
        if(data.message==="User Succesfully Created !"){
          alert("User Succesfully Created !")
          navigate("/")
        }
        else{
          alert("User Not Created !")
        }
    })
    .catch((error)=>{
     console.log(error)
     alert("User Not Created due to backend Error!")
    })
   
  };

  return (

    <div className='signup-container-main-cnt' >
       <div className="signup-container-cnt">
      <div  className='signup-box-main-cnt'>
      <div className="signup-box-cnt">
        <div className="signup-form-cnt">
          <h1 className="signup-title-cnt">Fundoo</h1>
          <h2 className="signup-subtitle-cnt">Create your Fundoo Account</h2>
          <form >
            <div className="signup-name-fields-cnt">
              <input
                type="text"
                name="firstName"
                placeholder="First Name*"
                onChange={(e) => firstName = e.target.value}
                className='singup-input-cnt'
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                onChange={(e)=> lastName=e.target.value}
                className='singup-input-cnt'
              />
            </div>
            <div className="signup-name-fields-cnt">
              <input
                type="text"
                name="email"
                placeholder="email*"
                onChange={(e) => email = e.target.value}
                className='singup-input-cnt'
              />
              <small>You can use letters, numbers & periods</small>
            </div>
            <div className="signup-name-fields-cnt">
              <input
                type="password"
                name="password"
                placeholder="Password*"
                onChange={(e) => password = e.target.value}
                className='singup-input-cnt'
              />
              <small> Use 8 or more characters with a mix of letters, numbers & symbols</small>
            </div>
            <div className="signup-name-fields-cnt">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm*"
                onChange={(e) => confirmPassword = e.target.value}
               className='singup-input-cnt'
              />
            </div>
            <div className="signup-options-cnt">
              <Link onClick={()=>navigate('/')} className="signup-signin-link-cnt">Sign in</Link>
              <button type="submit" onClick={handleSubmit} className="signup-button-cnt">Register</button>
            </div>
          
          </form>
        </div>
        <div className="signup-info-cnt">
          <img src="images/signup.jpg" alt="img is not loaded" className="signup-image-cnt" />
          <p className="signup-text-cnt">One account. All of Fundo working for you.</p>
        </div>
     
      </div>
 
      </div>
      <footer className='signup-footer-cnt'>
  <div className="signup-footer-links-cnt">
    <a href="#">Help</a>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
  </div>
  <div className="signup-language-selector-cnt">
    <select>
      <option>English (United States)</option>
      {/* <!-- Add more languages as needed --> */}
    </select>
  </div>
</footer>
    
    </div>
    </div>
   
  );
};

export default Signup;
