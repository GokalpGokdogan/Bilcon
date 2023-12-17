import React from 'react';
import { Link } from 'react-router-dom';

function verificationPage() 
{
    return(
    <div className='flex flex-col bg-white justify-center items-center h-screen'>
        <p className='font-inter font-extrabold text-7xl text-blue-dark'>BILCON</p>
        <p className='mt-2 font-sans font-bold text-lg text-gray justify-start'>Verification code has been sent to your email.</p>
        <div className='flex flex-col w-64 mt-3'>
        </div>
    </div>
    );
}

export default verificationPage;
