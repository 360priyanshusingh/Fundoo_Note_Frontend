import PropTypes from 'prop-types'
import './Login.scss'
import React, { Component, useState } from 'react'
import axios from 'axios'
import { loginApiCall } from '../../utils/Api'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
   let email = ""
   let password = ""
 
   const [emailError, setEmailError]= useState(false)
   const [passwordError,setPasswordError]= useState(false)
   const navigate=useNavigate()

   const handleSubmit= async(e)=>{
    e.preventDefault();

     if(!email.length) {
      setEmailError(true)
      return
     }
     if(!password.length){
      setPasswordError(true)
      return
     }

   loginApiCall({email,password},`users/login`)
   .then((result)=>{
    console.log(result);

    const {data} =result

    console.log(data);
    
       if(data.message==="User successfully Login"){
        navigate("/signup")
        alert("User successfully Login")
        localStorage.setItem('token',data.data)
       
      }
      else if(data.message==="User is not registered !"){
        alert("User is not registered !")
      }
      else if(data.message==="User Password Is Wrong !"){
        alert("User Password Is Wrong !")
      }
      else{
        alert("User not Login")
      }
  
   })
   .catch((error)=>{
       console.log(error)
       alert("User not Login deu to backend")
   })
   
   setEmailError(false)
   setPasswordError(false)

   }

 return (
   <div className='login-container-main-cnt'>
      <div className="login-container-cnt">
   <div className="login-box-cnt">
     <h1 className="login-box-title-cnt">Fundo</h1>
     <h2 className="login-box-subtitle-cnt">Sign in</h2>
     <p className="login-box-instructions-cnt">Use your Fundo Account</p>
     <div>
       <div className="login-input-box-cnt">
         <input
           placeholder="Email or phone"
           onChange={(e) => email = e.target.value}
         />
         {emailError && <span> Email is required !</span>}
       </div>
       <div className="login-input-box-cnt">
         <input
           type="password"
           placeholder="Password"
           onChange={(e) => password =e.target.value}
         />
         {passwordError && <span> Password is required !</span>}
       </div>
       <div className="login-box-options-cnt">
         <a className="login-forgot-password-cnt">
           Forgot password
         </a>
       </div>
       <div className="login-box-actions-cnt">
         <Link onClick={() => navigate("signup")} className="login-create-account-cnt">
           Create account
         </Link>
         <button onClick={handleSubmit} className="login-button-cnt">
           Login
         </button>
         
       </div>
     </div>
    
   </div>
   <footer className='login-footer-cnt' >
     <div className="login-footer-links-cnt">
       <a href="#">Help</a>
       <a href="#">Privacy</a>
       <a href="#">Terms</a>
     </div>
     <div className="login-language-selector-cnt">
       <select>
         <option>English (United States)</option>
         <option>English (United Kingdom)</option>
       </select>
     </div>
     
     </footer>
  
 </div>
 

   </div>
 
 
 )
}