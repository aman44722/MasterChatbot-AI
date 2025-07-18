// src/pages/Chats.js
import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot icon
import SettingsIcon from "@mui/icons-material/Settings"; // Settings icon
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Help icon
import ViewColumnIcon from "@mui/icons-material/ViewColumn"; // Split view mode icon
import KeyboardIcon from "@mui/icons-material/Keyboard"; // Keyboard shortcut icon
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Sign out icon
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Input,
} from "@mui/material";
import adminImg from "../assets/images/avatar/adminImg.jpg";
import userImg from "../assets/images/randonImg/user-2.jpg";

const Chats = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null); // State to handle menu opening
  const [anchorDotEl, setAnchorDotEl] = useState(null); // State to handle menu opening
  // const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the menu when the icon is clicked
  };

  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu when an item is clicked or clicked outside
  };

  const handleClick = (event) => {
    setAnchorDotEl(event.currentTarget); // Open the menu on click
  };

  const handleClose = () => {
    setAnchorDotEl(null); // Close the menu
  };
  // Fetch all chat sessions
  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSessions(data);
    });
    return () => unsub();
  }, []);

  // Fetch messages for the selected chat
  useEffect(() => {
    if (!selectedSession) return;
    const q = query(
      collection(db, `chats/${selectedSession.id}/messages`),
      orderBy("timestamp")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => doc.data());
      setMessages(msgs);
    });
    return () => unsub();
  }, [selectedSession]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    await addDoc(collection(db, `chats/${selectedSession.id}/messages`), {
      sender: "admin",
      text: newMessage,
      timestamp: serverTimestamp(),
    });
    setNewMessage(""); // Clear input after sending
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "81vh",
        marginTop: "5%",
        marginBottom: "%",
      }}
    >
      {/* Left Panel: Recent Chats */}
      <Box
        sx={{
          // width: "300px",
          backgroundColor: "#f4f4f4",
          padding: 2,
          borderRadius: 2,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            marginBottom: 1,
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          {/* admin details */}
          <Box
            sx={{
              backgroundColor: "#fff",
              marginBottom: 1,
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {/* User Info Section */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: "500",
              }}
            >
              {/* Avatar */}
              <Avatar
                alt="User Avatar"
                src={adminImg}
                sx={{ marginRight: "10px", width: "50px", height: "50px" }}
              />
              <Box>
                {/* User Name */}
                <Typography
                  variant="body2"
                  color="textPrimary"
                  sx={{ fontSize: "16px", fontWeight: "600" }}
                >
                  Parag Yadav
                </Typography>
                {/* User Designation */}
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ fontSize: "12px", fontWeight: "400" }}
                >
                  BDM Manager
                </Typography>
              </Box>

              {/* More Options (Three-dot menu) */}
              <IconButton
                onClick={handleClick}
                sx={{ marginLeft: "auto" }} // Align the three dots to the right
              >
                <MoreVertIcon />
              </IconButton>
            </Box>

            {/* Menu for options */}
            <Menu
              anchorEl={anchorDotEl}
              open={Boolean(anchorDotEl)}
              onClose={handleClose}
              sx={{ mt: 2 }}
            >
              <MenuItem
                onClick={handleClose}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <SettingsIcon sx={{ marginRight: "10px" }} />
                Settings
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HelpOutlineIcon sx={{ marginRight: "10px" }} />
                Help and Feedback
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ViewColumnIcon sx={{ marginRight: "10px" }} />
                Enable Split View Mode
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <KeyboardIcon sx={{ marginRight: "10px" }} />
                Keyboard Shortcut
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <ExitToAppIcon sx={{ marginRight: "10px" }} />
                Sign Out
              </MenuItem>
            </Menu>
          </Box>
          {/* Search Box with Search Icon */}
          <Box
            sx={{
              width: "100%",
              marginTop: "10px",
            }}
          >
            <TextField
              sx={{
                width: "100%",
                borderRadius: "8px",
                margin: "5px 0px",
              }}
              placeholder="Search Contact"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    ex={{
                      height: "8px",
                    }}
                    position="start"
                  >
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <Box>
          <Box>
            {/* Title */}
            <Typography
              variant="p"
              sx={{
                fontSize: "16px",
                fontWeight: "500",
                color: "#0d0d0d",
                display: "flex",
                alignItems: "center",
              }}
              gutterBottom
            >
              Recent Chats
              {/* Filter Icon Button */}
              <IconButton
                sx={{ marginLeft: 1 }} // Space between title and icon
                onClick={handleMenuClick}
              >
                <KeyboardArrowDownIcon />
              </IconButton>
            </Typography>

            {/* Menu - Filter Options */}
            <Menu
              anchorEl={anchorEl} // The element to anchor the menu to (filter icon)
              open={Boolean(anchorEl)} // Open menu if anchorEl is set
              onClose={handleCloseMenu} // Close menu when clicking outside
              sx={{ mt: 2 }} // Adding margin-top to space the menu from title
            >
              <MenuItem onClick={handleCloseMenu}>Sort by Time</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Sort by Unread</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Hide Favourites</MenuItem>
            </Menu>
          </Box>

          <List sx={{ maxHeight: "80vh", overflowY: "auto" }}>
            {sessions.map((session) => (
              <ListItem
                button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                sx={{
                  marginBottom: 1,
                  backgroundColor:
                    selectedSession?.id === session.id
                      ? "#d1e7dd"
                      : "transparent",
                  borderRadius: 1,
                }}
              >
                <Avatar sx={{ marginRight: 2 }} />
                <ListItemText
                  primary={
                    <Typography fontWeight="bold">
                      {session.userName || "Unknown User"}
                    </Typography>
                  }
                  secondary={`Started: ${new Date(
                    session.createdAt?.seconds * 1000
                  ).toLocaleString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Right Panel: Chat Messages */}
      <Box
        sx={{
          flex: 1,
          paddingRight: 2,
          paddingLeft: 2,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          height: "81vh",
          borderRadius: 2,
        }}
      >
        {selectedSession ? (
          <>
            <Box
              sx={{
                backgroundColor: "#f9f9f9",
                marginBottom: 1,
                height: "80px",
                display: "flex",
                alignItems: "center",
                borderRadius:'10px'
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                {/* Avatar */}
                <Avatar
                  alt="User Avatar"
                  src={userImg}
                  style={{ marginRight: "10px" }}
                />
                {/* Username */}
                {selectedSession.userName || "Anonymous"}
              </Typography>
            </Box>

            {/* body */}
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                marginBottom: 2,
                padding: 2,
                backgroundColor: "#f9f9f9",
                borderRadius: '10px',
              }}
            >
              {messages.map((msg, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    flexDirection:
                      msg.sender === "admin" ? "row-reverse" : "row",
                    marginBottom: 2,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        msg.sender === "admin" ? "#d1e7dd" : "#e8f5e9",
                      padding: 2,
                      borderRadius: 2,
                      maxWidth: "70%",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {msg.sender}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            {/* Message Input Area */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                backgroundColor: "#f9f9f9",
                padding: "10px",
                borderRadius:'10px'
              }}
            >
              <TextField
                fullWidth
                value={newMessage}
                placeholder="Type your message..."
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </Box>
          </>
        ) : (
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ textAlign: "center", marginTop: "50px" }}
          >
            Select a user from the left to start the conversation.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Chats;
