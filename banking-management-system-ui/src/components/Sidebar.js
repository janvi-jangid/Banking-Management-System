import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Box,
    Avatar
} from "@mui/material";

import { Link, useLocation, useNavigate } from "react-router-dom";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearAuthUser } from "../services/auth";

const drawerWidth = 260;

const menuItems = [
    {
        text: "Dashboard",
        icon: <DashboardIcon />,
        path: "/dashboard"
    },
    {
        text: "Customers",
        icon: <PeopleIcon />,
        path: "/customers"
    },
    {
        text: "Accounts",
        icon: <AccountBalanceIcon />,
        path: "/accounts"
    },
    {
        text: "Deposit",
        icon: <PaymentsIcon />,
        path: "/deposit"
    },
    {
        text: "Withdraw",
        icon: <SavingsIcon />,
        path: "/withdraw"
    },
    {
        text: "Transfer",
        icon: <SwapHorizIcon />,
        path: "/transfer"
    },
    {
        text: "Transactions",
        icon: <ReceiptLongIcon />,
        path: "/transactions"
    },
    {
        text: "Notifications",
        icon: <NotificationsIcon />,
        path: "/notifications"
    },
    {
        text: "Settings",
        icon: <SettingsIcon />,
        path: "/settings"
    }
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const activePath = location.pathname;

    const handleLogout = () => {
        clearAuthUser();
        navigate("/");
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    background: "linear-gradient(180deg,#071023 0%,#050B18 100%)",
                    color: "white",
                    borderRight: "1px solid rgba(148,163,184,.24)"
                }
            }}
        >
            <Toolbar sx={{ minHeight: 104, px: 3 }}>
                <Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 900,
                            color: "#A855F7",
                            letterSpacing: 1
                        }}
                    >
                        JustBank
                    </Typography>

                    <Typography
                        variant="body2"
                        sx={{
                            color: "#9CA3AF",
                            mt: 0.5
                        }}
                    >
                        Smart Banking Platform
                    </Typography>
                </Box>
            </Toolbar>

            <List>
                {menuItems.map((item) => (
                    <ListItemButton
                        component={Link}
                        to={item.path}
                        key={item.text}
                        sx={{
                            mx: 1.2,
                            my: 0.75,
                            py: 1.25,
                            borderRadius: 2,
                            background: activePath === item.path
                                ? "linear-gradient(135deg,#7C3AED,#4C1D95)"
                                : "transparent",
                            color: "white",
                            "&:hover": {
                                background: "linear-gradient(135deg,#7C3AED,#4C1D95)"
                            }
                        }}
                    >
                        <ListItemIcon sx={{ color: "white" }}>
                            {item.icon}
                        </ListItemIcon>

                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>

            <Box sx={{ flexGrow: 1 }} />

            <Box
                sx={{
                    mx: 2,
                    mb: 2,
                    p: 2,
                    borderRadius: 2,
                    border: "1px solid rgba(148,163,184,.2)",
                    background: "rgba(17,26,46,.72)",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5
                }}
            >
                <Avatar sx={{ bgcolor: "#C7D2FE", color: "#0B1020" }}>
                    A
                </Avatar>
                <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                        Admin
                    </Typography>
                    <Typography sx={{ color: "#AEB8D1", fontSize: 13 }}>
                        Administrator
                    </Typography>
                </Box>
            </Box>

            <List>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        m: 2,
                        borderRadius: 2,
                        background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
                        "&:hover": {
                            background: "linear-gradient(135deg,#8B5CF6,#5B21B6)"
                        }
                    }}
                >
                    <ListItemIcon sx={{ color: "white" }}>
                        <LogoutIcon />
                    </ListItemIcon>

                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>

        </Drawer>
    );
}
