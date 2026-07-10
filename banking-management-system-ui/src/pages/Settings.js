import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getAuthUser, saveAuthUser } from "../services/auth";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Snackbar,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const SETTINGS_KEY = "novabankSettings";

function readSettings() {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    } catch {
        return {};
    }
}

export default function Settings() {
    const user = getAuthUser();
    const savedSettings = useMemo(readSettings, []);

    const [settings, setSettings] = useState({
        displayName: savedSettings.displayName || user?.username || "Admin",
        apiUrl: savedSettings.apiUrl || process.env.REACT_APP_API_URL || "http://localhost:8080",
        lowBalanceLimit: savedSettings.lowBalanceLimit || "1000"
    });
    const [snackbar, setSnackbar] = useState("");

    const handleChange = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        });
    };

    const handleSave = () => {
        if (!settings.displayName.trim() || !settings.apiUrl.trim()) {
            setSnackbar("Display name and API URL are required.");
            return;
        }

        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        saveAuthUser(settings.displayName.trim(), user?.message || "Settings Updated");
        setSnackbar("Settings saved successfully.");
    };

    const handleReset = () => {
        const nextSettings = {
            displayName: "Admin",
            apiUrl: "http://localhost:8080",
            lowBalanceLimit: "1000"
        };

        setSettings(nextSettings);
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(nextSettings));
        saveAuthUser(nextSettings.displayName, "Settings Reset");
        setSnackbar("Settings reset to defaults.");
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#0F111A",
                    minHeight: "100vh",
                    p: 4
                }}
            >
                <Toolbar />
                <Navbar />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 800 }}>
                        Settings
                    </Typography>
                    <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                        Configure your profile and local application preferences.
                    </Typography>
                </Box>

                <Card
                    sx={{
                        maxWidth: 760,
                        background: "#171C2C",
                        border: "1px solid #2B3043",
                        borderRadius: 2
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={3}>
                            <TextField
                                label="Display Name"
                                name="displayName"
                                value={settings.displayName}
                                onChange={handleChange}
                                fullWidth
                            />

                            <TextField
                                label="Backend API URL"
                                name="apiUrl"
                                value={settings.apiUrl}
                                onChange={handleChange}
                                fullWidth
                                helperText="Restart the frontend after changing the API URL."
                            />

                            <TextField
                                label="Low Balance Alert Limit"
                                name="lowBalanceLimit"
                                type="number"
                                value={settings.lowBalanceLimit}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                <Button
                                    variant="contained"
                                    startIcon={<SaveIcon />}
                                    onClick={handleSave}
                                    sx={{
                                        bgcolor: "#7C3AED",
                                        textTransform: "none",
                                        fontWeight: 800,
                                        "&:hover": { bgcolor: "#6D28D9" }
                                    }}
                                >
                                    Save Settings
                                </Button>

                                <Button
                                    variant="outlined"
                                    startIcon={<RestartAltIcon />}
                                    onClick={handleReset}
                                    sx={{
                                        color: "#CBD5E1",
                                        borderColor: "#475569",
                                        textTransform: "none",
                                        fontWeight: 700
                                    }}
                                >
                                    Reset
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

                <Snackbar
                    open={Boolean(snackbar)}
                    autoHideDuration={2800}
                    onClose={() => setSnackbar("")}
                >
                    <Alert severity={snackbar.includes("required") ? "warning" : "success"} variant="filled">
                        {snackbar}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
