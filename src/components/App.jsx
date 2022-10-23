import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
// log in || out
import Authorization from './Loging/Authorization';
import Registration from './Loging/Registration';
// components pages
import Header from './Header';
import HomePage from './HomePage';

export default function App({ user }) {
  const [currentUser, setCurrentUser] = useState(user || null);
  console.log(user);
  return (
    <div className="container">
      <Header user={currentUser} setUser={setCurrentUser} />
      <div className="bg-dk-green pad-t-2 pad-s-1 pad-b-8 mar-b-16 c-white">
        <div className="max-w-700 center">
          <Routes>
            <Route path="/" element={<HomePage user={currentUser} />} />

            {/* навигация на регистрацию и авторизацию */}
            <Route path="/registration" element={<Registration setUser={setCurrentUser} />} />
            <Route path="/authorization" element={<Authorization setUser={setCurrentUser} />} />

          </Routes>
        </div>

      </div>
    </div>

  );
}
