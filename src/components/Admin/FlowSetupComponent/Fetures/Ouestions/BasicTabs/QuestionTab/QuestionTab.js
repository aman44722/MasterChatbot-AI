import { Box, Switch, TextField, Typography } from '@mui/material'
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import React from 'react'

const QuestionTab = ({ errorMessage, setErrorMessage }) => {
  return (
    <>
      <Box sx={{ mt: 1 }}>
        {/* Toggle Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 3,
          }}
        >
          <Switch
            defaultChecked={false}
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#fff",
                transform: "translateX(16px)",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#ef4444", // red
                opacity: 1,
              },
              "& .MuiSwitch-track": {
                backgroundColor: "#ddd",
              },
            }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              color: "#6b7280",
            }}
          >
            Do Not Give Skip Option
          </Typography>
        </Box>

        {/* Error message input */}
        <Typography sx={{ fontWeight: 500, mb: 1 }}>
          Enter the error message here.{" "}
          <InfoOutlinedIcon fontSize="small" sx={{ color: "#9CA3AF", verticalAlign: "middle" }} />
        </Typography>

        <TextField
          fullWidth
          placeholder="Please enter a valid answer"
          value={errorMessage}
          onChange={(e) => setErrorMessage(e.target.value)}
          size="small"
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              backgroundColor: "#fff",
            },
          }}
        />
      </Box>
    </>

  )
}

export default QuestionTab
