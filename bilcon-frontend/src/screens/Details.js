// DetailsPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from './ui-component/header';
import NavMenu from './ui-component/navMenu';
import Product from '../Classes/Product';
import { getItemWithItemId,createConversation } from '../utils/Requests';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const DetailsPage = ({ match }) => {
    const {itemType, itemId } = useParams();
  //const itemId = match.params.itemId; // Access the item ID from the URL parameter
    const [product, setProduct] = useState({});

    const handleFavoritesSale = async () => {
        let curr = await getItemWithItemId(itemId, itemType);
        console.log(curr);
        if (curr) {
            setProduct(curr);
        }
    };

    const createChat = async () => {
        let curr = await createConversation(["657cdc55ad49a566f0d00109", "657c3d9453e88c291cb70aaf"]);
        console.log(curr);
        //navigate to cartcurt
    };
    
    useEffect(() => {
        handleFavoritesSale();
    }, []); // <-- Dependency array should be inside the parentheses
    
  //const [type, setType] = useState(itemType);

  console.log(itemType);
  /* const product = {
    name: "Product Name",
    definition: "Product Definition",
    price: 10.99,
    durationOfPrice: "month",
    availabilityScalar: 5,
    availabilityDuration: "days",
    place: "Product Place",
    day: 14,
    month: 3,
    year: 2003,
    sectionNo: 2,
    wantToGive: true,
    itemType: "sale",
    img: "https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg",
  } */
/*   const [otherUser, setOtherUser] = useState({
    name: "Goki Gokdog",
    email: "goki@example.com",
    studentId: "123456789",
    password: "********",
    isVerified: true,
    posterId: "poster123",
    customerId: "customer456",

    rating: 3.5,
    raterCount: 10
  }); */
  //"rent", "lost", "found", "lesson", "course"
      const pages = ['sale', 'rent', 'lost', 'lesson','course', 'found'];
      const starIcons = Array.from({ length: 5 /**account.rating.ceil */ }, (_, i) => (
          <svg key={i} className='my-auto' width="1vw" height="1vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>Star</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill="#F8E71C" stroke="none" stroke-width="2">
                      <g id="Group-2" transform="translate(0.000000, -1.000000)">
                          <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702242 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                      </g>
                  </g>
              </g>
          </svg>
      ));
      const starIconsSpecial = Array.from({ length: 5  }, (_, i) => (
        
          <svg className='my-auto' width="1vw" height="1vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <title>Star</title>
              <desc>Created with Sketch.</desc>
              <defs></defs>
              <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill={ (Math.ceil(5)-1<i)?"#979797":"#F8E71C"} stroke="none" stroke-width="2">
                      <g id="Group-2" transform="translate(0.000000, -1.000000)">
                          <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702242 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                      </g>
                  </g>
              </g>
          </svg>
    ));
      const line = <hr className='border-gray border-1 w-100 my-[1vw]'/>
      const user = <div className='flex flex-row items-center mb-[1vw]'>
                      <div className='mt-0 flex flex-row'>
                          <div className='mr-[1vw]'>
                            <strong className='text-[14px] mt-0'>{product.posterName}</strong>
                          </div>
                          <div className='flex flex-row mt-0'>
                              {/* {starIcons} */}
                              {starIconsSpecial}
                          </div>
                      </div>
                  </div>
      let component;
      console.log(product)
      if (itemType == "sale") {
          component = <div className='flex flex-col bg-gray-light justify-center items-center font-sans'>

                          <Header/>
                          <NavMenu currPage="Details Page"/>
                          <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                          <div className='flex flex-row bg-white rounded-xl shadow-sm'>
                              <div>
                                  <img
                                      className="h-[32vw] w-[24vw] rounded-md m-[2vw] object-contain"
                                      alt=''
                                      src={`data:image/jpeg;base64,${product.photo} `}
                                  />
                                  
                              </div>
                              <div className='block h-[20vw] w-[50vw]'>
                                  <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                      {user}
                                      {line}
                                      <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                          <p>
                                              {product.definition}
                                          </p>
                                          <div style={{ paddingTop: '50%' }}></div>
                                      </div>
                                      {line}
                                      <p>
                                          <strong>Price:</strong> {product.price} TL
                                      </p>
                                      {line}
                                      {/* DM */}
                                      <div>
                                      {/*     <Link to='/Market' /**Change it to correct form className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id >
                                              DM {(otherUser.name)}
                                          </Link> */}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>  
      } else if (itemType == "rent") {
          component = <div className='flex flex-col bg-gray-light justify-center items-center'>

                          <Header/>
                          <NavMenu currPage="Details Page"/>
                          <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                          <div className='flex flex-row bg-white rounded-xl shadow-sm'>
                              <div>
                              <img
                                      className="h-[32vw] w-[24vw] rounded-md m-[2vw] object-contain"
                                      alt=''
                                      src={`data:image/jpeg;base64,${product.photo} `}
                                  />
                              </div>
                              <div className='block h-[20vw] w-[50vw]'>
                                  <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                      {user}
                                      {line}
                                      <div className='relative flex-col h-36 w-[45vw] overflow-hidden text-ellipsis '>
                                          <p>
                                              {product.definition}
                                          </p>
                                          <div style={{ paddingTop: '50%' }}></div>
                                      </div>
                                      {line}
                                      <p>
                                          <strong>Price:</strong> {product.price} TL/{product.rentDurationType}  <strong> Total Price: </strong>{product.price*product.availabilityScalar /**scalar */} TL 
                                      </p>
                                      {line}
                                      {/* DM */}
                                      <div>
                                          <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                              DM {product.posterName}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>  
      } else if (itemType == "lost") {
          component = <div className='flex flex-col bg-gray-light justify-center items-center font-sans'>

                          <Header/>
                          <NavMenu currPage="Details Page"/>
                          <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                          <div className='flex flex-row bg-white rounded-xl shadow-sm'>
                              <div className='block h-[20vw] w-[50vw]'>
                                  <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                      {user}
                                      <div className='flex flex-row text-ui-pruple items-stretch'>
                                          <div className='flex flex-row mr-auto'>
                                          <LocationOnIcon className='text-xs text-gray -ml-1'/>
                                              <p className='text-gray'> {product.place} </p> 
                                          </div>

                                          <p className='text-gray mr-4'>{product.dayOfLose}/{product.monthOfLose}/{product.yearOfLose} </p>
                                      </div>
                                      {line}
                                      <div className='relative flex-col h-16 w-[45vw] overflow-hidden text-ellipsis '>
                                          <p>
                                              {product.definition}
                                          </p>
                                          <div style={{ paddingTop: '50%' }}></div>
                                      </div>
                                      
                                      
                                      {line}
                                      {/* DM */}
                                      <div>
                                          <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                              DM {product.posterName}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              


                          </div>
                          
                      </div>
      } else if (itemType == "found") {
          component = <div className='flex flex-col bg-white justify-center items-center'>

                          <Header/>
                          <NavMenu currPage="Details Page"/>
                          <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                          <div className='flex flex-row bg-gray-light rounded-xl'>
                              <div className="flex h-[34vw] w-[32vw] items-center justify-center">
                                <img
                                      className="h-[32vw] w-[24vw] rounded-md m-[2vw] object-contain"
                                      alt=''
                                      src={`data:image/jpeg;base64,${product.photo} `}
                                  />
                              </div>
                              <div className='block h-[20vw] w-[50vw]'>
                                  <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                      {user}
                                      <div className='flex flex-row text-ui-pruple items-stretch'>
                                          <div className='flex flex-row mr-auto'>
                                          <LocationOnIcon className='text-xs text-gray -ml-1'/>
                                              <p className='text-gray'> {product.place} </p> 
                                          </div>

                                          <p className='text-gray mr-4'>{product.dayOfFind}/{product.monthOfFind}/{product.yearOfFind} </p>
                                      </div>
                                      {line}
                                      <div className='relative flex-col h-[16vw] w-[45vw] overflow-hidden text-ellipsis '>
                                          <p>
                                              {product.definition}
                                          </p>
                                          <div style={{ paddingTop: '50%' }}></div>
                                      </div>
                                      
                                      {line}
                                      <p>
                                      <strong>Price:</strong> {product.price} TL/hour
                                      </p>
                                      {line}
                                      {/* DM */}
                                      <div>
                                          <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                              DM {product.posterName}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              


                          </div>
                          
                      </div>
          } else if (itemType == "lesson") {
          component = <div className='flex flex-col bg-white justify-center items-center'>

                          <Header/>
                          <NavMenu currPage="Details Page"/>
                          <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-1'>{product.name}~{product.sectionNo}</h1>
                          <div className='flex flex-row bg-gray-light rounded-xl'>
                              <div>
                              <img
                                      className="h-[32vw] w-[24vw] rounded-md m-[2vw] object-contain"
                                      alt=''
                                      src={`data:image/jpeg;base64,${product.photo} `}
                                  />
                              </div>
                              <div className='block h-[20vw] w-[50vw]'>
                                  <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                      {user}
                                      <div className='flex flex-row text-ui-pruple items-stretch'>
                                          <div className='flex flex-row mr-auto'>
                                              <img className='h-4 w-4 my-auto mr-[1vw]' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                                              <p className='text-gray'> {product.place} </p> 
                                          </div>

                                          <p className='text-gray mr-4'>{product.day}/{product.month}/{product.year} </p>
                                      </div>
                                      {line}
                                      <div className='relative flex-col h-[16vw] w-[45vw] overflow-hidden text-ellipsis '>
                                          <p>
                                              {product.definition}
                                          </p>
                                          <div style={{ paddingTop: '50%' }}></div>
                                      </div>
                                      {/* {line} */}
                                      {/* <p>
                                      <strong>Section:</strong> {/*product.section} 2
                                      </p> */}
                                      
                                      {line}
                                      {/* DM */}
                                      <div>
                                          <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                              DM {product.posterName}
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              


                          </div>
                          
                      </div>
      } else if (itemType == "course") {
        component = <div className='flex flex-col bg-white justify-center items-center'>

                        <Header/>
                        <NavMenu currPage="Details Page"/>
                        <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>{product.name}</h1>
                        <div className='flex flex-row bg-gray-light rounded-xl'>
                            <div>
                                 <img
                                      className="h-[32vw] w-[24vw] rounded-md m-[2vw] object-contain"
                                      alt=''
                                      src={`data:image/jpeg;base64,${product.photo} `}
                                  />
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                <div className='flex flex-col justify-center text-ellipsis m-6 items-left'>
                                    {user}
                                    <div className='flex flex-row text-ui-pruple items-stretch'>
                                      <div className='flex flex-row mr-auto'>
                                        <img className='h-4 w-4 my-auto mr-[1vw]' alt='' src='https://png.pngtree.com/png-clipart/20191121/original/pngtree-vector-location-icon-png-image_5159127.jpg'/>
                                        <p className='text-gray'> {product.place} </p> 
                                      </div>

                                      <p className='text-gray mr-4'>{product.day}/{product.month}/{product.year} </p>
                                    </div>
                                    {line}
                                    <div className='relative flex-col h-[20vw] w-[45vw] overflow-hidden text-ellipsis '>
                                        <p>
                                            {product.definition}
                                        </p>
                                        <div style={{ paddingTop: '50%' }}></div>
                                    </div>
                                    
                                    
                                    {line}
                                    {/* DM */}
                                    <div>
                                        <Link to='/Market' /**Change it to correct form */ className='bg-ui-purple rounded-md text-white p-3 inline-block' key={product.id}/**Change it to correct id */>
                                            DM {product.posterName}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            


                        </div>
                        
                    </div>
      }else {
          component = <div>
          <strong>Unknown Error</strong>
          </div>;
      }
        
    
  return (
    <div>
      {/* <h2>Details Page</h2>
      <p>Item ID: {itemId}</p> */}
      {/* Display other details here */}
      {component}
    </div>
  );
};

export default DetailsPage;
