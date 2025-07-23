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
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MediaTabComponent from "../../MediaUploadComponet/MediaTabComponent";
import CustomTextEditor from "./CustomTextEditor";
import SingleChoiceTab from "./BasicTabs/SingleChoiceTab/SingleChoiceTab";
import QuestionTab from "./BasicTabs/QuestionTab/QuestionTab";
import NumberTab from "./BasicTabs/NumberTab/NumberTab";

const EditQuestionPopup = ({
  openEdit,
  handleCloseEdit,
  editingItem,
  onUpdate,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [text, setText] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Please enter a valid answer"
  );

  useEffect(() => {
    if (editingItem?.text) {
      setText(editingItem.text);
    }
  }, [editingItem]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSave = () => {
    if (text.trim() === "") {
      setErrorMessage("Question cannot be empty");
      return;
    }

    // Send updated question text to parent component
    onUpdate({
      ...editingItem,
      text,
    });

    handleCloseEdit();
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
            {editingItem?.type === "question" ? (
              <QuestionTab
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            ) : editingItem?.type === "single_choice" ? (
              <SingleChoiceTab />
            ) : editingItem?.type === "number" ? (
              <NumberTab />
            ) : (
              <Box
                sx={{ display: "flex", alignItems: "center", mb: 2, gap: 2 }}
              >
                <Typography>Do Not Give Skip Option</Typography>
                <Switch />
              </Box>
            )}
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
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionPopup;
