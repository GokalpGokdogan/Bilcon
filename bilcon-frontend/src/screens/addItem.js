import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';
import { Upload, message, Select, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

    function AddItem() 
    {
        const pages = ['Market', 'Renting', 'Lost & Found', 'Private Lessons', 'Course Trading'];
        const [noStar, setNoStar] = useState(-1);
        const [type, setType] = useState(pages[0]);
        const [imageUrl, setImageUrl] = useState(null);
        const [img, setImg] = useState(null);

        //ant design
        const { Option } = Select;

        let seller = {name:'@Gokalp',img:'https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg',rating:4.5}
    
        const starIcons = Array.from({ length: Math.ceil(seller.rating)  }, (_, i) => (
            <svg key={i} className='my-auto' width="2vw" height="2vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
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
        const product = {name:'Bilcon',img:'https://i.ebayimg.com/images/g/C4AAAOSwm~daZhuB/s-l1600.jpg',description:'Lorem ipsum',price:100,seller:'@Gokalp',negotiable:true,rentDurationNumber:1,rentDurationType:'day'}
    
        const starIconsSpecial = Array.from({ length: 5  }, (_, i) => (
            <button key={i} onClick={() => { setNoStar(i) }}>
                <svg className='my-auto' width="2vw" height="2vw" viewBox="0 0 36 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>Star</title>
                    <desc>Created with Sketch.</desc>
                    <defs></defs>
                    <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill={ (noStar<i)?"#979797":"#F8E71C"} stroke="none" stroke-width="2">
                            <g id="Group-2" transform="translate(0.000000, -1.000000)">
                                <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702242 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
        ));
        const line = <hr className='border-gray border-1 w-100 my-[1vw]'/>
        const user = <div className='flex flex-row items-center'>
                        <img
                            className="h-[36px] w-[36px] rounded-full my-auto mr-[1vw]"
                            alt=''
                            src={`${seller.img } `}
                        />
                        <div className=' flex flex-row'>
                            <div className='flex items-center mr-[1vw]'>
                                <strong className='text-[24px]'>{(seller.name).replace('@','')}</strong>
                            </div>
                            <div className='flex flex-row'>
                                {starIcons}
                            </div>
                        </div>
                    </div>

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
                    setImageUrl(info.file.response.url); // Here you should update the imageUrl with the URL of the image returned from the server
                }
            }
        };

        const handleUpload = ({ file, onSuccess }) => {
            console.log(file);
            setImg(file);
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

        const typeSelect =  <div>                                    
                                <p className='text-gray font-bold'>Type</p>
                                <Select defaultValue={type} style={{ width: 180 }} onChange={(e) => { setType(e); handleChange(); /*setType(selectedType)*/}}>
                                    {pages.map(page => <Option key={page} value={page} >{page}</Option>)}
                                </Select>
                            </div>

        const dateSelect =  <div className='flex flex-row'>
                                <input min={1} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-xs rounded-xl p-1.5 w-1/5" required={true} type='number' placeholder='Number of' onChange={(e)=>{/**availabilityScalar */}}/>
                                <Select  defaultValue={'day'} style={{ width: 90 }} onChange={(e) => { /**availabilityDuration */ }}>
                                    {['hour', 'day', 'week', 'month', 'year'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                </Select>
                            </div>

        
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
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={()=>{}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={()=>{}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={()=>{}}/>
                                            <p className='text-gray my-auto mx-2'>TL</p>    
                                        </div>
                                    </div>


                                </div>
                                
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
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={()=>{}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={()=>{}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={()=>{}}/>
                                            <p className='text-gray my-auto mx-2'>TL</p>    
                                        </div>            
                                    </div>
                                    {/* Rent Duration */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Rent Duration</p>
                                        { dateSelect }
                                    </div>
                                    

                                </div>
                                
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
                                        <Select defaultValue={'lost'} style={{ width: 120 }} onChange={(e) => {}}>
                                            {['lost','found'].map(page => <Option key={page} value={page} >{page}</Option>)}
                                        </Select>
                                    </div>
                                </div>
                                {/* Name */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Name</p>
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={()=>{}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={()=>{}}/>
                                </div>
                                {/* Info */}
                                <p className='text-gray font-bold'>Info</p>
                                {line}
                                <div className='flex flex-row'>
                                    {/* Loction */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Location</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='Text' placeholder='Location' onChange={()=>{}}/>
                                             
                                        </div>            
                                    </div>
                                    {/* Date */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Date</p>
                                        <div className='flex flex-row'>
                                            <input min={0} max={31} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='DD' onChange={()=>{}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={0} max={12} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='MM' onChange={()=>{}}/>
                                            <p className='text-gray my-auto mx-2'>/</p>
                                            <input min={2000    } className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/5" required={true} type='Text' placeholder='YYYY' onChange={()=>{}}/>
                                            
                                        </div>            
                                    </div>
                                    

                                </div>
                                
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
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={()=>{}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={()=>{}}/>
                                </div>
                                {/* Price */}
                                <div className='flex flex-row'>
                                    {/* Price */}
                                    <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                        <p className='text-gray font-bold'>Price</p>
                                        <div className='flex flex-row'>
                                            <input min={0} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-2/5" required={true} type='number' placeholder='Price' onChange={()=>{}}/>
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
                                    <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={true} type='text' placeholder='Name' onChange={()=>{}}/>
                                </div>
                                {/* Description */}
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Description</p>
                                    <textarea className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-full" required={false} type='text' placeholder='Description' onChange={()=>{}}/>
                                </div>
                                {line}
                                {/* Price */}
                                <div className='flex flex-row m-1 items-left w-4/5'>
                                    <div className='flex flex-col text-ellipsis w-1/3'>
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
                                    </div>
                                    <div className='flex flex-col text-ellipsis w-1/3'>
                                        <p className='text-gray font-bold'>Section</p>
                                        <div className='flex flex-row'>
                                            <input min={1} className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-5/6" required={true} type='number' placeholder='2' onChange={()=>{}}/>
                                        </div>            
                                    </div>
                                    
                                    <div className='flex flex-col items-center text-ellipsis w-1/2'>
                                        <p className='text-gray font-bold'>Wants or Gives</p>
                                        <div className='flex flex-row justify-center items-center m-auto'>
                                            <Switch size='default' checkedChildren="Wants" unCheckedChildren="Gives" defaultChecked onChange={(e)=>{console.log(e)}} />
                                        </div>            
                                    </div>
                                </div>

                                
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
                    <div className='flex flex-row bg-gray-light rounded-xl'>
                        {component}
                    </div>
                </div>
            </div>
            
        );
    }

    export default AddItem;
