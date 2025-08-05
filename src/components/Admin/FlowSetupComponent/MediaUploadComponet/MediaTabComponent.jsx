import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import picImg from "./picture.svg"; // placeholder image
import { toast, ToastContainer } from "react-toastify";

const GIPHY_API_KEY = "lADTumhthnqlLrBtIItDmB5PFDCns3iy"; // Replace with your API key

const MediaTabComponent = ({ media, setMedia }) => {
  const [selectedGifUrl, setSelectedGifUrl] = useState(media || "");
  const [searchTerm, setSearchTerm] = useState("good morning");
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [typingTimeout, setTypingTimeout] = useState(null);

  useEffect(() => {
    fetchGifs(false, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isSizeOk = file.size < 5 * 1024 * 1024;
      const img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
        const isDimensionOk = img.width <= 1024 && img.height <= 1024;
        if (!isSizeOk) return toast.error("File must be under 5MB");
        if (!isDimensionOk) return toast.error("Max 1024×1024 px allowed");

        const reader = new FileReader();
        reader.onloadend = () => {
          setMedia(reader.result);
          setSelectedGifUrl("");
        };
        reader.readAsDataURL(file);
      };
    }
  };

  const fetchGifs = async (append = false, customOffset = 0) => {
    try {
      const response = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: GIPHY_API_KEY,
          q: searchTerm,
          limit: 10,
          offset: customOffset,
        },
      });

      const newGifs = response.data.data;

      // Avoid duplicates when appending
      setGifs((prev) => {
        const prevIds = new Set(prev.map((gif) => gif.id));
        const uniqueNew = newGifs.filter((gif) => !prevIds.has(gif.id));
        return append ? [...prev, ...uniqueNew] : newGifs;
      });
    } catch (err) {
      console.error("GIF fetch failed:", err);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setOffset(0);
    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => fetchGifs(false, 0), 500);
    setTypingTimeout(timeout);
  };

  const handleLoadMore = () => {
    const newOffset = offset + 10;
    setOffset(newOffset);
    fetchGifs(true, newOffset);
  };

  const handleRemoveMedia = () => {
    setMedia("");
    setSelectedGifUrl("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {/* Upload Preview Box */}
      <Box
        sx={{
          border: "2px dashed #d1d5db",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <label htmlFor="upload-image" style={{ cursor: "pointer" }}>
          <img
            src={media || picImg}
            alt="upload"
            style={{ width: "60px", height: "60px", marginBottom: "10px" }}
          />
          <Typography>Upload max 1024×1024 px, under 5MB</Typography>
        </label>
        <input
          id="upload-image"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        {media && (
          <IconButton
            size="small"
            onClick={handleRemoveMedia}
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "#fff",
              boxShadow: "0 0 4px rgba(0,0,0,0.2)",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </Box>

      {/* --- OR --- */}
      <Typography sx={{ textAlign: "center", color: "#6b7280" }}>
        --- OR ---
      </Typography>

      {/* GIF Search Input */}
      <TextField
        placeholder="Search GIFs"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* GIF Grid */}
      <Grid container spacing={2}>
        {gifs.map((gif, index) => (
          <Grid item xs={3} key={index}>
            <Box sx={{ position: "relative" }}>
              <img
                src={gif.images.fixed_width.url}
                alt={gif.title}
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  cursor: "pointer",
                  border:
                    selectedGifUrl === gif.images.original.url
                      ? "3px solid #2563eb"
                      : "2px solid transparent",
                }}
                onClick={() => {
                  setMedia(gif.images.original.url);
                  setSelectedGifUrl(gif.images.original.url);
                }}
              />
              {selectedGifUrl === gif.images.original.url && (
                <IconButton
                  size="small"
                  onClick={handleRemoveMedia}
                  sx={{
                    position: "absolute",
                    top: "6px",
                    right: "6px",
                    background: "#fff",
                    boxShadow: "0 0 4px rgba(0,0,0,0.2)",
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <ToastContainer />
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      {gifs.length > 0 && (
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MediaTabComponent;
