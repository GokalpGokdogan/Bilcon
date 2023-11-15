import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import ForgotPassword from './screens/forgotPassword'
import VerificationPage from './screens/verificationPage'
import AccountPage from './screens/accountPage'
import DetailsPage from './screens/detailsPage'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="home" element={<Home/>} />
        <Route path="forgotPassword" element={<ForgotPassword/>} />
        <Route path="verificationPage" element={<VerificationPage/>} />
        <Route path="accountPage" element={<AccountPage/>} />
        <Route path='detailsPage' element={<DetailsPage/>}/>
      </Routes>
    </div>
  );
}