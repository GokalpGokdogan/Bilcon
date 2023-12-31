import React,{useState, useEffect} from 'react';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';
import {message, Select, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Upload from './ui-component/Upload';
import { postItem } from '../utils/Requests';

    function AddItem() 
    {
        const pages = ['Market', 'Renting', 'Lost Items', 'Found Items','Private Lessons', 'Course Trading'];
        const [type, setType] = useState('Market');
        const [imageUrl, setImageUrl] = useState(null);
        const [file, setFile] = useState(null);

        const [item, setItem] = useState(null);

        //name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [price, setPrice] = useState(0);
        const [availabilityScalar, setAvailabilityScalar] = useState(0);
        const [availabilityDuration, setAvailabilityDuration] = useState('day');
        const [place, setPlace] = useState('');
        const [day, setDay] = useState(1);
        const [month, setMonth] = useState(1);
        const [year, setYear] = useState(2000);
        const [section, setSection] = useState(0);
        const [wantToGive, setWantToGive ] = useState(true);
        const [posterId, setPosterId] = useState('22222222');
        const [itemType, setItemType] = useState('sale');
        const [photo, setPhoto] = useState();
        const [uploadedFile, setUploadedFile] = useState(null);
        //ant design
        const { Option } = Select;

        let formData = new FormData();
        
        const line = <hr className='border-gray border-1 w-100 my-[1vw]'/>
        
        let component;

        
        const beforeUpload = (file) => {
            const isJpg = file.type === 'image/jpeg';

                if (!isJpg) {
                    message.error('You can only upload JPEG file!');
                }
                else{
                const reader = new FileReader();
                reader.onloadend = () => {
                // Set the base64 content to state and display the image preview
                setImageUrl(reader.result);
                };
                reader.readAsDataURL(file);
            }
                // Returning false prevents the default upload behavior
                return false;
        }

        const handleChange = (info) => {
            if (info.file.status === 'done') {
              setFile(info.file.originFileObj);
              // Log or perform any action after the state is updated
              console.log(file);
            } else if (info.file.status === 'error') {
              // Handle the case where the file upload fails
              console.error('File upload failed');
            } else {
              // Clear the file state when the file is removed
              setFile(null);
            }
          };
          
          

        const handleUpload = ({ file, onSuccess }) => {
            console.log(file);
            setPhoto(file);
            setTimeout(() => {
                onSuccess("ok");
            }, 2000);
        };
    
        const uploadButton = (
            <div>
                <PlusOutlined style={{color: "blue"}} />
                <div className="mt-8 font-sans text-blue-dark font-bold text-md" style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const pageValues = ['sale', 'rent', 'lost', 'found', 'lesson', 'course'];

        const typeSelect =  <div>                                    
                                <p className='text-gray font-bold'>Type</p>
                                <Select defaultValue={type} style={{ width: 180 }} onChange={(value) => { setType(pages[pageValues.indexOf(value)]); setItemType(value)/*handleChange(); /*setType(selectedType)*/}}>
                                    {pages.map((page,index) => <Option key={page} value={pageValues[index]} >{page}</Option>)}
                                </Select>
                            </div>

        const dateSelect =  <div className='flex flex-row'>
                                <input min={1} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-xs rounded-xl p-1.5 w-1/5" required={true} type='number' placeholder='Number of' onChange={(e)=>{setAvailabilityScalar(e.target.value)/**availabilityScalar */}}/>
                                <Select  defaultValue={'day'} style={{ width: 90 }} onChange={(e) => { setAvailabilityDuration(e)/**availabilityDuration */ }}>
                                    {['hour', 'day', 'week', 'month', 'year'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                </Select>
                            </div>

        useEffect(() => {
            // This effect will run every time the 'item' state is updated
            console.log(item, type, itemType, availabilityDuration);
            
        }, [item]);

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(name, description, price, availabilityScalar, availabilityDuration, place, day, month, year, section, wantToGive, posterId);
        };

        const submit =  <button type="submit" className="bg-ui-purple hover:bg-ig-purple text-white font-bold py-2 px-4 rounded duration-200 ease-in-out transform transition-transform scale-95 hover:scale-100"   onClick={async () => {
            try {
              // Set the item data
              setItem({
                name,
                description,
                price,
                availabilityScalar,
                availabilityDuration,
                place,
                day,
                month,
                year,
                sectionNo: section,
                wantToGive,
                itemType,
                posterId,
              });
      
              // Append file and other form data to formData
              formData.append('image', uploadedFile);
              formData.append('name', name);
              formData.append('definition', description);
              formData.append('price', price);
              formData.append('availabilityScalar', availabilityScalar);
              formData.append('availabilityDuration', availabilityDuration);
              formData.append('durationOfPrice', availabilityDuration);
              formData.append('place', place);
              formData.append('day', day);
              formData.append('month', month);
              formData.append('year', year);
              formData.append('sectionNo', section);
              formData.append('wantToGive', wantToGive);
              formData.append('itemType', itemType);
              formData.append('posterId', posterId);
      
              // Call the postItem function
              const response = await postItem(formData);
      
              // Log or handle the response
              console.log('Item posted successfully:', response);
      
            } catch (error) {
              // Handle errors
              console.error('Error posting item:', error);
            }
          }}
        >
                            Submit
                        </button>
        
        if (type === pages[0]) {
            component = <div className='flex flex-row '>
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                               {/*  <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="m-auto p-auto"
                                    showUploadList={false}
                                    onChange={handleChange}
                                    >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload> */}
                                <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    {typeSelect}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>TL</p>    
                                        </div>
                                    </div>


                                </div>
                                {submit}
                            </div>
                        </div>
                         
        } else if (type === pages[1]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                    <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    {typeSelect}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>TL</p>    
                                        </div>            
                                    </div>
                                    {/* Rent Duration */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Rent Duration</p>
                                        { dateSelect }
                                    </div>
                                    

                                </div>
                                {submit}
                            </div>
                        </div>
                    
        } else if (type === pages[2]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-row text-ellipsis m-3 w-[40vw]'>
                                    {typeSelect}
                                    {/* <div className='ml-auto'>                                    
                                        <p className='text-gray font-bold'>Lost or Found</p>
                                        <Select defaultValue={'lost'} style={{ width: 120 }} onChange={(value) => {console.log(value);setItemType(value)}}>
                                            {['lost','found'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                        </Select>
                                    </div> */}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {/* Info */}
                                <p className='text-gray font-bold'>Info</p>
                                {line}
                                <div className='flex flex-row'>
                                    {/* Loction */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Location</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='Text' placeholder='Location' onChange={(e)=>{setPlace(e.target.value)}}/>
                                             
                                        </div>            
                                    </div>
                                    {/* Date */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Date</p>
                                        <div className='flex flex-row'>
                                            <input min={0} max={31} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='DD' onChange={(e)=>{setDay(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={0} max={12} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='MM' onChange={(e)=>{setMonth(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={2000    } className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='YYYY' onChange={(e)=>{setYear(e.target.value)}}/>
                                            
                                        </div>            
                                    </div>
                                    

                                </div>
                                {submit}
                            </div>
                        </div>
        } else if (type === pages[3]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-row text-ellipsis m-3 w-[40vw]'>
                                    {typeSelect}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {/* Info */}
                                <p className='text-gray font-bold'>Info</p>
                                {line}
                                <div className='flex flex-row'>
                                    {/* Loction */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Location</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='Text' placeholder='Location' onChange={(e)=>{setPlace(e.target.value)}}/>
                                             
                                        </div>            
                                    </div>
                                    {/* Date */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Date</p>
                                        <div className='flex flex-row'>
                                            <input min={0} max={31} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='DD' onChange={(e)=>{setDay(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={0} max={12} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='MM' onChange={(e)=>{setMonth(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={2000    } className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='YYYY' onChange={(e)=>{setYear(e.target.value)}}/>
                                            
                                        </div>            
                                    </div>
                                    

                                </div>
                                {submit}
                            </div>
                        </div>
        } else if (type === pages[4]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    {typeSelect}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={(e)=>{setPrice(e.target.value)}}/>
                                            <p className='text-gray my-auto mx-2'>TL/hour</p>    
                                        </div>            
                                    </div>
                                    {/* Rent Duration */}
                                    {/* <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Duration</p>
                                        <div className='flex flex-row'>
                                            <input min={1} max={24} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-xs rounded-xl p-1.5 w-1/3" required={true} type='number' placeholder='Num' onChange={(e)=>{/**availabilityScalar }}/>
                                            <p className='text-gray my-auto mx-2'> hours</p>
                                        </div>
                                    </div>
                                     */}


                                </div>
                                {submit}
                            </div>
                        </div>
           } else if (type === pages[5]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                <Upload uploadedFile={uploadedFile} setUploadedFile={setUploadedFile}></Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    {typeSelect}
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={(e)=>{setName(e.target.value)}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                {line}
                                {/* Price */}
                                <div className='flex flex-row m-1 items-left w-4/5'>
                                    {/* <div className='flex flex-col text-ellipsis w-1/3'>
                                        <p className='text-gray font-bold'>Departmant</p>
                                        <div className='flex flex-row'>
                                            <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-5/6" required={true} type='text' placeholder='CS' onChange={()=>{}}/>
                                        </div>            
                                    </div>
                                    <div className='flex flex-col text-ellipsis w-1/3'>
                                        <p className='text-gray font-bold'>ClassCode</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-5/6" required={true} type='number' placeholder='319' onChange={()=>{}}/>
                                            
                                        </div>            
                                    </div> */}
                                    <div className='flex flex-col text-ellipsis w-1/3'>
                                        <p className='text-gray font-bold'>Section</p>
                                        <div className='flex flex-row'>
                                            <input min={1} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-5/6" required={true} type='number' placeholder='2' onChange={(e)=>{setSection(e.target.value)}}/>
                                        </div>            
                                    </div>
                                    
                                    <div className='flex flex-col items-center text-ellipsis w-1/2'>
                                        <p className='text-gray font-bold'>Wants or Gives</p>
                                        <div className='flex flex-row justify-center items-center m-auto'>
                                            <Switch size='default' className='bg-gray text-white' checkedChildren="Wants" unCheckedChildren="Gives" defaultChecked onChange={(value)=>{setWantToGive(value);console.log(value)}} />
                                        </div>            
                                    </div>
                                </div>

                                {submit}
                            </div>
                        </div>
        } else {
            component = <div>
            <strong>Unknown Error</strong>
            </div>;
        }
        
    
        return(
            <div>
                <Header type={type}/>
                <NavMenu currPage="Add-Items"/>
                <div className='flex flex-col bg-white justify-center items-center'>
                    <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>Post {type} Item</h1>
                    {/* <form onSubmit={handleSubmit}> */}
                        <div className='flex flex-row bg-gray-light rounded-xl'>
                            {component}
                        </div>
                    {/* </form> */}
                    
                </div>
            </div>
            
        );
    }

    export default AddItem;
