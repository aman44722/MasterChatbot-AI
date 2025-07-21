import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Switch,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextEditor from "./CustomTextEditor";
import MediaTabComponent from "./MediaUploadComponet/MediaTabComponent";

const EditQuestionPopup = ({ openEdit, handleCloseEdit, editingItem }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (editingItem?.text) {
      setText(editingItem.text);
    }
  }, [editingItem]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Dialog open={openEdit} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Question</DialogTitle>

      <DialogContent>
        <Typography variant="caption" color="textSecondary">
          Note: Please press "Enter" for Paragraph break
        </Typography>

        {/* Custom Text Editor */}
        <CustomTextEditor value={text} onChange={setText} />

        {/* Tabs */}
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Basic" />
          <Tab label="Media" />
          <Tab label="Advanced" />
        </Tabs>

        {tabIndex === 0 && (
          <Box>
            {/* Skip Toggle */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
                gap: 2,
              }}
            >
              <Typography>Do Not Give Skip Option</Typography>
              <Switch />
            </Box>

            {/* Min/Max Inputs */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField fullWidth label="Minimum Value" />
              <TextField fullWidth label="Maximum Value" />
            </Box>
          </Box>
        )}

        {tabIndex === 1 && <MediaTabComponent />}
        {tabIndex === 2 && (
          <Typography variant="body2">
            Advanced tab content goes here.
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCloseEdit}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            console.log("Final Saved Text:", text);
            handleCloseEdit();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionPopup;
