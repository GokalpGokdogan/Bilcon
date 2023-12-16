import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import AlertPop from './ui-component/alertPop';
import { login } from '../utils/Requests';

// will take info and search the database
function checkUser(email, password){

    return (email === 'Gokalp') && (password === '1234')
}



function Login() 
{
    const  [errorCode, setErrorCode] = useState("Name is not Gokalp or Password is not 1234");
    const [id, setId] = useState();
    const [password, setPassword] = useState('');
    const [conditionToShowAlert, setConditionToShowAlert] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            login(id, password);
        }
    };

    return(
    <div className='flex flex-col bg-white items-center h-screen'>
        <div className='flex flex-col bg-white items-center h-1/6'>
            {/* Your content here */}
        </div>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='font-sans font-medium text-md text-gray mb-3'>Welcome to Bilcon!</p>
        <div className='flex flex-col w-64 gap-3'>
            <div>
                <p className="font-sans text-blue font-bold text-sm py-2">Bilkent ID</p>
                <input onKeyDown={handleKeyDown} value={id} type='text' maxLength={8} onChange={(e) => setId(e.target.value.replace(/\D/g, ''))} className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="2*******" required=""></input>         
            </div>    
            <div>
                <p className="font-sans text-blue font-bold text-sm py-2">Password</p>
                <input onKeyDown={handleKeyDown} value={password} minLength={6} maxLength={64} onChange={(e) => setPassword(e.target.value)} type="password" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="Min. 8 characters" required=""></input>
            </div>
            <Link onClick={() => login(id, password)} 
                type="submit" 
                //to="/home"
                className="text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center">Sign in</Link>
            <Link  to="/forgotPassword" className="font-sans text-blue font-bold text-xs text-center hover:underline ">Forgot Password?</Link>
            <div className='flex flex-row items-center justify-center space-x-1'>
                <p className="font-sans text-blue font-medium text-xs">Don't have an account?</p>
                <Link className="font-sans text-blue font-bold text-xs hover:underline" to="/register">Register</Link>
            </div>
        </div>
        {conditionToShowAlert && (
            <AlertPop errorCode={errorCode} />
        )}
    </div>
    );
}

export default Login;
