import React from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
const items = [
  {
    label: <Link to="/lostItems" className="font-sans">Lost Items</Link>,
    key: '0',
  },
  {
    label: <Link to="/foundItems" className="font-sans">Found Items</Link>,
    key: '1',
  },
];
function NavMenu({currPage}) 
{     
    const pages = ['Market', 'Renting', 'LostandFound', 'PrivateLessons', 'CourseTrading'];
    
    return(
        
        <div className="flex justify-center items-center flex-row p-4 w-full my-auto text-black bg-white border border-gray-mid hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            {pages.map((page, index) => (
            <React.Fragment key={page}>
                {index > 0 && <div  className="flex justify-center items-center border-r border-gray-500 mx-2 h-8 text-gray" style={{ borderWidth: '0.02vw', alignItems: 'center' }}></div>}
                <MenuItem className={`flex items-center`}>
                {page === "LostandFound"? 
                    (
                        <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={['click']}
                      >
                    
                    <button  onClick={(e) => e.preventDefault()}
                    className= {`${(currPage === "LostItems" || currPage === "FoundItems")  ? 'bg-blue-dark' : 'bg-ui-purple'} text-white w-40 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >Lost and Found</button></Dropdown>)
                    
                    :
                    (<Link
                        to={`/${page.toLowerCase()}`}
                        className= {`${page == currPage ? 'bg-blue-dark' : 'bg-ui-purple'} text-white w-40 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                    >
                        {page === "LostandFound" ? "Lost and Found" :
                        page === "PrivateLessons" ? "Private Lessons" :
                        page === "CourseTrading" ? "Course Trading" : page
                        }
               
                    </Link>) }
                </MenuItem>
            </React.Fragment>
            ))}
        </div>
       
    );
}

export default NavMenu;
