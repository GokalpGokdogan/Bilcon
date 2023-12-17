import React from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { FloatButton } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


function Market() {
    return (
        <div className='bg-gray-light flex flex-col gap-3'>
            <div className='fixed top-0 w-full bg-white z-10'>
                <Header type='Market' />
                <NavMenu currPage='Market' />
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
                <Feed type='Market'/> 

            </div>
        </div>
    );
}

export default Market;