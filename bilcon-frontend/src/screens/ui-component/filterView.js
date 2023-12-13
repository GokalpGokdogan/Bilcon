import React, {useState} from 'react';
import { Link } from 'react-router-dom';



function FilterView({type = 'Course Trading'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)

    const [filters, setFilters] = useState({
        numberOfItems: 2,
        offset: 0,
        itemType: 'course',
        minPrice: 0,
        maxPrice: 10000,
        minDay: 1,
        minMonth: 1,
        minYear: 1,
        maxDay: 25,
        maxMonth: 12,
        maxYear: 2023,
        durationOfPrice: 'week',
        minAvailabilityScalar: 0,
        maxAvailabilityScalar: 100,
        availabilityDuration: 'month',
        courseName: 'bookss',
        sectionNo: 2,
        wantToGive: true,
        sortBy: 1
    });

    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    const filterNames = {
        numberOfItems: 'Number Of Items',
        minPrice: 'Min Price',
        maxPrice: 'Max Price',
        offset: 'Offset',
        sortBy: 'Sort By',
        minDay: 'Min Day',
        minMonth: 'Min Month',
        minYear: 'Min Year',
        maxDay: 'Max Day',
        maxMonth: 'Max Month',
        maxYear: 'Max Year',
        durationOfPrice: 'Duration Of Price',
        minAvailabilityScalar: 'Min Availability Scalar',
        maxAvailabilityScalar: 'Max Availability Scalar',
        availabilityDuration: 'Availability Duration',
        courseName: 'Course Name',
        sectionNo: 'Section No',
        wantToGive: 'Want To Give'
    };

    const filterTypes = {
        numberOfItems: 'number',
        offset: 'number',
        itemType: 'text',
        minPrice: 'number',
        maxPrice: 'number',
        minDay: 'number',
        minMonth: 'number',
        minYear: 'number',
        maxDay: 'number',
        maxMonth: 'number',
        maxYear: 'number',
        durationOfPrice: 'text',
        minAvailabilityScalar: 'number',
        maxAvailabilityScalar: 'number',
        availabilityDuration: 'text',
        courseName: 'text',
        sectionNo: 'number',
        wantToGive: 'checkbox',
        sortBy: 'number'
    };

    let component;
    //console.log(productIn)
    const handleInputChange = (event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value
        });
    };
        console.log(type,type == pages[0])
    if(type == pages[0]){
        component=  <div className='text-ui-purple border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['numberOfItems', 'minPrice', 'maxPrice', 'offset', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium ">{filterNames[key]}</label>
                                <input
                                    name={key}
                                    type={filterTypes[key]}
                                    value={filters[key]}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-black rounded-md text-black"
                                />
                            </div>
                        ))}
                    </div>
    }
    else if(type == pages[1]){
        component=  <div className='text-ui-purple border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['numberOfItems', 'sortBy', 'minPrice', 'maxPrice', 'durationOfPrice', 'minAvailabilityScalar', 'maxAvailabilityScalar', 'availabilityDuration', 'offset'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium ">{filterNames[key]}</label>
                                <input
                                    name={key}
                                    type={filterTypes[key]}
                                    value={filters[key]}
                                    onChange={handleInputChange}
                                    className="mt-0.5 p-1 block w-full border border-black rounded-md text-black"
                                />
                            </div>
                        ))}
                    </div>
    }
    else if(type == pages[2]){
        component=  <div className='text-ui-purple border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['minDay', 'minMonth', 'minYear', 'maxDay', 'maxMonth', 'maxYear', 'offset', 'numberOfItems', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium ">{filterNames[key]}</label>
                                <input
                                    name={key}
                                    type={filterTypes[key]}
                                    value={filters[key]}
                                    onChange={handleInputChange}
                                    className="mt-0.5 p-1 block w-full border border-black rounded-md text-black"
                                />
                            </div>
                        ))}
                    </div>
    }
    else if(type == pages[3]){
        component=  <div className='text-ui-purple border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['minPrice', 'maxPrice', 'offset', 'numberOfItems', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            <div key={key} className="mb-2">
                                <label className="block text-sm font-medium ">{filterNames[key]}</label>
                                <input
                                    name={key}
                                    type={filterTypes[key]}
                                    value={filters[key]}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-black rounded-md text-black"
                                />
                            </div>
                        ))}
                    </div>
    }
    else if(type == pages[4]){
        component=  <div className='text-ui-purple border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['numberOfItems', 'offset', 'sortBy', 'courseName', 'sectionNo', 'wantToGive'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            <div key={key} className="mb-2 mr-auto">
                                <label className="block text-sm font-medium">{filterNames[key]}</label>
                                <input
                                    name={key}
                                    type={filterTypes[key]}
                                    value={filters[key]}
                                    onChange={handleInputChange}
                                    className="mt-1 p-2 block w-full border border-black rounded-md text-black"
                                />
                            </div>
                        ))}
                    </div>
    }
    else {
        component = <div>
            <strong>Unknown Error</strong>
        </div>
    }

    return(
        
        <div className="bg-gray-blue w-[25vw] z-10 absolute top-full left-0 border-ui-purple shadow-lg rounded-lg p-4 transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">
            {/* Your popup content goes here */}
            {component} 
            <button className="mt-4 bg-ui-purple text-white w-full py-2 rounded hover:bg-purple-700 transition duration-200 ease-in-out">
                Submit
            </button>
        </div>

       
    );
}

export default FilterView;
