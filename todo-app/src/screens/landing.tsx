import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


function Landing() {

    const navigate = useNavigate();

    function handleLogin() {
        navigate('/login');
    }

    return(
    <>
    <div className='flex bg-red-200 justify-center items-center h-screen w-screen'>
        <div onClick={() => handleLogin()}>Login / Sign Up</div>
    </div>
    </>
    )
}

export default Landing;