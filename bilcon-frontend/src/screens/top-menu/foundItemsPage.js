import React, {useState} from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { PlusOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';


function FoundItems() 
{
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState({});

    return(
        <div className='bg-gray-light flex flex-col gap-3'>
        <div className='fixed top-0 w-full bg-white z-10'>
            <Header type='LostandFound' setSearchValue={setSearchValue} searchValue={searchValue} filterValue={filterValue} setFilterValue={setFilterValue}/>
            <NavMenu currPage='FoundItems' />
        </div>
        <FloatButton
                tooltip='Add Item'
                shape="circle"
                type="primary"
                style={{ right: 94 }}
                icon={<PlusOutlined />}
                onClick={() => {window.location.href = '/add-item'}}
        />
        <div className=' mt-28 flex justify-center' >
        <div className='w-full max-w-screen-lg px-4'>
                <Feed type='FoundItems' searchValue={searchValue} filterValue={filterValue}/>
            </div>
        </div>
    </div>
    );
}

export default FoundItems;
