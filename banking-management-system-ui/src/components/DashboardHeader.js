import {
    Box,
    Typography,
    TextField,
    Avatar,
    IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function DashboardHeader() {

    return (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
            }}
        >

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >

                <MenuIcon
                    sx={{
                        color: "white",
                        fontSize: 34
                    }}
                />

                <Typography
                    variant="h4"
                    sx={{
                        color: "white",
                        fontWeight: "bold"
                    }}
                >
                    Welcome back, Admin
                </Typography>

            </Box>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3
                }}
            >

                <TextField
                    size="small"
                    placeholder="Search here..."
                    InputProps={{
                        startAdornment: <SearchIcon sx={{ color: "#888", mr: 1 }} />
                    }}
                    sx={{
                        width: 280,
                        input: {
                            color: "white"
                        },
                        "& fieldset": {
                            borderColor: "#2F3142"
                        }
                    }}
                />

                <IconButton>
                    <NotificationsNoneIcon sx={{ color: "white" }} />
                </IconButton>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1
                    }}
                >

                    <CalendarMonthIcon
                        sx={{
                            color: "white"
                        }}
                    />

                    <Typography color="white">
                        05 July 2026
                    </Typography>

                </Box>

                <Avatar
                    sx={{
                        width: 45,
                        height: 45
                    }}
                />

                <KeyboardArrowDownIcon
                    sx={{
                        color: "white"
                    }}
                />

            </Box>

        </Box>

    );

}
