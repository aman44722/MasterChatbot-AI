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
// import SingleChoiceTab from "./BasicTabs/SingleChoiceTab/SingleChoiceTab";
import QuestionTab from "./BasicTabs/QuestionTab/QuestionTab";
import NumberTab from "./BasicTabs/NumberTab/NumberTab";
import EmailTab from "./BasicTabs/EmailTab/EmailTab";
import MultipleChoiceTab from "./BasicTabs/MultipleChoiceTab/MultipleChoiceTab";
import MobileNumberTab from "./BasicTabs/MobileNumberTab/MobileNumberTab";
// import SingleChoiceTab from "./BasicTabs/SingleChoiceTab/SingleChoiceTab";
import OptionList from "./BasicTabs/SingleChoiceTab/Options/OptionInputRow";
import ShowOptionsButtons from "./BasicTabs/SingleChoiceTab/Options/ShowOptionsButtons";

const EditQuestionPopup = ({
  openEdit,
  handleCloseEdit,
  editingItem,
  // editingItem1,
  onUpdate,
}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [text, setText] = useState("");
  const [options, setOptions] = useState("New Option");
  const [flexDirection, setFlexDirection] = useState("column");
  const [errorMessage, setErrorMessage] = useState(
    "Please enter a valid answer"
  );

  useEffect(() => {
    // Set text and singleChoice if editingItem is available
    if (editingItem?.text) {
      setText(editingItem.text);
    }
    if (editingItem?.options) {
      setOptions(editingItem.options);
    }
    if (editingItem?.flexDirection) {
      setFlexDirection(editingItem.flexDirection);
    }
  }, [editingItem]);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleSave = () => {
    // Validate text (check if it's not empty)
    if (text.trim() === "") {
      setErrorMessage("Question text cannot be empty");
      return;
    }

    // Check if options is an array or string and validate accordingly
    if (Array.isArray(options)) {
      // Validate if any option is empty
      if (options.some((option) => option.trim() === "")) {
        setErrorMessage("Question options cannot contain empty values");
        return;
      }
    } else if (typeof options === "string" && options.trim() === "") {
      setErrorMessage("Question options cannot be empty");
      return;
    }

    // Send the updated question data to the parent component
    onUpdate({
      ...editingItem,
      text,
      options,
      flexDirection,
    });
    console.log("options - ", options);
    console.log("flexDirection - ", flexDirection);
    console.log("text - ", text);

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
              <Box>
                <ShowOptionsButtons
                  flexDirection={flexDirection} // Pass the current flexDirection
                  setFlexDirection={setFlexDirection} // Pass the setter function to handle updates
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
                <OptionList
                  value={options}
                  onChange={setOptions}
                  errorMessage={errorMessage}
                  setErrorMessage={setErrorMessage}
                />
              </Box>
            ) : editingItem?.type === "email" ? (
              <EmailTab
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            ) : editingItem?.type === "multiple_choice" ? (
              <MultipleChoiceTab
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            ) : editingItem?.type === "mobile_number" ? (
              <MobileNumberTab
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
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
