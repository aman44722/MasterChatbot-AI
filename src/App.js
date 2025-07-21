// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Common/Layout';

import Dashboard from './pages/Dashboard';
import Chats from './pages/Chats';
import Users from './pages/Users';
import Answers from './pages/Answers';
import Leads from './pages/Leads';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Logout from './pages/Logout';
// import UserChat from './pages/UserChat';
import UserMessage from './components/UserMessage/UserMessage';
import SetUp from './pages/SetupPage/SetUp';
// import EmbedCode from './components/Embeded/EmbedCode';
// import ChatPreviewPage from './pages/SetupPage/ChatPreviewPage';
// import ChatPreview from './components/Admin/FlowSetupComponent/ChatPreview';
import FlowSetup from './pages/FlowSetupPage/FlowSetup';
// import SetUp from './components/Admin/ViewSetupComponent/SetUp';




function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Admin routes WITH sidebar/header */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/users" element={<Users />} />
          <Route path="/answers" element={<Answers />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/setup" element={<SetUp />} />
          {/* <Route path="/chat-preview" element={<ChatPreview />} /> */}
          <Route path="/flow-setup" element={<FlowSetup />} />
          {/* <Route path="/linkge" element={<EmbedCode />} /> */}
         

          {/* <Route path="/setup" element={<SetUp />} /> */}
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* ✅ User routes WITHOUT sidebar/header */}
        {/* <Route path="/userchat" element={<UserChat />} /> */}
         <Route path="/usertest/:chatId" element={<UserMessage />} /> {/* Corrected path */}
           {/* <Route path="/embed" element={<ChatPreviewPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
