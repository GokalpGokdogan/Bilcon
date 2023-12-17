import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Product from '../../Classes/Product'



function setList(/*type,pageOffset*/){
    let list = [];
    for (let i = 0; i < 10; i++) {
        
        let obj = new Product();
        obj.productId=10+i*i*1.5
        
        
        list.push(
            <Link to='/detailsPage' className='bg-gray-blue rounded-md' key={obj.id}>
                <div className='m-6'>
                    <img            
                    className="h-28 w-21 rounded-md "
                        alt=''
                        src={`${obj.img} `}
                    />
                    <div className='w-auto flex flex-col justify-center items-left mt-3 text-ellipsis' style={{fontSize:'12px'}}>
                        <strong className='text-ui-purple'>{obj.name}</strong>
                        <p>{(obj.seller).replace('@','')}</p>
                    </div>
                </div>
            </Link>
        );
    }
    return list;
}

function FavPop({type = 'Course Trading'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)



    // const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    const list = setList();

    
    const [pageOffset, setPageOffset] = useState(0);
    const maxOffset = list.length/10 + (list.length%10===0 ? 0 : 1);

    let component = list;
    //console.log(productIn)

    
    // if(type == pages[0]){
    //     component=  
    // }
    // else if(type == pages[1]){
    //     component=  
    // }
    // else if(type == pages[2]){
    //     component=  
    // }
    // else if(type == pages[3]){
    //     component=  
    // }
    // else if(type == pages[4]){
    //     component=  
    // }
    // else {
    //     component = <div>
    //         <strong>Unknown Error</strong>
    //     </div>
    // }
    
    return(
        
        <div className={'bg-gray-blue w-[80vw] z-10 absolute top-full left-[-80vw] h-[45vw] border-ui-purple shadow-lg rounded-lg p-4'}>
            <div className='flex flex-row h-[45vw] w-240 justify-center items-center justify-between'>
                
                <button 
                    onClick={()=>{if(pageOffset > 0){ setPageOffset(pageOffset - 1);}}} 
                    disabled={pageOffset===0} 
                    className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold transition duration-200 ease-in-out ${
                        pageOffset===0 ? 'text-gray-blue' : 'hover:bg-ui-purple hover:text-white'}`}
                >back</button>
                <div className='flex flex-row mx-auto justify-center items-center py-1 w-220'>
                    <div className='grid grid-cols-5 gap-2'>
                        {component}
                    </div>
                </div> 
                 
                    <button 
                        onClick={()=>{if(pageOffset < maxOffset){ setPageOffset(pageOffset + 1);}}} 
                        disabled={pageOffset===maxOffset} 
                        className={`flex flex-row justify-center items-center bg-gray-blue rounded-md px-4 py-1.5 text-ui-purple text-sm font-bold transition duration-200 ease-in-out ${
                            pageOffset===maxOffset ? 'text-gray-blue' : 'hover:bg-ui-purple hover:text-white'}`}
                    >
                        next
                    </button>
            </div>
            
        </div>

       
    );
}

export default FavPop;
