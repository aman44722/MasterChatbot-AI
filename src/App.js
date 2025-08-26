// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Common/Layout';

import Dashboard from './pages/Dashboard';
import Chats from './pages/Chats';
import Users from './pages/Users';
import Answers from './pages/Answers';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
import UserMessage from './components/UserMessage/UserMessage';
import SetUp from './pages/SetupPage/SetUp';
import FlowSetup from './pages/FlowSetupPage/FlowSetup';
import AuthForm from './components/LoginRegister';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Account from './pages/Account';

// ✅ Import your home page component
import HomePage from './pages/Home';

function App() {
  return (
    <Routes>
      {/* ✅ PUBLIC HomePage — no layout, no auth */}
      <Route path="/" element={<HomePage />} />

      {/* ✅ Protected Layout routes (Dashboard, etc.) */}
      <Route path="/app" element={<Layout />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Dashboard />} /> {/* matches "/app" */}
          <Route path="chats" element={<Chats />} />
          <Route path="users" element={<Users />} />
          <Route path="answers" element={<Answers />} />
          <Route path="leads" element={<Leads />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="setup" element={<SetUp />} />
          <Route path="flow-setup" element={<FlowSetup />} />
          <Route path="logout" element={<Logout />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Route>

      {/* ✅ Public route — user message */}
      <Route path="/usertest/:chatId" element={<UserMessage />} />
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  );
}

export default App;
