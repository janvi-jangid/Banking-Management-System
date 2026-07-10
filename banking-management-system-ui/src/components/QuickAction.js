import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";

const actions = [
    {
        title: "Add Customer",
        icon: <PersonAddAlt1Icon sx={{ fontSize: 42, color: "#A855F7" }} />,
        path: "/customers"
    },
    {
        title: "Create Account",
        icon: <AccountBalanceIcon sx={{ fontSize: 42, color: "#3B82F6" }} />,
        path: "/accounts"
    },
    {
        title: "Deposit",
        icon: <PaymentsIcon sx={{ fontSize: 42, color: "#22C55E" }} />,
        path: "/deposit"
    },
    {
        title: "Withdraw",
        icon: <SavingsIcon sx={{ fontSize: 42, color: "#F59E0B" }} />,
        path: "/withdraw"
    },
    {
        title: "Transfer",
        icon: <SwapHorizIcon sx={{ fontSize: 42, color: "#38BDF8" }} />,
        path: "/transfer"
    },
    {
        title: "Transactions",
        icon: <ReceiptLongIcon sx={{ fontSize: 42, color: "#A855F7" }} />,
        path: "/transactions"
    }
];

export default function QuickAction() {

    return (
        <Card
            sx={{
                background: "linear-gradient(145deg,rgba(17,26,46,.96),rgba(11,18,34,.96))",
                borderRadius: 2,
                border: "1px solid rgba(148,163,184,.2)",
                height: "100%",
                boxShadow: "0 18px 48px rgba(0,0,0,.24)"
            }}
        >
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                        color: "white",
                        fontWeight: 900,
                        mb: 3
                    }}
                >
                    Quick Actions
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2,1fr)",
                            md: "repeat(3,1fr)"
                        },
                        gap: 2
                    }}
                >

                    {actions.map((action) => (

                        <Box
                            component={Link}
                            to={action.path}
                            key={action.title}
                            sx={{
                                background: "linear-gradient(145deg,rgba(30,41,65,.9),rgba(17,26,46,.88))",
                                border: "1px solid rgba(148,163,184,.16)",
                                borderRadius: 2,
                                height: 120,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                textDecoration: "none",
                                transition: "0.3s",

                                "&:hover": {
                                    transform: "translateY(-6px)",
                                    borderColor: "#8B5CF6",
                                    boxShadow: "0 12px 30px rgba(139,92,246,.25)"
                                }
                            }}
                        >

                            {action.icon}

                            <Typography
                                sx={{
                                    color: "white",
                                    mt: 2,
                                    fontSize: 15,
                                    fontWeight: 500,
                                    textAlign: "center"
                                }}
                            >
                                {action.title}
                            </Typography>

                        </Box>

                    ))}

                </Box>

            </CardContent>
        </Card>
    );
}
