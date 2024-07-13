import { useRef, ChangeEvent } from 'react';
import { createUserEmailPassword } from '../firebase/firebase_auth';
import { useNavigate } from 'react-router-dom';

function Signin() {
  let usernameRef = useRef('');
  let passwordRef = useRef('');
  let navigate = useNavigate();

  function handleTextChange(event: ChangeEvent<HTMLInputElement>, target: string) {
    
    switch(target) {
      case 'email':
        usernameRef.current = event.target.value;
        break;
      case 'password':
        passwordRef.current = event.target.value;
        break;
    }
  }

  function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("User signing in.");
  }

  function handleSignUp() {
    navigate('/signup');
  }

  return(
  <>
  <div className='flex bg-red-200 justify-center items-center h-full w-full'>
  <form onSubmit={(e) => handleSignIn(e)} className='flex items-center justify-center flex-col h-3/4 w-2/4 bg-yellow-400'>
    <div id="username" className='m-2 w-2/3 flex items-start justify-center flex-col'>
      <div>Username</div>
      <input 
        type="text" 
        placeholder='Enter email'
        className='w-full'
        onChange={(e) => handleTextChange(e, 'email')}
      />
    </div>
    <div className='m-2 w-2/3 flex items-start justify-center flex-col'>
      <div>Password</div>
      <input 
        type="password" 
        placeholder='Enter password'
        className='w-full'
        onChange={(e) => handleTextChange(e, 'password')}
      />
    </div>
    <button type='submit'>Sign In</button>
    <div 
      className='hover:text-blue-500 hover:underline'
      onClick={() => handleSignUp()}
    >Not a user yet? Signup
    </div>
  </form>
  </div>
  </>
  )
}

export default Signin;