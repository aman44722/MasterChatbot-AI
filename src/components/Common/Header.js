import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../../api/authApi';
// Importing the new fetch function

const Header = () => {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState('Online'); // Live chat status
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const userData = await fetchUserById(userId);  // Fetching user data via the API
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          🧠 ChatBot Admin Panel
        </Typography>

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                bgcolor: '#e2e8f0',
                color: '#3ca344',
                width: 40,
                height: 40,
                fontWeight: 600,
              }}
            >
              {user.fullName?.charAt(0).toUpperCase() || 'A'}
            </Avatar>
            <Box sx={{ lineHeight: 1 }}>
              <Typography fontWeight={600} fontSize="14px" color="#fff">
                {user.fullName || 'Admin'}
              </Typography>
              <Typography fontSize="12px" color="#f0fdf4">
                {user.email}
              </Typography>
            </Box>
            <IconButton onClick={handleMenuOpen}>
              <KeyboardArrowDown sx={{ color: '#fff' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* Live Chat Status */}
              <MenuItem>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Live Chat Status
                </Typography>
              </MenuItem>
              <MenuItem>
                <RadioGroup
                  row
                  value={status}
                  onChange={handleStatusChange}
                >
                  <FormControlLabel value="Online" control={<Radio />} label="Online" />
                  <FormControlLabel value="Away" control={<Radio />} label="Away" />
                </RadioGroup>
              </MenuItem>

              {/* Account and Plan */}
              <MenuItem component={Link} to="/account">
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Account
                </Typography>
              </MenuItem>
              <MenuItem >
                <Typography variant="body2">
                  Billing
                </Typography>
              </MenuItem>
              <MenuItem >
                <Typography variant="body2">
                  Help
                </Typography>
              </MenuItem>
              <MenuItem >
                <Typography variant="body2">
                  Video Guide
                </Typography>
              </MenuItem>

              {/* Plan Info */}
              <MenuItem>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Plan
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="body2">
                  {user.plan || 'PRO - TRIAL'} <br />
                  {user.plan ? `Ends in 6 days` : `No active plan`}
                </Typography>
              </MenuItem>

              {/* Logout */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
