// src/components/LoginSignupPopup.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { db } from '../firebase/firebaseConfig';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

const LoginSignupPopup = ({ onClose, onLogin }) => {
  const [userData, setUserData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save new user data in Firebase
    const userId = `user_${Date.now()}`; // Unique user ID

    await setDoc(doc(db, "users", userId), {
      ...userData,
      createdAt: serverTimestamp(),
    });

    onLogin(userId); // Notify parent that user is logged in
    onClose(); // Close the popup after login
  };

  return (
    <Box sx={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <Box sx={{
        backgroundColor: 'white', padding: '20px', borderRadius: '8px',
        width: '300px', textAlign: 'center'
      }}>
        <Typography variant="h6">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleInputChange}
            required
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginSignupPopup;
