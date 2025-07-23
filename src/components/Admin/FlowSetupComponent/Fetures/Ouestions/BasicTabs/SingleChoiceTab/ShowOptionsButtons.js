import React from "react";
import { Box, Button } from "@mui/material";

const options = [
  "Vertically",
  "Horizontally",
  "Dropdown",
  "Do not show",
  "List View",
];

const ShowOptionsButtons = ({ selected, onSelect }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
      {options.map((label) => (
        <Button
          key={label}
          variant={selected === label ? "contained" : "outlined"}
          size="small"
          onClick={() => onSelect && onSelect(label)}
        >
          {label}
        </Button>
      ))}
    </Box>
  );
};

export default ShowOptionsButtons;
