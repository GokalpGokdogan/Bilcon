import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterView from './filterView';
import FavPop from './favPop';
import ChatsPop from './chatsPop';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';

function Header({type = 'Market', setSearchValue, searchValue, filterValue, setFilterValue}) {
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenFav, setIsOpenFav] = useState(false);
    const [isOpenChats, setIsOpenChats] = useState(false);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setSearchValue(searchValue);
            console.log(searchValue);
        }
    };

    return (
        <div className='flex flex-row p-2 px-4 w-full justify-between bg-white'>
            <div className='w-[10vw]'>
                <Link to="/market" onMouseOver={(e) => {
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    let repetitons = 0;
                    const interval = setInterval(
                        () => {
                            e.target.innerText = e.target.innerText.split('').map((letter, index) => {
                                if (index < repetitons) {
                                    return e.target.dataset.value[index]
                                }
                                return letters[Math.floor(Math.random() * letters.length)]

                            }).join('')
                            if (repetitons >= e.target.dataset.value.length) {
                                clearInterval(interval)

                            }
                            repetitons += 3 / 4;
                        }, 30)
                }} data-value="BILCON" className='font-inter font-extrabold text-3xl text-blue-dark'>BILCON</Link>
            </div>
            <div className='flex flex-row justify-center'>
                <div className='relative flex items-center'>
                    <input
                        onKeyDown={handleKeyDown}
                        type="text"
                        className="mx-1 bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-lg p-2.5 w-96 pl-10 pr-10" // Add pl-10 and pr-10 for left and right padding
                        placeholder="Search for second-hand items, books and more!"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='absolute left-3 top-1/2 transform -translate-y-1/2'>
                        <FilterListIcon onClick={() => setIsOpenFilter(!isOpenFilter)} className="text-blue-dark transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100" />
                    </div>
                    {isOpenFilter && (
                        <FilterView type={type.type} isOpen={isOpenFilter} setIsOpen={setIsOpenFilter} filterValue={filterValue} setFilterValue={setFilterValue}/>
                    )}
                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2'>
                        <SearchIcon onClick={setSearchValue(searchValue)} className="text-blue-dark transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100" />
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center'>
                <div className='flex relative'>
                    {/* <button onClick={() => setIsOpenChats(!isOpenChats)} className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Chats</button> */}
                    <ChatIcon onClick={() => setIsOpenChats(!isOpenChats)} className="text-blue-dark transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100 mr-2 mt-1" />
                    {isOpenChats && (
                        <div className="absolute right-0 top-full">
                            <ChatsPop type={type.type} />
                        </div>
                    )}
                </div>
                <div className='relative'>
                    {/* <button onClick={() => setIsOpenFav(!isOpenFav)} className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Fav.</button> */}
                    <FavoriteBorderIcon onClick={() => setIsOpenFav(!isOpenFav)}  className="text-blue-dark transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100 mr-2" />
                    {isOpenFav && (
                        <div className="absolute right-0 top-full">
                            <FavPop type={type.type} />
                        </div>
                    )}
                </div>
                <div>
                    <Link type="submit" to="/accountPage"><AccountCircleIcon className="text-blue-dark transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100" /></Link>
                </div>

            </div>
        </div>);
}

export default Header;
