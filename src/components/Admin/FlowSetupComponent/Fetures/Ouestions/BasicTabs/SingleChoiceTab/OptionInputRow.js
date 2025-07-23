import React from "react";
import { Box, TextField } from "@mui/material";

const OptionInputRow = ({ optionText, onChange }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 1 }}>
      <TextField fullWidth placeholder="Enter option text" />

      <TextField
        select
        fullWidth
        value={"Main Flow"}
        onChange={() => {}}
        SelectProps={{ native: true }}
      >
        <option value="Main Flow">Main Flow</option>
        {/* Add other flows here */}
      </TextField>

      <TextField
        select
        fullWidth
        value={"No Jump"}
        onChange={() => {}}
        SelectProps={{ native: true }}
      >
        <option value="No Jump">No Jump</option>
        {/* Add jump logic here */}
      </TextField>
    </Box>
  );
};

export default OptionInputRow;
