import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom'; // ✅ Added useLocation

const Layout = () => {
  const location = useLocation();

  // Check if the current route is '/usertest' or '/userchat' (you can add more if needed)
  const isUserPage = location.pathname === '/usertest' || location.pathname === '/userchat';

  return (
    <div style={{ display: 'flex' }}>
      {/* Render Sidebar and Header only for Admin Pages */}
      {!isUserPage && <Sidebar />}
      <div style={{ flex: 1 }}>
        {!isUserPage && <Header />}
        <main style={{ padding: '80px 0', }}>
          <Outlet /> {/* This will render the child routes like /chats, /dashboard */}
        </main>
      </div>
    </div>
  );
};

export default Layout;

