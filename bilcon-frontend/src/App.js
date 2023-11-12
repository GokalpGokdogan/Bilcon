import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="home" element={<Home/>} />
      </Routes>
    </div>
  );
}