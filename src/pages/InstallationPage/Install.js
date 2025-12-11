// src/pages/Install.jsx  (replace your existing Install.jsx with this)
import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Button, TextField, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Install = () => {
    const navigate = useNavigate();
    const [snippet, setSnippet] = useState("");
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(false);

    const goToWhitelist = () => {
        navigate({ pathname: "/app/settings", search: "?tab=whitelist" });
    };

    const fetchSnippet = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const res = await fetch("/api/auth/install/snippet", {
                headers: { Authorization: "Bearer " + token },
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to fetch snippet");
            }
            const data = await res.json();
            setSnippet(data.snippet || "");
            setMeta({ chatbotId: data.chatbotId, whitelist: data.whitelist || [] });
        } catch (e) {
            console.error(e);
            alert(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSnippet();
        // eslint-disable-next-line
    }, []);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(snippet);
            alert("Snippet copied to clipboard");
        } catch {
            alert("Unable to copy — select and copy manually");
        }
    };

    return (
        <Box container spacing={4} style={{ padding: "24px", background: "#F6F9FF", display: "flex", gap: "10px" }}>
            {/* Left: options if needed */}
            <Box sx={{ width: "40%" }}>
                <Paper sx={{ p: 2 }}>
                    <Typography variant="h6">Installation Options</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        Use the script on allowed domains only.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={goToWhitelist}>Update Whitelisting URLs</Button>
                    </Box>
                </Paper>
            </Box>

            {/* Right: snippet */}
            <Box sx={{ width: "60%" }}>
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Copy the installation code and paste it before the closing &lt;/head&gt; tag of your website
                    </Typography>

                    {meta && meta.whitelist && meta.whitelist.length === 0 && (
                        <Alert severity="warning" sx={{ mb: 2 }}>
                            You have not added any whitelisted domains. Please add your domain in Whitelisting first.
                        </Alert>
                    )}

                    <TextField
                        fullWidth
                        multiline
                        minRows={8}
                        value={snippet}
                        InputProps={{ readOnly: true }}
                        sx={{ mb: 2, background: "#fafafa" }}
                    />

                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button variant="contained" onClick={copyToClipboard} disabled={!snippet || loading}>
                            Copy Snippet
                        </Button>
                        <Button variant="outlined" onClick={() => window.open(`/api/auth/install/snippet`, "_blank")}>
                            Open Snippet (raw)
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default Install;
