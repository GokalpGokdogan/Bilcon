import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { register } from '../utils/Requests';


function Register() 
{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [id, setId] = useState();

    const [conditionToShowAlert, setConditionToShowAlert] = useState(false);

    return(
        <div className='flex flex-col bg-white items-center h-screen'>
            <div className='flex flex-col bg-white items-center h-1/6'>
                {/* Your content here */}
            </div>
            <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
            <p className='font-sans font-medium text-md text-gray mb-3'>Welcome to Bilcon!</p>
            <p className='font-sans font-bold text-lg text-gray justify-start mb-3'>Sign up to start.</p>
            <div className='flex flex-col w-64 gap-3'>
                <div>
                    <p className="font-sans text-blue font-bold text-sm py-2">Name</p>
                    <input value={name} minLength={1} maxLength={64} onChange={(e) => setName(e.target.value)}  className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="Name Surname" required=""></input>
                </div>
                <div>
                    <p className="font-sans text-blue font-bold text-sm py-2">Bilkent ID</p>
                    <input value={id} type='text' maxLength={8} onChange={(e) => setId(e.target.value.replace(/\D/g, ''))} className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="2*******" required=""></input>         
                </div>   
                <div>
                    <p className="font-sans text-blue font-bold text-sm py-2">Bilkent Mail</p>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} onBlur={(e) => {const value = e.target.value; if (!value.match(/@(ug.bilkent.edu.tr|bilkent.edu.tr)$/)) { alert("Email must end with @ug.bilkent.edu.tr or @bilkent.edu.tr"); }}}  type="email" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="user@bilkent.edu.tr" required=""></input>
                </div>    
                <div>
                    <p className="font-sans text-blue font-bold text-sm py-2">Password</p>
                    <input value={password} minLength={1} maxLength={64} onChange={(e) => setPassword(e.target.value)} type="password" className="border border-gray text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-full" placeholder="Min. 8 characters" required=""></input>
                </div> 
                <Link onClick={() => register(name, email, id, password)} to="/verificationPage" className="w-64 mt-4 text-white bg-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</Link>
            </div>
        </div>
    );
}

export default Register;
