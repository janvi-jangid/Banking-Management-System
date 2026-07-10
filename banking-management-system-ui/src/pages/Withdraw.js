import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useDashboardData from "../hooks/useDashboardData";
import { withdrawAmount } from "../services/transactionActions";

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

import SavingsIcon from "@mui/icons-material/Savings";

export default function Withdraw() {

    const { accounts, fetchData } = useDashboardData();

    const [form, setForm] = useState({
        accountId: "",
        amount: ""
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [submitting, setSubmitting] = useState(false);

    const selectedAccount = accounts.find(
        account => String(account.id) === String(form.accountId)
    );

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async () => {
        if (!form.accountId || !form.amount || Number(form.amount) <= 0) {
            setSnackbar({
                open: true,
                message: "Please select an account and enter a valid amount.",
                severity: "warning"
            });
            return;
        }

        setSubmitting(true);

        try {
            const result = await withdrawAmount({
                accountId: form.accountId,
                amount: form.amount,
                accounts
            });
            fetchData();
            setForm({ accountId: "", amount: "" });
            setSnackbar({
                open: true,
                message: result.mode === "local"
                    ? "Amount withdrawn locally. Start the backend to save it in the database."
                    : "Amount withdrawn successfully.",
                severity: "success"
            });
        } catch (err) {
            fetchData();
            setSnackbar({
                open: true,
                message: err.message || "Withdraw failed.",
                severity: "error"
            });
        } finally {
            setSubmitting(false);
        }
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
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 700 }}>
                        Withdraw
                    </Typography>
                    <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                        Withdraw money from an existing customer account.
                    </Typography>
                </Box>

                <Card
                    sx={{
                        maxWidth: 680,
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
                                    background: "#DC2626",
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <SavingsIcon sx={{ fontSize: 36 }} />
                            </Box>

                            <TextField
                                select
                                label="Account"
                                name="accountId"
                                value={form.accountId}
                                onChange={handleChange}
                                fullWidth
                            >
                                {accounts.map((account) => (
                                    <MenuItem key={account.id} value={account.id}>
                                        {account.accountNumber} - Balance: Rs {Number(account.balance || 0).toLocaleString("en-IN")}
                                    </MenuItem>
                                ))}
                            </TextField>

                            {selectedAccount && (
                                <Typography sx={{ color: "#94A3B8" }}>
                                    Available balance: Rs {Number(selectedAccount.balance || 0).toLocaleString("en-IN")}
                                </Typography>
                            )}

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
                                    background: "#DC2626",
                                    px: 4,
                                    py: 1.2,
                                    textTransform: "none",
                                    fontWeight: 700,
                                    "&:hover": {
                                        background: "#B91C1C"
                                    }
                                }}
                            >
                                {submitting ? "Withdrawing..." : "Withdraw Amount"}
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
