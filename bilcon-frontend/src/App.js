import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';
import ForgotPassword from './screens/forgotPassword'
import VerificationPage from './screens/verificationPage'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="home" element={<Home/>} />
        <Route path="forgotPassword" element={<ForgotPassword/>} />
        <Route path="forgotPassword/verificationPage" element={<VerificationPage/>} />
      </Routes>
    </div>
  );
}