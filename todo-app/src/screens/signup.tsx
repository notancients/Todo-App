import { useState, useRef } from 'react';
import { createUserEmailPassword } from '../firebase/firebase_auth';
import axios from 'axios';

const API_ADRESS = import.meta.env.VITE_API_ADDRESS;

export default function Signup() {

  let passwordRef = useRef("");
  let emailRef = useRef("");
  let firstNameRef = useRef("");
  let lastNameRef = useRef("");
  let birthdayRef = useRef("");

  function InputLabel({text, htmlfor}: {text: string, htmlfor: string}) {
    return(
      <label htmlFor={htmlfor}>{`${text}`}</label>
    )
  };


  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let newUser = await createUserEmailPassword(emailRef.current, passwordRef.current)
    if (newUser.success) {
      console.log(newUser);
      let createUser = await axios.post(
        `${API_ADRESS}user/add-user`,
        {
          id: newUser.data,
          email: emailRef.current,
          firstName: firstNameRef.current,
          lastName: lastNameRef.current,
          birthday: birthdayRef.current
        }
      )
    }
  }


  return(
  <>
  <div className='flex items-center justify-center h-full w-full'>
  <form 
    className='flex flex-col bg-red-200'
    onSubmit={handleSignUp}
  >
    <InputLabel htmlfor="signup-email" text="E-mail"/>
    <input 
      id='signup-email' 
      type='email' 
      placeholder='E-Mail'
      onChange={(e)=>{emailRef.current = e.target.value}}
      required
    />

    <InputLabel htmlfor="signup-password" text="Password"/>
    <input 
      id='signup-password' 
      type='password' 
      placeholder='Password'
      onChange={(e)=>{passwordRef.current = e.target.value}}
      required
    />

    <InputLabel htmlfor="signup-firstname" text="First Name"/>
    <input 
      id='signup-firstname' 
      type='text' 
      placeholder='First Name'
      onChange={(e)=>{firstNameRef.current = e.target.value}}
      required
    />
    
    <InputLabel htmlfor="signup-lastname" text="Last Name"/>
    <input 
      id='signup-lastname' 
      type='text' 
      placeholder='Last Name'
      onChange={(e)=>{lastNameRef.current = e.target.value}}
      required
    />
    
    <InputLabel htmlfor="signup-birthday" text="Birthday"/>
    <input 
      id='signup-birthday' 
      type='date' 
      placeholder='Birthday'
      onChange={(e)=>{birthdayRef.current = e.target.value}}
    />

    <button type='submit'>Sign Up</button>
  </form>
  </div>
  </>
  )
}