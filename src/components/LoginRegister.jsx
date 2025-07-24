import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert("Login successful!");
        navigate("/"); // ✅ Go to dashboard after login
      } else {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        alert("Registration successful!");
        navigate("/"); // ✅ Go to dashboard after register
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={4} sx={{ padding: 4, mt: 10, borderRadius: 3 }}>
        <Typography variant="h5" align="center" fontWeight={600} mb={3}>
          {isLogin ? "Login to Your Account" : "Create a New Account"}
        </Typography>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <TextField
              fullWidth
              margin="normal"
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.3 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          mt={2}
          color="text.secondary"
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Button variant="text" onClick={toggleMode}>
            {isLogin ? "Register here" : "Login"}
          </Button>
        </Typography>
      </Paper>
    </Container>
  );
};

export default AuthForm;
