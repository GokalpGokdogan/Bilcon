import React, {useEffect} from 'react';
import { Avatar, List, Space } from 'antd';
import LostItem from '../products/LostItem';
import FoundItem from '../products/FoundItem';
const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const BlogList = ({ products, type }) => {
    let stat;
    if (type === "LostItems") {
        stat = "Lost";
    } else {
        stat = "Found";
    }

    const renderItem = (item) => {
        // Render different components based on the 'type' prop
        if (type == 'LostItems') {
          return <LostItem product={item} />;
        } else if (type == 'FoundItems') {
          return <FoundItem product={item} />;
        }
        else {
          // Handle other types or provide a default component
          return <div></div>;
        }
      };

      useEffect(() => {
        console.log(products);
    }, []); 

    return (
        <div>
            <p className='text-lg pt-3 font-sans font-bold'>{stat} Items</p>
            <List
                itemLayout="vertical"
                size="medium"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={products}
                renderItem={(item) => (
                    <List.Item>
                        {renderItem(item)}
                    </List.Item>
                )}
            />
        </div>
    );
};

export default BlogList;