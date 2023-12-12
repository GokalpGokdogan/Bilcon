import React, {useState} from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() 
{
    
    const [email, setEmail] = useState('');
    const [conditionToShowAlert, setConditionToShowAlert] = useState(false);
    return(
    <div className='flex flex-col bg-white items-center h-screen'>
        <div className='flex flex-col bg-white items-center h-1/6'>
            {/* Your content here */}
        </div>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='font-sans font-medium text-md text-gray'>Welcome to Bilcon!</p>
        <p className='mt-2 font-sans font-bold text-lg text-gray justify-start'>Please enter your school mail.</p>
        <div className='w-64 h-20 mt-3'>
            <p className="font-sans text-blue font-bold text-sm py-2">Bilkent Mail</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => {const value = e.target.value; if (!(value=="")&!value.match(/@(ug.bilkent.edu.tr|bilkent.edu.tr)$/)) { alert("Email must end with @ug.bilkent.edu.tr or @bilkent.edu.tr"); }}}  type="email" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="user@bilkent.edu.tr" required=""></input>
        </div>    
        <div className='flex flex-col w-64 mt-3'>
        <Link type="submit" to="/verificationPage" className="w-64 mt-4 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Mail</Link>
        </div>
    </div>
    );
}

export default ForgotPassword;
