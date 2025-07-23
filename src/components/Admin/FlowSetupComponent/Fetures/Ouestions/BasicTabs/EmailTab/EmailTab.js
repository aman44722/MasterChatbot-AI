import React from 'react'

const EmailTab = () => {
  return (
   <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 2,
                    gap: 2,
                }}
            >
                <Typography>Do Not Give Skip email</Typography>
                <Switch />
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
                <TextField fullWidth label="Minimum Value" />
                <TextField fullWidth label="Maximum Value" />
            </Box>
        </>
  )
}

export default EmailTab
