import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const token = JSON.parse(localStorage.getItem("user"))?.token;
const userID = localStorage.getItem("userId");


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
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // will return full user object
    } catch (error) {
        throw error.response?.data?.message || "Error fetching user data";
    }
};

// Update Bot Settings (PUT method using localStorage for token & userId)
export const EditChatBotSettings = async (payload) => {
    try {

        if (!userID || !token) {
            throw new Error("Missing userId or token in localStorage");
        }


        const response = await axios.put(
            `${API_URL}/user/${userID}/layout-settings`,
            { botSettings: payload },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update bot settings";
    }
};


// <<<<<<< HEAD
export const updateUserDetails = async (userID, token, userPayload) => {
    // =======
    // export const updateUserDetails = async (user) => {
    //     // Check if userId or token is missing
    //     if (!userID || !token) {
    //         throw new Error("Missing userId or token");
    //     }
    // >>>>>>> fcc1f253ba2405578f6f4c6e1218533c13bbd2e4

    try {
        const response = await axios.put(
            `${API_URL}/user/${userID}/layout-settings`, // Correct endpoint
            userPayload, // Send updated user data
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Add Bearer token
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating user details:", error);
        throw new Error("Error updating user details");
    }
};

// Change Password
export const changePassword = async (oldPassword, newPassword) => {
    try {

        const response = await axios.put(
            `${API_URL}/change-password`, // ✅ Using POST as you fixed on backend
            { oldPassword, newPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data; // { message: "Password updated successfully" }
    } catch (error) {
        throw error.response?.data?.message || "Error changing password";
    }
};

