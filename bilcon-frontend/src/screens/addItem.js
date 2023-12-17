import React,{useState, useEffect} from 'react';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';
import { Upload, message, Select, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    function AddItem() 
    {
        const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
        const [type, setType] = useState('Market');
        const [imageUrl, setImageUrl] = useState(null);

        const [item, setItem] = useState(null);

        //name, definition, price, durationOfPrice, availabilityScalar, availabilityDuration, place, day, month, year, sectionNo, wantToGive, itemType
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [price, setPrice] = useState(0);
        const [availabilityScalar, setAvailabilityScalar] = useState(0);
        const [availabilityDuration, setAvailabilityDuration] = useState('hour');
        const [place, setPlace] = useState('');
        const [day, setDay] = useState(1);
        const [month, setMonth] = useState(1);
        const [year, setYear] = useState(2000);
        const [section, setSection] = useState(0);
        const [wantToGive, setWantToGive ] = useState(true);
        const [posterId, setPosterId] = useState('22222222');
        const [itemType, setItemType] = useState('Market');

        //ant design
        const { Option } = Select;

        
        const line = <hr className='border-gray border-1 w-100 my-[1vw]'/>
        
        let component;

        const beforeUpload = (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error('You can only upload JPG/PNG file!');
            }
            return isJpgOrPng;
        }
    
        const handleChange = (info) => {
            if (info && info.file) {
                if (info.file.status === 'done') {
                    console.log(info.file.response.url)
                    setImageUrl(info.file.response.url); // Here you should update the imageUrl with the URL of the image returned from the server
                }
            }
        };

        const handleUpload = ({ file, onSuccess }) => {
            console.log(file);
            //setImg(file);
            setTimeout(() => {
                onSuccess("ok");
            }, 2000);
        };
    
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );

        const pageValues = ['sale', 'rent', 'lost & found', 'lesson', 'course'];

        const typeSelect =  <div>                                    
                                <p className='text-gray font-bold'>Type</p>
                                <Select defaultValue={type} style={{ width: 180 }} onChange={(value) => { if(value !== 'Lost & Found'){setItemType(value)}; setType(pages[pageValues.indexOf(value)]);/*handleChange(); /*setType(selectedType)*/}}>
                                    {pages.map((page,index) => <Option key={page} value={pageValues[index]} >{page}</Option>)}
                                </Select>
                            </div>

        const dateSelect =  <div className='flex flex-row'>
                                <input min={1} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-xs rounded-xl p-1.5 w-1/5" required={true} type='number' placeholder='Number of' onChange={(e)=>{setAvailabilityScalar(e.target.value)/**availabilityScalar */}}/>
                                <Select  defaultValue={'day'} style={{ width: 90 }} onChange={(e) => { setAvailabilityDuration(e.target.value)/**availabilityDuration */ }}>
                                    {['hour', 'day', 'week', 'month', 'year'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                </Select>
                            </div>

        useEffect(() => {
            // This effect will run every time the 'item' state is updated
            console.log(item, type, itemType);
            
        }, [item]);

        const handleSubmit = (event) => {
            event.preventDefault();
            console.log(name, description, price, availabilityScalar, availabilityDuration, place, day, month, year, section, wantToGive, posterId);
        };
        const submit =  <button type="submit" className="bg-ui-purple hover:bg-ig-purple text-white font-bold py-2 px-4 rounded transition duration-200 ease-in-out transform transition-transform scale-95 hover:scale-100" onClick={() => {
                                        setItem({name:name, description:description, price:price, availabilityScalar:availabilityScalar, availabilityDuration:availabilityDuration, place:place, day:day, month:month, year:year, sectionNo:section, wantToGive:wantToGive, itemType:itemType, posterId:posterId});
                                        console.log(item);
                                        }}>
                            Submit
                        </button>
        
        if (type === pages[0]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="m-auto p-auto"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                        autoSize={true}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
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
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="m-auto p-auto"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                        autoSize={true}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
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
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="m-auto p-auto"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                        autoSize={true}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
                                </div>
                                
                            </div>
                            <div className='block h-[20vw] w-[50vw]'>
                                
                                {/* Type Select */}
                                <div className='flex flex-row text-ellipsis m-3 w-[40vw]'>
                                    {typeSelect}
                                    <div className='ml-auto'>                                    
                                        <p className='text-gray font-bold'>Lost or Found</p>
                                        <Select defaultValue={'lost'} style={{ width: 120 }} onChange={(value) => {console.log(value);setItemType(value)}}>
                                            {['lost','found'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                        </Select>
                                    </div>
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
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="m-auto p-auto"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                        autoSize={true}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
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
           } else if (type === pages[4]) {
            component = <div className='flex flex-row '>

                            
                            <div className='h-[32vw] w-[24vw] flex justify-center items-center'>
                                <div>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="m-auto p-auto"
                                        showUploadList={false}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={handleUpload}
                                        autoSize={true}
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                                    </Upload>
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
                <Header/>
                <NavMenu currPage="Add-Items"/>
                <div className='flex flex-col bg-white justify-center items-center'>
                    <h1 className='font-inter font-extrabold text-3xl text-ui-purple my-2'>Post {type} Item</h1>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-row bg-gray-light rounded-xl'>
                            {component}
                        </div>
                    </form>
                    
                </div>
            </div>
            
        );
    }

    export default AddItem;
