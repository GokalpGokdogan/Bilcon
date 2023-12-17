import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../utils/Requests';

function ForgotPassword() 
{
    
    const [id, setId] = useState('');
    const [conditionToShowAlert, setConditionToShowAlert] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            forgotPassword(id);
        }
    };

    return(
    <div className='flex flex-col bg-white items-center h-screen'>
        <div className='flex flex-col bg-white items-center h-1/6'>
            {/* Your content here */}
        </div>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='font-sans font-medium text-md text-gray'>Welcome to Bilcon!</p>
        <p className='mt-2 font-sans font-bold text-lg text-gray justify-start'>Please enter your school ID.</p>
        <div className='w-64 h-20 mt-3'>
            <p className="font-sans text-blue font-bold text-sm py-2">Bilkent ID</p>
            <input onKeyDown={handleKeyDown} value={id} type='text' maxLength={8} onChange={(e) => setId(e.target.value.replace(/\D/g, ''))} className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="2*******" required=""></input>         
        </div>    
        <div className='flex flex-col w-64 mt-3'>
        <Link type="submit" to="/resetPasswordPage" onClick={() => forgotPassword(id)} className="w-64 mt-4 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Mail</Link>
        </div>
    </div>
    );
}

export default ForgotPassword;
