import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

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
import Chat from './screens/chat';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        {/* home inactive till decided */}
        <Route path="home" element={<Market/>} />

        <Route path="forgotPassword" element={<ForgotPassword/>} />
        <Route path="verificationPage" element={<VerificationPage/>} />
        <Route path="accountPage" element={<AccountPage/>} />
        <Route path='detailsPage' element={<DetailsPage/>}/>
        <Route path={`/${'Market'.toLowerCase()}`} element={<Market/>}/>
        <Route path={`/${'Renting'.toLowerCase()}`} element={<Rent/>}/>
        <Route path={`/${'Lost & Found'.toLowerCase()}`} element={<LostFound/>}/>
        <Route path={`/${'Private Lessons'.toLowerCase()}`} element={<PrivateLessons/>}/>
        <Route path={`/${'Course Trading'.toLowerCase()}`} element={<CourseTrading/>}/>
        <Route path={`/${'Chat'.toLowerCase()}`} element={<Chat/>}/>
      </Routes>
    </div>
  );
}