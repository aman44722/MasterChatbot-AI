import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ShowOptionsButtons from "./ShowOptionsButtons";
import OptionInputRow from "./OptionInputRow";
// import ShowOptionsButtons from "./ShowOptionsButtons";
// import OptionInputRow from "./OptionInputRow";

const SingleChoiceTab = () => {
  return (
    <>
      <Typography sx={{ mb: 2 }}>Show Options</Typography>
      <ShowOptionsButtons />

      <Typography sx={{ mb: 1 }}>Options</Typography>
      <OptionInputRow />

      <Button variant="outlined" size="small">
        Add
      </Button>
    </>
  );
};

export default SingleChoiceTab;
