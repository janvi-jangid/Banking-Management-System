import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    InputBase,
    Avatar,
    Snackbar,
    Alert,
    Tooltip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthUser } from "../services/auth";

export default function Navbar() {
    const navigate = useNavigate();
    const user = getAuthUser();
    const [query, setQuery] = useState("");
    const [notice, setNotice] = useState("");

    const today = useMemo(() => new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(new Date()), []);

    const displayName = user?.username || "Admin";

    const handleSearch = (event) => {
        if (event.key !== "Enter") return;

        const value = query.trim().toLowerCase();
        if (!value) {
            setNotice("Type customers, accounts, deposit, withdraw, transfer, or transactions.");
            return;
        }

        const routes = [
            { keywords: ["customer", "customers", "client"], path: "/customers" },
            { keywords: ["account", "accounts"], path: "/accounts" },
            { keywords: ["deposit", "cash in"], path: "/deposit" },
            { keywords: ["withdraw", "cash out"], path: "/withdraw" },
            { keywords: ["transfer"], path: "/transfer" },
            { keywords: ["transaction", "transactions", "history"], path: "/transactions" },
            { keywords: ["setting", "settings", "profile"], path: "/settings" },
            { keywords: ["notification", "notifications", "alerts"], path: "/notifications" }
        ];

        const match = routes.find(route =>
            route.keywords.some(keyword => keyword.includes(value) || value.includes(keyword))
        );

        if (match) {
            navigate(match.path);
            setQuery("");
        } else {
            setNotice(`No shortcut found for "${query}".`);
        }
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    background: "rgba(5,11,24,.82)",
                    backdropFilter: "blur(14px)",
                    borderBottom: "1px solid rgba(148,163,184,.18)",
                    width: `calc(100% - 260px)`,
                    ml: "260px"
                }}
            >
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 3, minHeight: 78 }}>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Tooltip title="Dashboard">
                        <IconButton sx={{ color: "white" }} onClick={() => navigate("/dashboard")}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 800,
                            color: "#FFFFFF"
                        }}
                    >
                        Welcome back, {displayName}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(7,15,32,.72)",
                        border: "1px solid rgba(148,163,184,.35)",
                        px: 2,
                        py: 0.8,
                        borderRadius: 2,
                        width: { xs: "220px", md: "360px" },
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,.04)"
                    }}
                >
                    <SearchIcon sx={{ color: "#FFFFFF", mr: 1 }} />
                    <InputBase
                        placeholder="Search pages..."
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={handleSearch}
                        sx={{
                            color: "white",
                            width: "100%",
                            "& input::placeholder": {
                                color: "#D1D5DB",
                                opacity: 1
                            }
                        }}
                    />
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                    <Tooltip title="Notifications">
                        <IconButton sx={{ color: "white" }} onClick={() => navigate("/notifications")}>
                            <NotificationsIcon />
                        </IconButton>
                    </Tooltip>

                    <Box
                        sx={{
                            display: { xs: "none", md: "flex" },
                            alignItems: "center",
                            gap: 1,
                            color: "white",
                            fontWeight: 700
                        }}
                    >
                        <CalendarMonthIcon sx={{ fontSize: 20 }} />
                        {today}
                    </Box>

                    <Avatar
                        onClick={() => navigate("/settings")}
                        sx={{
                            bgcolor: "#C7D2FE",
                            color: "#0B1020",
                            width: 42,
                            height: 42,
                            fontWeight: 600,
                            cursor: "pointer"
                        }}
                    >
                        {displayName.charAt(0).toUpperCase()}
                    </Avatar>

                </Box>

                </Toolbar>
            </AppBar>

            <Snackbar
                open={Boolean(notice)}
                autoHideDuration={2800}
                onClose={() => setNotice("")}
            >
                <Alert severity="info" variant="filled">
                    {notice}
                </Alert>
            </Snackbar>
        </>
    );
}
