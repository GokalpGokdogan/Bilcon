import React, {useState} from 'react';
import NavMenu from '../ui-component/navMenu';
import Feed from '../ui-component/feed';
import Header from '../ui-component/header';
import { searchAllItems } from '../../utils/Requests';



function Market() {
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = async () => {
        try {
            const data = await searchAllItems({"offset": 0, 
            "itemType": "sale", 
            "minPrice": 0, 
            "maxPrice": 10000, 
            "minDay": 6, 
            "minMonth": 10, 
            "minYear": 2023, 
            "maxDay": 7, 
            "maxMonth": 10, 
            "maxYear": 2023, 
            "durationOfPrice": "week", 
            "minAvailabilityScalar": 0, 
            "maxAvailabilityScalar": 100, 
            "availabilityDuration": "month", 
            "searchQuery": searchValue,
            "onlyPostedByOthers": false});
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Error in fetching items:', error);
        }
    };

    return (
        <div className='bg-gray-light flex flex-col gap-3 h-full'>
            <div className='fixed top-0 w-full bg-white z-10'>
                <Header type='Market' setSearchValue={setSearchValue} searchValue={searchValue} handleSearch={handleSearch}/>
                <NavMenu currPage='Market' />
            </div>
            <div className=' mt-28 flex justify-center h-full' >
            <div className='w-full max-w-screen-lg h-full'>
                    <Feed type='Market' searchValue={searchValue}/>
            </div>
            </div>
        </div>
    );
}

export default Market;
