import React, {useState} from 'react';
import NavMenu from './ui-component/navMenu';
import Header from './ui-component/header';
import ListHorizontal from './ui-component/listHorizontal';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


function AccountPage() 
{
    
    const buttonClassAccount = "w-64 my-1.5 text-ui-purple bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
    
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [newProfilePicture, setNewProfilePicture] = useState('');
    const [newName, setNewName] = useState('');

    const starIcons = Array.from({ length: 5 }, (_, i) => (
        <svg key={i} className='my-auto' width="36px" height="35px" viewBox="0 0 36 35" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Star</title>
            <desc>Created with Sketch.</desc>
            <defs></defs>
            <g id="Symbols" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Profile-nav" transform="translate(-11.000000, -4.000000)" fill="#F8E71C" stroke="none" stroke-width="2">
                    <g id="Group-2" transform="translate(0.000000, -1.000000)">
                        <polygon id="Star" points="29 32.8753882 19.595436 38 21.3915479 27.145898 13.7830957 19.4589803 24.297718 17.8753882 29 8 33.702282 17.8753882 44.2169043 19.4589803 36.6084521 27.145898 38.404564 38"></polygon>
                    </g>
                </g>
            </g>
        </svg>
    ));

    const line = <hr className='border-white border-1 w-100 my-[0.5vw]'/>

    const uploadProps = {
        name: 'file',
        action: 'http://localhost:3001/',/// I have no idea what to put here
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
                setNewProfilePicture(info.file.response);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };
    
    
    return(
        <div>
            <Header/>
            <NavMenu currPage="Account"/>
            <div className='flex flex-row'>
                <div className='flex flex-col bg-white h-screen px-10'>
                    <p className='font-inter font-extrabold text-3xl text-ui-purple my-4'>Account</p>

                    

                    <div>

                        <div className='w-64 my-1.5 text-black bg-gray-blue hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={() => setIsOpenSettings(!isOpenSettings)}>
                        <strong className='text-ui-purple'>Settings</strong>

                        </div>
                        {isOpenSettings && (
                            <div className='bg-gray-light p-5 rounded-lg'>
                                <div className='flex flex-col justify-center text-ellipsis m-3 items-left'>
                                    <p className='text-gray font-bold'>Set New Name</p>
                                        <div className='flex flex-row justify-start items-center'>
                                            <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={false} type='text' placeholder='New Password' onChange={(e)=>{setNewName(e.target.value)}}/>
                                            <button className='ml-7 text-ui-purple bg-gray-blue hover:bg-ig-purple hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={()=>{console.log(newName)}}>Save</button>
                                        </div>
                                    <p className='text-gray font-bold'>Set New Password</p>
                                    <div className='flex flex-row justify-start items-center'>
                                        <input className="border border-gray bg-white text-gray-900 focus:outline-none focus:ring-1 ring-gray sm:text-sm rounded-xl p-1.5 w-1/2" required={false} type='text' placeholder='New Password' onChange={(e)=>{setNewPassword(e.target.value)}}/>
                                        <button className='ml-7  text-ui-purple bg-gray-blue hover:bg-ig-purple hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={()=>{console.log(newPassword)}}>Save</button>
                                    </div>
                                    <p className='text-gray font-bold'>Set New Profile Picture</p>
                                    <div className='flex flex-row justify-start items-center'>
                                    {/**Image input */}
                                        <div className='flex flex-row justify-start items-center'>
                                            <Upload {...uploadProps}>
                                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>
                                        </div>
                                        <button className='ml-4 text-ui-purple bg-gray-blue hover:bg-ig-purple hover:text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg font-sans text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={()=>{console.log('look',newProfilePicture)}}>Save</button>
                                        
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {line}
                    {ListHorizontal('Favorites')}
                    {line}
                    {ListHorizontal('Purchases')}
                    {line}
                    {ListHorizontal('Sold Items')}
                    {line}
                    <div className='flex flex-row justify-start ml-9'>
                        {starIcons}
                    </div>
                    
                    {/* <Link type="submit" to="/home" className={buttonClassAccount}>Favorites</Link>
                    <Link type="submit" to="/home" className={buttonClassAccount}>Purchases</Link>
                    <Link type="submit" to="/home" className={buttonClassAccount}>Notifications</Link>
                    <Link type="submit" to="/home" className={buttonClassAccount}>Security</Link>
                    <Link type="submit" to="/home" className={buttonClassAccount}>Sold Items</Link>
                    <Link type="submit" to="/home" className={buttonClassAccount}>Ratings</Link> */}

                </div>
                
            </div>
        </div>
    
    
    );
}

export default AccountPage;
