import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Product from '../../Classes/Product'






function Message({type = 'Self', text="Wow Gökalp Çok Yaqışıklı"} /*{nameIn="Nameless", priceIn=-1, sellerIn="@Gokalp", imgIn='https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg', key="" }*/) 
{
    
    /**filter = database; */
    // let products = setList(/*filter*/);
    // console.log(productIn.productIn)



    // const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];

    
    
    
    let component;
    
    if(type === 'Self'){
        component = 
            <div className="flex justify-end mb-4">
                <div className="bg-ig-purple rounded-lg p-2 text-white max-w-xs">
                    <p>{text}</p>
                </div>
            </div>
    }
    else if(type === 'Other'){
        component = 
            <div className="flex justify-start mb-4">
                <div className="bg-gray-light rounded-lg p-2 max-w-xs">
                    <p>{text}</p>
                </div>
            </div>
    }
    else {
        component = <div>
            <strong>Unknown Error</strong>
        </div>
    }

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
        
        <div>
            
            {component}
            
        </div>

       
    );
}

export default Message;
