import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterView from './filterView';
import FavPop from './favPop';
import ChatsPop from './chatsPop';


function Header(type='Market') 
{

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [isOpenFav, setIsOpenFav] = useState(false);
    const [isOpenChats, setIsOpenChats] = useState(false);
    return(
    <div className='flex flex-row p-2 px-4 w-full justify-between'>
        <div className='w-[10vw]'>
            <Link to="/market" onMouseOver={(e) =>{
                const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let repetitons = 0;
                const interval = setInterval(
                    () => {
                        e.target.innerText = e.target.innerText.split('').map((letter, index) => {
                            if(index<repetitons){
                                return e.target.dataset.value[index]
                            }
                            return letters[Math.floor(Math.random() * letters.length)]
                    
                        }).join('')
                        if(repetitons>=e.target.dataset.value.length){
                            clearInterval(interval)
                            
                        }
                        repetitons+=3/4;
                    },30)
                }} data-value="BILCON" className='font-inter font-extrabold text-3xl text-blue-dark'>BILCON</Link>
        </div>
        <div className='flex flex-row justify-center'>
            <input type="text" className="mx-2 border border-gray bg-gray-light text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-2.5 w-80" placeholder="Search for second-hand items, books and more!" required=""></input>
            <div className='relative'>
                <button onClick={() => setIsOpenFilter(!isOpenFilter)} className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Filter</button>
                {isOpenFilter && (
                    <FilterView type={type.type} isOpen={isOpenFilter} setIsOpen={setIsOpenFilter}/>
                )}
            </div>
        </div>
        <div className='flex flex-row justify-center'>
            <div className='relative'>
                <button onClick={() => setIsOpenChats(!isOpenChats)} className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Chats</button>
                {isOpenChats && (
                    <div className="absolute right-0 top-full">
                        <ChatsPop type={type.type}/>
                    </div>
                )}
            </div>
            <div className='relative'>
                <button onClick={() => setIsOpenFav(!isOpenFav)} className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Fav.</button>
                {isOpenFav && (
                    <div className="absolute right-0 top-full">
                        <FavPop type={type.type}/>
                    </div>
                )}
            </div>
            <div>
                <Link type="submit" to="/accountPage" className="bg-ui-purple text-white py-2 px-4 font-bold rounded transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">Account</Link>
            </div>

        </div>
    </div>);
}

export default Header;
