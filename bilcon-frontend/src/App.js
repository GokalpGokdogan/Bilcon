import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { getItems } from './utils/Requests';

import Login from './screens/login';
import Register from './screens/register';
// import Home from './screens/home';
import ForgotPassword from './screens/forgotPassword'
import VerificationPage from './screens/verificationPage'
import AccountPage from './screens/accountPage'
import DetailsPage from './screens/detailsPage'
import Market from './screens/top-menu/marketPage';
import Rent from './screens/top-menu/rentPage';
import LostFound from './screens/top-menu/lostFoundPage';
import PrivateLessons from './screens/top-menu/privateLessonsPage';
import CourseTrading from './screens/top-menu/courseTradingPage';
import MarketItem from './screens/products/MarketItem';
import RentingItem from './screens/products/RentingItem';
import LostandFoundItem from './screens/products/LostandFoundItem';
import PrivateLessonItem from './screens/products/PrivateLessonItem';
import { ChatContextProvider } from './context/ChatContext';
import Chat from './screens/chat';


export default function App() {

  const user = {"_id" : "657c3d9453e88c291cb70aaf"};

  return (
    <ChatContextProvider user={user}>
    <div className="App">
     <Routes>
        <Route path="" element={<Login/>} />
        <Route path="register" element={<Register/>} />
       {/* home inactive till decided */}
        <Route path="dashboard" element={<Market/>} />
        <Route path="chat" element={<Chat />} />
        <Route path="forgotPassword" element={<ForgotPassword/>} />
        <Route path="verificationPage" element={<VerificationPage/>} />
        <Route path="accountPage" element={<AccountPage/>} />
        <Route path='detailsPage' element={<DetailsPage/>}/>
        <Route path={`/${'Market'.toLowerCase()}`} element={<Market/>}/>
        <Route path={`/${'Renting'.toLowerCase()}`} element={<Rent/>}/>
        <Route path={`/${'Lost & Found'.toLowerCase()}`} element={<LostFound/>}/>
        <Route path={`/${'Private Lessons'.toLowerCase()}`} element={<PrivateLessons/>}/>
        <Route path={`/${'Course Trading'.toLowerCase()}`} element={<CourseTrading/>}/>
      </Routes> 
     {/*   <MarketItem/>
      <RentingItem/>
      <LostandFoundItem/>
      <PrivateLessonItem/>*/}
    </div>
  </ChatContextProvider>
  );
}