import React, { useState } from "react";
import { Grid, Paper, Typography, Button, Box, TextField } from "@mui/material";
import { useNavigate, createSearchParams, useLocation } from "react-router-dom";

const Install = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Read whitelist from URL params
    const params = new URLSearchParams(location.search);
    const whitelist = JSON.parse(params.get("whitelist") || "[]");

    const goToWhitelist = () => {
        navigate({
            pathname: "/app/settings",
            search: `?${createSearchParams({ tab: "whitelist" })}`,
        });
    };

    const TABS = {
        WEBSITE: "website",
        INSTAGRAM: "instagram",
        WHATSAPP: "whatsapp",
        MESSENGER: "messenger",
        WORDPRESS: "wordpress",
        MOBILE: "mobile",
        LANDING: "landing",
        WIDGET: "widget",
        DRUPAL: "drupal",
    };

    const options = [
        { id: TABS.WEBSITE, label: "Website / Blog Installation", icon: "🌐" },
        { id: TABS.INSTAGRAM, label: "Instagram Installation", icon: "📸" },
        { id: TABS.WHATSAPP, label: "WhatsApp Installation", icon: "💬" },
        { id: TABS.MESSENGER, label: "Messenger Installation", icon: "📨" },
        { id: TABS.WORDPRESS, label: "Wordpress Installation", icon: "📝" },
        { id: TABS.MOBILE, label: "Mobile App Installation", icon: "📱" },
        { id: TABS.LANDING, label: "Landing Page Installation", icon: "📄" },
        { id: TABS.WIDGET, label: "Widget Installation", icon: "🔲" },
        { id: TABS.DRUPAL, label: "Drupal Installation", icon: "🎭" },
    ];

    const [activeTab, setActiveTab] = useState(TABS.WEBSITE);

    // Generate script dynamically
    const generatedScript = `
<script>
window.myChatbotConfig = {
    allowedDomains: ${JSON.stringify(whitelist)}
};
</script>

<script src="https://cdn.yoursite.com/chatbot.js"></script>
`;

    return (
        <Box container spacing={4} style={{ padding: "24px", background: "#F6F9FF", display: 'flex', gap: '10px' }}>
            {/* Left Section */}
            <Box sx={{ width: "40%" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
                    {options.map((item) => (
                        <Paper
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            elevation={activeTab === item.id ? 4 : 1}
                            sx={{
                                p: 2, textAlign: "center", cursor: "pointer", height: 150,
                                border: activeTab === item.id ? "2px solid #1976d2" : "1px solid #e0e0e0",
                                bgcolor: activeTab === item.id ? "#e3f2fd" : "#fff",
                            }}
                        >
                            <Typography variant="h4">{item.icon}</Typography>
                            <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                                {item.label}
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Box>

            {/* Right Section */}
            <Box sx={{ width: "60%" }}>
                <Paper
                    elevation={2}
                    sx={{
                        p: 5, height: "80vh",
                        display: "flex", flexDirection: "column", gap: 3,
                        alignItems: "center",
                    }}
                >
                    {activeTab === TABS.WEBSITE ? (
                        <>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                Add this code before {"</head>"} tag on your website
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                minRows={8}
                                value={generatedScript}
                                InputProps={{ readOnly: true }}
                                sx={{ bgcolor: "#f5f5f5" }}
                            />

                            <Button variant="contained" onClick={goToWhitelist}>
                                Update Whitelisting URLs
                            </Button>
                        </>
                    ) : (
                        <Typography color="text.secondary" variant="h6">
                            Installation guide for <b>{options.find(o => o.id === activeTab)?.label}</b> will appear here.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Box >
    );
};

export default Install;
