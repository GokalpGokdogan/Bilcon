import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';



function Rent() 
{
    return(
        <div className='bg-white h-screen'>
            <div className='fixed top-0 w-full bg-white pb-2'>
                <Header type='Renting'/>
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
            <div className='mt-28'>
                <Feed type='Renting'/>
            </div>
       </div>
    );
}

export default Rent;
