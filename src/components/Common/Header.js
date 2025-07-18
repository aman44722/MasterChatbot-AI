// src/components/Common/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';

const Header = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: '#3ca344',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Left Side (Title) */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          🧠 ChatBot Admin Panel
        </Typography>

        {/* Right Side (Placeholder Avatar/Profile) */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Admin
          </Typography>
          <Avatar sx={{ bgcolor: '#ffffff', color: '#3ca344', fontWeight: 600 }}>
            A
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
