import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function PrivateLessons() 
{
    return(
        <div className='bg-gray-light flex flex-col gap-3 h-full'>
            <div className='fixed top-0 w-full bg-white z-10'>
                <Header type='PrivateLessons' />
                <NavMenu currPage='PrivateLessons' />
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
                    <Feed type='PrivateLessons' />
                </div>
           
            </div>
        </div>
    );
}

export default PrivateLessons;
