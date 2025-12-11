// src/api/authapi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";
const token = JSON.parse(localStorage.getItem("user"))?.token;
const userID = localStorage.getItem("userId");

// ----------------- AUTH -----------------

// Register User
export const registerUser = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/register`, payload);
        return response.data; // { token, user }
    } catch (error) {
        throw error.response?.data?.message || "Registration failed";
    }
};

// Login User
export const loginUser = async (payload) => {
    try {
        const response = await axios.post(`${API_URL}/login`, payload);
        return response.data; // { token, user }
    } catch (error) {
        throw error.response?.data?.message || "Login failed";
    }
};

// Fetch User Data by ID
export const fetchUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data; // full user object
    } catch (error) {
        throw error.response?.data?.message || "Error fetching user data";
    }
};

// Update Bot Settings
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
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to update bot settings";
    }
};

// Update User (if you’re using same endpoint for profile/layout)
export const updateUserDetails = async (userID, token, userPayload) => {
    try {
        const response = await axios.put(
            `${API_URL}/user/${userID}/layout-settings`,
            userPayload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
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
            `${API_URL}/change-password`,
            { oldPassword, newPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // { message: "Password updated successfully" }
    } catch (error) {
        throw error.response?.data?.message || "Error changing password";
    }
};

// ----------------- NEW: Whitelist / Install -----------------

/**
 * Save whitelisting URLs
 * @param {string|string[]} domains - "a.com, https://b.com" OR ["a.com","b.com"]
 */
export const saveWhitelistingUrls = async (domains) => {
    try {
        const response = await axios.post(
            `${API_URL}/settings/whitelist`,
            { domains },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        // returns: { ok, whitelist: [...], count }
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to save whitelisting URLs";
    }
};

/**
 * Get installation meta (checks if whitelist exists)
 * returns: { chatbotId, hasWhitelist }
 */
export const getInstallMeta = async () => {
    try {
        const response = await axios.get(`${API_URL}/install/meta`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch install meta";
    }
};

/**
 * Get installation snippet (only if whitelist present)
 * returns: { chatbotId, hasWhitelist: true, snippet, whitelist }
 * if whitelist missing -> { hasWhitelist: false }
 */
export const getInstallSnippet = async () => {
    try {
        const response = await axios.get(`${API_URL}/install/snippet`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error?.response?.status === 412) {
            // Precondition failed: whitelist empty
            return { hasWhitelist: false };
        }
        throw error.response?.data?.message || "Failed to fetch install snippet";
    }
};

/**
 * (Optional) Get current whitelist (to prefill textarea)
 * returns: { ok, whitelist: [...], blacklist: [...] }
 */
export const getWhitelist = async () => {
    try {
        const response = await axios.get(`${API_URL}/settings/whitelist`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Failed to fetch whitelist";
    }
};
