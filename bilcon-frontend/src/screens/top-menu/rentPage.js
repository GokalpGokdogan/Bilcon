import React, {useState} from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function Rent() 
{
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState({});

    return(
        <div className='bg-gray-light flex flex-col gap-3 h-full'>
            <div className='fixed top-0 w-full bg-white z-10'>
                <Header type='Renting' setSearchValue={setSearchValue} searchValue={searchValue} filterValue={filterValue} setFilterValue={setFilterValue}/>
                <NavMenu currPage='Renting' />
            </div>
            <FloatButton
                tooltip='Add Item'
                shape="circle"
                type="primary"
                style={{ right: 94 }}
                icon={<PlusOutlined />}
                onClick={() => {window.location.href = '/add-item'}}
            />
            <div className=' mt-28 flex justify-center h-full' >
            <div className='w-full max-w-screen-lg h-full'>
                    <Feed type='Renting' searchValue={searchValue} filterValue={filterValue}/>
                </div>
         
            </div>
        </div>
    );
}

export default Rent;
