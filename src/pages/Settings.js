import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Paper,
} from '@mui/material';

import SmartToyIcon from '@mui/icons-material/SmartToy';
import HttpIcon from '@mui/icons-material/Http';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const Settings = () => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (_, newValue) => setTab(newValue);

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Settings Panel
      </Typography>

      {/* Tabs with Icons */}
      <Paper elevation={2}>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab icon={<SmartToyIcon />} label="Bot Configs" />
          <Tab icon={<HttpIcon />} label="Webhook/API" />
          <Tab icon={<GroupIcon />} label="User Access" />
          <Tab icon={<SettingsIcon />} label="Preferences" />
        </Tabs>
      </Paper>

      {/* Panel 1: Bot Configs */}
      <TabPanel value={tab} index={0}>
        <Typography variant="h6">Bot Configurations</Typography>
        <TextField
          fullWidth
          label="Welcome Message"
          margin="normal"
          defaultValue="Hello! How can I assist you?"
        />
        <TextField
          fullWidth
          label="Fallback Reply"
          margin="normal"
          defaultValue="Sorry, I didn't understand that."
        />
        <FormControlLabel control={<Switch defaultChecked />} label="Typing Delay Enabled" />
        <Button variant="contained" sx={{ mt: 2 }}>
          Save Bot Configs
        </Button>
      </TabPanel>

      {/* Panel 2: Webhook/API */}
      <TabPanel value={tab} index={1}>
        <Typography variant="h6">Webhook & API Settings</Typography>
        <TextField
          fullWidth
          label="Google Sheet Webhook URL"
          margin="normal"
          defaultValue="https://script.google.com/..."
        />
        <TextField fullWidth label="External API Key" margin="normal" />
        <Button variant="outlined" sx={{ mt: 1 }}>
          Test Webhook
        </Button>
        <Button variant="contained" sx={{ mt: 2, ml: 2 }}>
          Save API Settings
        </Button>
      </TabPanel>

      {/* Panel 3: User Access */}
      <TabPanel value={tab} index={2}>
        <Typography variant="h6">User Access & Roles</Typography>
        <TextField fullWidth label="Add Admin Email" margin="normal" />
        <TextField fullWidth label="Assign Role" margin="normal" defaultValue="admin" />
        <FormControlLabel control={<Switch />} label="Allow Editing Bot Replies" />
        <Button variant="contained" sx={{ mt: 2 }}>
          Save User Access
        </Button>
      </TabPanel>

      {/* Panel 4: Preferences */}
      <TabPanel value={tab} index={3}>
        <Typography variant="h6">System Preferences</Typography>
        <FormControlLabel control={<Switch defaultChecked />} label="Enable Dark Mode" />
        <FormControlLabel control={<Switch />} label="Enable Data Export" />
        <TextField fullWidth label="Timezone" margin="normal" defaultValue="Asia/Kolkata" />
        <Button variant="contained" sx={{ mt: 2 }}>
          Save Preferences
        </Button>
      </TabPanel>
    </Box>
  );
};

export default Settings;
