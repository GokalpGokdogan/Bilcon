import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';



function FilterView({type = 'Course Trading', setIsOpen, filterValue, setFilterValue} ) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)

    const [filters, setFilters] = useState({
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
        courseName: 'books',
        sectionNo: 2,
        wantToGive: true,
        sortBy: 1
    });

    useEffect(() => {
        // Log the latest filterValue when it changes
        console.log(filterValue);
      }, [filterValue]);

    const pages = ['Market', 'Renting', 'LostandFound', 'PrivateLessons', 'CourseTrading'];

    const filterNames = {
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
        let value = event.target.value;

        if (filterTypes[event.target.name] === 'number') {
            value = Number(value);
        }
        else if (filterTypes[event.target.name] === 'checkbox') {
            value = Boolean(event.target.checked);
        }

        setFilters(prevFilters => ({
            ...prevFilters,
            [event.target.name]: value
        }));

        setFilterValue(prevFilterValue => ({
            ...prevFilterValue,
            [event.target.name]: value
        }));
    };
    
    function buttonComponent(key){
        return <div key={key} className="mb-2 mr-auto">
                    <label className="block text-sm font-medium">{filterNames[key]}</label>
                    {key === 'wantToGive' ? (
                        <button
                            onClick={() => setFilters({
                                ...filters,
                                [key]: !filters[key]
                            })}
                            className="mt-0.5 p-1 block w-full border rounded-md text-white bg-ui-purple rounded hover:bg-purple-700 transition duration-200 ease-in-out"
                        >
                            {filters[key] ? 'Yes' : 'No'}
                        </button>
                    ) : (
                        <input
                            name={key}
                            type={filterTypes[key]}
                            value={filters[key]}
                            onChange={handleInputChange}
                            className="mt-0.5 p-1 block w-full border border-black rounded-md text-black"
                        />
                    )}
                </div>;
    }                       

    if(type == pages[0]){
        component=  <div className='text-ui-purple font-sans border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filters</h1>
                        {Object.keys(['numberOfItems', 'minPrice', 'maxPrice', 'offset', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            buttonComponent(key)
                        ))}
                    </div>
    }
    else if(type == pages[1]){
        component=  <div className='text-ui-purple font-sans border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['numberOfItems', 'sortBy', 'minPrice', 'maxPrice', 'durationOfPrice', 'minAvailabilityScalar', 'maxAvailabilityScalar', 'availabilityDuration', 'offset'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            buttonComponent(key)
                        ))}
                    </div>
    }
    else if(type == pages[2] || pages[3]){
        component=  <div className='text-ui-purple font-sans border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['minDay', 'minMonth', 'minYear', 'maxDay', 'maxMonth', 'maxYear', 'offset', 'numberOfItems', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            buttonComponent(key)
                        ))}
                    </div>
    }
    else if(type == pages[4]){
        component=  <div className='text-ui-purple font-sans border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['minPrice', 'maxPrice', 'offset', 'numberOfItems', 'sortBy'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            buttonComponent(key)
                        ))}
                    </div>
    }
    else if(type == pages[5]){
        component=  <div className='text-ui-purple font-sans border-black'>
                        <h1 className="text-2xl font-bold mb-4">Filter View</h1>
                        {Object.keys(['numberOfItems', 'offset', 'sortBy', 'courseName', 'sectionNo', 'wantToGive'].reduce((obj, key) => {
                            if (filters[key] !== undefined) {
                                obj[key] = filters[key];
                            }
                            return obj;
                        }, {})).map(key => (
                            buttonComponent(key)
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
            <button
            onClick={() => {
                setIsOpen(false);
                setFilterValue(filters);
                console.log(filters); // Log the latest filters state
            }}
            className="mt-4 bg-ui-purple font-sans text-white w-full py-2 rounded hover:bg-blue-dark transition duration-200 ease-in-out"
            >
            Submit
            </button>
        </div>

       
    );
}

export default FilterView;
