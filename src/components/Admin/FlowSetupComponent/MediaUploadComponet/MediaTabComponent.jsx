import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import picImg from "./picture.svg"; // Make sure to use correct path to placeholder image

const MediaTabComponent = () => {
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => setCompanyLogo(reader.result);
      reader.readAsDataURL(file);
    } else {
      alert("File size exceeds 5MB");
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Upload Image Box */}
      <label
        htmlFor="upload-logo"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #d1d5db",
          borderRadius: "10px",
          padding: "20px",
          cursor: "pointer",
          marginTop: "15px",
        }}
      >
        <img
          src={companyLogo || picImg}
          alt="placeholder"
          style={{ width: "40px", height: "40px", marginBottom: "10px" }}
        />
        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          File Size should be less than 5 MB
        </span>
        <input
          id="upload-logo"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </label>

      {/* OR Divider */}
      {/* <Box sx={{ textAlign: "center", fontWeight: 600, color: "#999" }}>
        --- OR ---
      </Box> */}

      {/* GIF Search */}
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "8px 12px",
        }}
      >
        <input
          type="text"
          placeholder="Search GIFs"
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            fontSize: "15px",
            backgroundColor: "transparent",
          }}
        />
        <img
          src="https://img.icons8.com/ios/20/search--v1.png"
          alt="Search"
          style={{ opacity: 0.6 }}
        />
      </Box> */}

      {/* Load More Button */}
      {/* <Box sx={{ textAlign: "center" }}>
        <button
          style={{
            padding: "8px 20px",
            border: "2px solid #4F46E5",
            borderRadius: "6px",
            background: "transparent",
            color: "#4F46E5",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      </Box> */}
    </Box>
  );
};

export default MediaTabComponent;
