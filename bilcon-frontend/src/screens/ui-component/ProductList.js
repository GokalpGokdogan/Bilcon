import React, {useEffect} from 'react';
import { Pagination, List } from 'antd';
import MarketItem from '../products/MarketItem';
import RentingItem from '../products/RentingItem';
import PrivateLessonItem from '../products/PrivateLessonItem';
import CourseTradingItem from '../products/CourseTradingItem';

const ProductList = ({products, type}) => {
    const renderItem = (item) => {
        // Render different components based on the 'type' prop
        if (type == 'Market') {
          return <MarketItem product={item} />;
        } else if (type == 'Renting') {
          return <RentingItem product={item} />;
        } else if (type == 'PrivateLessons') {
            return <PrivateLessonItem product={item} />;
        } else if (type == 'CourseTrading') {
            return <CourseTradingItem product={item} />;
        }
        else {
          // Handle other types or provide a default component
          return <div></div>;
        }
      };

      useEffect(() => {
        console.log(products);
    }, []); // The second parameter (dependency array) is empty, indicating that the effect should only run once, similar to componentDidMount in class components
    

    return (
        <div className='bg-gray-light'>
        <List
            pagination={{ position: "bottom", align: "end", pageSize: 12, total:products.length }}
            grid={{
                gutter: 0,
                column: 4,
            }}
            dataSource={products}
            renderItem={(item) => (
                <List.Item>
                {renderItem(item)}
                </List.Item>
            )}     // Set a fixed height and allow content to scroll

        /></div>
    );
}
export default ProductList;