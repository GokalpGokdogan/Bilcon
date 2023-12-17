import React, { useState, useEffect } from 'react';
import ProductComponent from './productComponent';
import Product from '../../Classes/Product'
import { getAllItems } from '../../utils/Requests';
import ProductList from './ProductList';
import BlogList from './BlogList';
import CircularProgress from '@mui/material/CircularProgress';
import PrivateLessonItem from '../products/PrivateLessonItem';
import { searchAllItems, filterAllItems } from '../../utils/Requests';


function Feed({ type = 'Market', searchValue, filterValue }) {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                let data;
                if (type === 'Market') {
                    if(searchValue)
                    {
                        data = await searchAllItems(0, 'sale', 0, 10000000, 0, 0, 0, 1000000, 1000000, 1000000, 
                        "", 0, 0, "", searchValue, false);
                        console.log(searchValue);
                    }
                    else if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'sale', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'sale', false);
                    }
                } 
                else if (type === 'Renting') {
                    console.log(searchValue);
                    if(searchValue)
                    {
                        data = await searchAllItems(0, 'rent', 0, 10000000, 0, 0, 0, 1000000, 1000000, 1000000, 
                        "week", 0, 100000, "month", searchValue, false);
                    }
                    else if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'rent', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'rent', false);
                    }
                } else if (type === 'PrivateLessons') {
                    if(searchValue)
                    {
                        data = await searchAllItems(0, 'lesson', 0, 10000000, 0, 0, 0, 1000000, 1000000, 1000000, 
                        "", 0, 0, "", searchValue, false);
                    }
                    else if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'lesson', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'lesson', false);
                    }
                } else if (type === 'LostItems') {
                    if(searchValue)
                    {
                        data = await searchAllItems(0, 'lost', 0, 10000000, 0, 0, 0, 1000000, 1000000, 1000000, 
                        "", 0, 0, "", searchValue, false);
                    }
                    else if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'lost', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'lost', false);
                    }
                } else if (type === 'FoundItems') {
                    if(searchValue)
                    {
                        data = await searchAllItems(0, 'found', 0, 10000000, 0, 0, 0, 1000000, 1000000, 1000000, 
                        "", 0, 0, "", searchValue, false);
                    }
                    else if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'found', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'found', false);
                    }
                }  else if (type === 'CourseTrading') 
                    {
                    if(Object.keys(filterValue).length > 0)
                    {
                        data = await filterAllItems(filterValue.offset, 'found', filterValue.minPrice, filterValue.maxPrice, filterValue.minDay, filterValue.minMonth,
                        filterValue.minYear, filterValue.maxDay, filterValue.maxMonth, filterValue.maxYear, filterValue.durationOfPrice, filterValue.minAvailabilityScalar, 
                        filterValue.maxAvailabilityScalar, filterValue.availabilityDuration, filterValue.courseName, filterValue.sectionNo, filterValue.wantToGive, 
                        filterValue.sortBy, false);
                        console.log(filterValue);
                    }
                    else
                    {
                        data = await getAllItems(0, 'course', false);
                    }
                }
                else {
                    // Handle other types if needed
                }
                if (data) {
                    setProducts(data); // Assuming the data is an array of items
                    console.log(data);
                }
            } catch (error) {
                console.error('Error in fetching items:', error);
                // Handle the error or set an appropriate state to indicate an error
            } finally {
                setLoading(false); // Set loading to false after fetching data (success or error)
            }
        };

        fetchData();
    }, [filterValue, searchValue, type]);
 

    /**filter = database; */
    // let products = setList(type/*filter*/);
/*    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    let component;
    //console.log(productIn)
 
    if (type.type === pages[0]) {
        <ProductList products={products} type="Market" />
    }
    else if (type.type === pages[1]) {
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
            <div className='grid grid-cols-5 gap-4'>
                {products}
            </div>
        </div>
    }
    else if (type.type === pages[2]) {
        component = <div className='flex flex-col justify-center py-10 w-220' style={{ marginLeft: '45px', marginRight: '45px' }}>
            {products}
        </div>
    }
    else if (type.type === pages[3]) {
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
            <div className='grid grid-cols-4 gap-4'>
                {products}
            </div>
        </div>
    }
    else if (type.type === pages[4]) {
        component = <div className='flex flex-row mx-auto justify-center items-center py-10 w-220'>
            <div className='grid grid-cols-4 gap-4'>
                {products}
            </div>
        </div>
    }
    else {
        component = <div>
            <strong>Unknown Error</strong>
        </div>
    } */


    return (
        <div className='h-full bg-gray-light'>
            {loading ? (
                <div>
                <CircularProgress color='primary' className='justify-center flex self-center h-3' />
                </div>) 
                : (
                // Render the content once data has been loaded
                type === 'Market' || type === 'Renting' || type === 'PrivateLessons' || type == 'CourseTrading' ? (
                    <ProductList products={products} type={type} />
                ) : type === 'LostItems' || type === 'FoundItems'?  (
                    <BlogList products={products} type={type} />
                ) : (
                  <div></div>  
                )
            )}
        </div>
    );
      
}

export default Feed;
