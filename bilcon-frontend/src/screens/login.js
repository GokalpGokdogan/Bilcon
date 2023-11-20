import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertPop from './ui-component/alertPop';

// will take info and search the database
function checkUser(email, password){

    return (email === 'Gokalp') && (password === '1234')
}

function Login() 
{

    /** Register button shouldn't go to home page if creentials are wrong */


    const errorCode = "Name is not Gokalp or Password is not 1234"
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conditionToShowAlert, setConditionToShowAlert] = useState(false);

    const handleSignIn = () => {
        setConditionToShowAlert(!checkUser(email, password));
        
    };


    return(
    <div className='flex flex-col bg-white justify-center items-center h-screen'>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='font-sans font-medium text-md text-gray'>Welcome to Bilcon!</p>
        <div className='w-64 h-20 mt-6'>
            <p className="font-sans text-blue font-bold text-sm py-2">Bilkent Mail/ID</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="user@bilkent.edu.tr" required=""></input>         
        </div>    
        <div className='w-64 h-20 mt-3'>
            <p className="font-sans text-blue font-bold text-sm py-2">Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Min. 8 characters" required=""></input>
        </div>
        <div className='flex flex-col w-64'>
        <Link onClick={handleSignIn} 
            type="submit" 
            to="/home"
            className="w-64 mt-4 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</Link>
        <Link  to="/forgotPassword" className="self-center p-2 font-sans text-blue font-medium text-xs justify-end hover:underline">Forgot Password?</Link>
        </div>
            <div className='flex flex-row w-64'>
            <p className="p-2 font-sans text-blue font-medium text-xs">Don't have an account?</p>
            <Link className="p-2 font-sans text-blue font-bold text-xs hover:underline justify-end" to="/register">Register</Link>
        </div>
        {conditionToShowAlert && (
            <AlertPop errorCode={errorCode} />
        )}
    </div>
    );
}

export default Login;
