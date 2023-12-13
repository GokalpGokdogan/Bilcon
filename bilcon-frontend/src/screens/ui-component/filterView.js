import React from 'react';
import { Link } from 'react-router-dom';



function FilterView({type = 'Market'} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)


    const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    let component;
    //console.log(productIn)
        
    if(type.type === pages[0]){
        
    }
    else if(type.type === pages[1]){
        
    }
    else if(type.type === pages[2]){
        
    }
    else if(type.type === pages[3]){
        
    }
    else if(type.type === pages[4]){
        
    }
    else {
        component = <div>
            <strong>Unknown Error</strong>
        </div>
    }

    return(
        
        <div className="bg-gray-blue w-[25vw] h-[35vw] z-10 absolute top-full left-0 border-ui-purple shadow-lg rounded-lg p-4 transform transition-transform duration-200 ease-in-out scale-95 hover:scale-100">
            
            {/* Your popup content goes here */}
            {component}
            <div className="text-ui-purple text-center font-bold">Your Cool Content /**Your popup content goes here*/</div>
        </div>

       
    );
}

export default FilterView;
