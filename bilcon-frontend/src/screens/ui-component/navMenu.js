import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';


function NavMenu({currPage}) 
{
    
    
    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
    
    // console.log('page:', page);
    //console.log('currPage:', currPage);
    return(
        
        <div className="flex justify-center items-center flex-row p-4 w-full w-32 my-auto text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {pages.map((page, index) => (
            <React.Fragment key={page}>
                {index > 0 && <div  className="flex justify-center items-center border-r border-gray-500 mx-2 h-8" style={{ borderWidth: '0.02vw', alignItems: 'center' }}></div>}
                <MenuItem className={`flex items-center`}>
                    <Link
                        to={`/${page.toLowerCase()}`}
                        className= {`${page === currPage ? 'bg-red-500' : 'bg-ui-purple'} text-white w-40 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >
                        {page} 
                        
                    </Link>
                </MenuItem>
            </React.Fragment>
            ))}
        </div>
       
    );
}

export default NavMenu;
