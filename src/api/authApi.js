import axios from "axios";

const API_URL = process.env.REACT_APP_AUTH_API;
console.log("api is not working", API_URL);


// Register User
export const registerUser = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/register`, payload);
        return response.data; // returns { token, user }
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

// Login User
export const loginUser = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/login`, payload);
        return response.data; // returns { token, user }
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Fetch User Data by ID
export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        return response.data; // returns { fullName, email }
    } catch (error) {
        throw error.response?.data?.message || "Error fetching user data";
    }
};
