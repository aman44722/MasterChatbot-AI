import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

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

// Update Bot Settings (PUT method using localStorage for token & userId)
export const EditChatBotSettings = async (payload) => {
    try {
        const userID = localStorage.getItem("userId");
        const token = JSON.parse(localStorage.getItem("user"))?.token;

        if (!userID || !token) {
            throw new Error("Missing userId or token in localStorage");
        }
        console.log('userID', userID);

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


export const updateUserDetails = async (user) => {
    const userID = localStorage.getItem("userId");
    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!userID || !token) throw new Error("Missing userId or token");

    const response = await axios.put(
        `${API_URL}/user/${userID}/layout-settings`,   // normal user update route
        user,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        }
    );

    return response.data;
};

