import React from 'react';
import { Link } from 'react-router-dom';



function Header() 
{
    return(
    <div className='flex flex-row p-4 w-full'>
        <div className='w-2'>
            <Link to="/market" onMouseOver={(e) =>{
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let repetitons = 0;
                const interval = setInterval(
                    () => {
                        e.target.innerText = e.target.innerText.split('').map((letter, index) => {
                            if(index<repetitons){
                                return e.target.dataset.value[index]
                            }
                            return letters[Math.floor(Math.random() * letters.length)]
                    
                        }).join('')
                        if(repetitons>=e.target.dataset.value.length){
                            clearInterval(interval)
                            
                        }
                        repetitons+=4/5;
                    },30)
                }} data-value="BILCON" className='font-inter font-extrabold text-3xl text-blue-dark'>BILCON</Link>
        </div>
        
        <input type="text" className="mx-auto border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search for second-hand items, books and more!" required=""></input>
        <Link type="submit" to="/accountPage" className="w-32 my-auto text-white bg-ui-purple hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Account</Link>
    </div>);
}

export default Header;
