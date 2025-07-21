import React, { useState } from "react";
import { useDrop } from "react-dnd";
import {
  Box,
  Typography,
  IconButton,
  speedDialActionClasses,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Tabs,
  Tab,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import Delete Icon
import CallSplitIcon from "@mui/icons-material/CallSplit"; // for Conditional Flow
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; // for Duplicate

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import EditIcon from "@mui/icons-material/Edit";
import "./Style.css";
import CustomTextEditor from "./CustomTextEditor";
import MediaTabComponent from "./MediaUploadComponet/MediaTabComponent";
import EditQuestionPopup from "./EditQuestionPopup";

const FlowCanvasComponent = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const [questionText, setQuestionText] = useState("");

  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item) => {
      const defaultText = item.defaultLabel || "Default Question";
      setDroppedItems((prev) => [
        ...prev,
        { ...item, id: Date.now(), text: defaultText },
      ]);
    },

    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  //   handle edit
  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditingText(item.text);
    setOpenEdit(true);
  };

  //   handle edit change
  const handleEditChange = (e) => {
    setEditingText(e.target.value);
  };

  //   handle edit save
  const handleEditSave = () => {
    setDroppedItems((prev) =>
      prev.map((item) =>
        item.id === editingItemId ? { ...item, text: editingText } : item
      )
    );
    setEditingItemId(null);
    setEditingText("");
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingItem(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  //   handle delete
  const handleDelete = (id) => {
    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
  };

  //   handle dublicate
  const handleDuplicate = (item) => {
    const newItem = {
      ...item,
      id: Date.now(), // ensure unique ID
      text: item.text + " (copy)", // optional
    };
    setDroppedItems((prev) => [...prev, newItem]);
  };

  // handle conditional logic
  const handleConditionalFlow = (id) => {
    // Logic to open conditional flow settings
    alert(`Setup conditional flow for item ID: ${id}`);
  };

  return (
    <Box
      ref={dropRef}
      sx={{
        width: "70%",
        minHeight: "100vh",
        padding: "30px",
        backgroundColor: isOver ? "#F9FAFB" : "#fff",
        transition: "background 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {droppedItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Drag components here to build your flow
        </Typography>
      ) : (
        droppedItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "end",
              gap: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                border: "1px solid #E5E7EB",
                padding: "0 16px ",
                borderRadius: "10px",
                width: "95%",
                backgroundColor: "#F3F4F6",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box className="icon-size-custome" sx={{ fontSize: "10px" }}>
                  {item.icon}
                </Box>
                {editingItemId === item.id ? (
                  <input
                    value={editingText}
                    onChange={handleEditChange}
                    onBlur={handleEditSave}
                    autoFocus
                    style={{
                      fontSize: "16px",
                      padding: "5px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                    }}
                  />
                ) : (
                  <Typography>{item.text}</Typography>
                )}
              </Box>

              {/* icons  */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <IconButton onClick={() => handleEditClick(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDuplicate(item)}
                  aria-label="duplicate"
                >
                  <ContentCopyIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleConditionalFlow(item.id)}
                  aria-label="conditional flow"
                >
                  <CallSplitIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Users replay  */}
            <Box
              sx={{
                backgroundColor: "#3b82f6",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "6px",
                fontWeight: 500,
                fontSize: "14px",
              }}
            >
              User's reply
            </Box>
          </Box>
        ))
      )}

        <EditQuestionPopup
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
        editingItem={editingItem}
      />
    </Box>

    // hdgsuyghushdjhasjgyashdjhagyusgdh
  );
};

export default FlowCanvasComponent;
