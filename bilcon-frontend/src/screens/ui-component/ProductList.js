import React from 'react';
import { Pagination, List } from 'antd';
import MarketItem from '../products/MarketItem';
const data = [
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
    {
        title: 'Title 1',
    },
    {
        title: 'Title 2',
    },
    {
        title: 'Title 3',
    },
    {
        title: 'Title 4',
    },
];
const ProductList = () => {
    return (
       
        <List
            pagination={{ position: "bottom", align: "end", pageSize: 12, total:data.length }}
            grid={{
                gutter: 0,
                column: 4,
            }}
            dataSource={data}
            renderItem={(item) => (
                <List.Item>
                    <MarketItem></MarketItem>
                </List.Item>
            )}
        />
    );
}
export default ProductList;