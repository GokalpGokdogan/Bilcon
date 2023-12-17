import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Product from '../../Classes/Product'






function Message({sender, text} )
{

    let component;
    
    if(sender === "657c3d9453e88c291cb70aaf"){
        component = 
            <div className="flex justify-end mb-4">
                <div className="bg-ig-purple rounded-lg p-2 text-white max-w-xl break-words">
                    <p>{text}</p>
                </div>
            </div>
    }
    else {
        component = 
            <div className="flex justify-start mb-4">
                <div className="bg-gray-light rounded-lg p-2 max-w-xl break-words">
                    <p>{text}</p>
                </div>
            </div>
    }
   /*  else {
        component = <div>
            <strong>Unknown Error</strong>
        </div>
    } */
    return(
        
        <div>
            
            {component}
            
        </div>

       
    );
}

export default Message;
