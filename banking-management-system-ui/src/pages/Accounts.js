import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import AccountTable from "../components/AccountTable";
import CreateAccountDialog from "../components/CreateAccountDialog";

import useDashboardData from "../hooks/useDashboardData";

import {
    Box,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Accounts() {

    const {
        accounts,
        customers,
        loading,
        error,
        fetchData
    } = useDashboardData();

    const [open, setOpen] = useState(false);
    const [editAccount, setEditAccount] = useState(null);
    const handleOpen = () => {
        setEditAccount(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditAccount(null);
    };

    const handleEdit = (account) => {
        setEditAccount(account);
        setOpen(true);
    };

    const refreshAccounts = () => {
        fetchData();
    };

    return (

        <Box sx={{ display: "flex" }}>

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "#0f111a",
                    minHeight: "100vh",
                    p: 4
                }}
            >

                <Toolbar />

                <Navbar />

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >
                            Accounts
                        </Typography>

                        <Typography
                            sx={{
                                color: "#9CA3AF"
                            }}
                        >
                            Manage all bank accounts.
                        </Typography>

                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        sx={{
                            background: "#8B5CF6",
                            "&:hover": {
                                background: "#7C3AED"
                            }
                        }}
                    >
                        Create Account
                    </Button>

                </Box>

                <AccountTable
                    accounts={accounts}
                    handleEdit={handleEdit}
                    refreshAccounts={refreshAccounts}
                />
                <CreateAccountDialog
                    open={open}
                    handleClose={handleClose}
                    customers={customers}
                    loadingCustomers={loading}
                    dataError={error}
                    refreshAccounts={refreshAccounts}
                    editAccount={editAccount}
                />

            </Box>

        </Box>

    );

}
