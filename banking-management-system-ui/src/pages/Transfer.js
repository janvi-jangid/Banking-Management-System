import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useDashboardData from "../hooks/useDashboardData";
import { transferAmount } from "../services/transactionActions";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";

import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

export default function Transfer() {

    const { accounts, fetchData } = useDashboardData();

    const [form, setForm] = useState({
        fromAccountId: "",
        toAccountId: "",
        amount: ""
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [submitting, setSubmitting] = useState(false);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {
        if (!form.fromAccountId || !form.toAccountId || !form.amount || Number(form.amount) <= 0) {
            setSnackbar({
                open: true,
                message: "Please select both accounts and enter a valid amount.",
                severity: "warning"
            });
            return;
        }

        if (form.fromAccountId === form.toAccountId) {
            setSnackbar({
                open: true,
                message: "Source and destination accounts must be different.",
                severity: "warning"
            });
            return;
        }

        setSubmitting(true);

        try {
            const result = await transferAmount({
                fromAccountId: form.fromAccountId,
                toAccountId: form.toAccountId,
                amount: form.amount,
                accounts
            });
            fetchData();
            setForm({
                fromAccountId: "",
                toAccountId: "",
                amount: ""
            });
            setSnackbar({
                open: true,
                message: result.mode === "local"
                    ? "Money transferred locally. Start the backend to save it in the database."
                    : "Money transferred successfully.",
                severity: "success"
            });
        } catch (err) {
            fetchData();
            setSnackbar({
                open: true,
                message: err.message || "Transfer failed.",
                severity: "error"
            });
        } finally {
            setSubmitting(false);
        }
    };

    const renderAccountOption = (account) => (
        <MenuItem key={account.id} value={account.id}>
            {account.accountNumber} - {account.customer?.name || "Customer"} - Rs {Number(account.balance || 0).toLocaleString("en-IN")}
        </MenuItem>
    );

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
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                        Transfer
                    </Typography>
                    <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                        Move money securely between two accounts.
                    </Typography>
                </Box>

                <Card
                    sx={{
                        maxWidth: 760,
                        background: "#171C2C",
                        border: "1px solid #2B3043",
                        borderRadius: 4
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Stack spacing={3}>
                            <Box
                                sx={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 3,
                                    background: "#2563EB",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <SwapHorizIcon sx={{ fontSize: 40 }} />
                            </Box>

                            <TextField
                                select
                                label="From Account"
                                name="fromAccountId"
                                value={form.fromAccountId}
                                onChange={handleChange}
                                fullWidth
                            >
                                {accounts.map(renderAccountOption)}
                            </TextField>

                            <TextField
                                select
                                label="To Account"
                                name="toAccountId"
                                value={form.toAccountId}
                                onChange={handleChange}
                                fullWidth
                            >
                                {accounts.map(renderAccountOption)}
                            </TextField>

                            <TextField
                                label="Amount"
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                                fullWidth
                            />

                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={submitting}
                                sx={{
                                    alignSelf: "flex-start",
                                    background: "#2563EB",
                                    px: 4,
                                    py: 1.2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    "&:hover": {
                                        background: "#1D4ED8"
                                    }
                                }}
                            >
                                {submitting ? "Transferring..." : "Transfer Money"}
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert severity={snackbar.severity} variant="filled">
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
}
