import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";
import { saveLocalAccount } from "../services/localStore";

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
    Snackbar,
    Alert,
    Typography
} from "@mui/material";

const emptyAccount = {
    accountNumber: "",
    accountType: "Savings",
    balance: "",
    customerId: ""
};

export default function CreateAccountDialog({
                                                open,
                                                handleClose,
                                                customers,
                                                loadingCustomers = false,
                                                dataError = "",
                                                refreshAccounts,
                                                editAccount = null
                                            }) {

    const [account, setAccount] = useState(emptyAccount);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {

        if (editAccount) {

            setAccount({
                accountNumber: editAccount.accountNumber,
                accountType: editAccount.accountType,
                balance: editAccount.balance,
                customerId: editAccount.customer?.id || ""
            });

        } else {

            setAccount(emptyAccount);

        }

    }, [editAccount, open]);

    const handleChange = (e) => {

        setAccount({
            ...account,
            [e.target.name]: e.target.value
        });

    };

    const validate = () => {

        if (
            !account.customerId ||
            !account.accountNumber ||
            !account.balance
        ) {

            setSnackbar({
                open: true,
                message: "Please fill all fields.",
                severity: "warning"
            });

            return false;
        }

        return true;

    };

    const handleSave = () => {

        if (customers.length === 0) {
            setSnackbar({
                open: true,
                message: "Please add a customer before creating an account.",
                severity: "warning"
            });
            return;
        }

        if (!validate()) return;

        const payload = {

            accountNumber: account.accountNumber,
            accountType: account.accountType,
            balance: Number(account.balance),

            customer: {
                id: Number(account.customerId)
            }

        };

        const selectedCustomer = customers.find(
            customer => Number(customer.id) === Number(account.customerId)
        );

        const request = editAccount
            ? api.put(`/accounts/${editAccount.id}`, payload)
            : api.post("/accounts", payload);

        request
            .then(() => {

                refreshAccounts();

                handleClose();

                setSnackbar({
                    open: true,
                    message: editAccount
                        ? "Account Updated Successfully"
                        : "Account Created Successfully",
                    severity: "success"
                });

                setAccount(emptyAccount);

            })
            .catch((err) => {

                if (!err.response) {
                    saveLocalAccount({
                        id: editAccount?.id,
                        accountNumber: account.accountNumber,
                        accountType: account.accountType,
                        balance: Number(account.balance),
                        customer: selectedCustomer
                    });

                    refreshAccounts();
                    handleClose();
                    setAccount(emptyAccount);

                    setSnackbar({
                        open: true,
                        message: "Account saved locally. Start the backend to save it in the database.",
                        severity: "success"
                    });

                    return;
                }

                setSnackbar({
                    open: true,
                    message: getApiErrorMessage(err),
                    severity: "error"
                });

            });

    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        bgcolor: "#171C2C",
                        color: "white",
                        borderRadius: 4,
                        border: "1px solid #2B3043"
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        color: "#A855F7",
                        fontWeight: 700,
                        fontSize: 24
                    }}
                >
                    {editAccount ? "Edit Account" : "Create New Account"}
                </DialogTitle>

                <DialogContent>

                    <Typography
                        sx={{
                            color: "#94A3B8",
                            mb: 3,
                            mt: 1
                        }}
                    >
                        Fill in the account details below.
                    </Typography>

                    <Stack spacing={3}>

                        <TextField
                            select
                            label="Customer"
                            name="customerId"
                            value={account.customerId}
                            onChange={handleChange}
                            fullWidth
                            disabled={loadingCustomers || customers.length === 0}
                            helperText={
                                customers.length === 0
                                    ? "No customers found. Add a customer first."
                                    : dataError
                            }
                        >
                            {loadingCustomers && (
                                <MenuItem value="" disabled>
                                    Loading customers...
                                </MenuItem>
                            )}

                            {!loadingCustomers && customers.length === 0 && (
                                <MenuItem value="" disabled>
                                    No customers available
                                </MenuItem>
                            )}

                            {!loadingCustomers && customers.map((customer) => (
                                <MenuItem
                                    key={customer.id}
                                    value={customer.id}
                                >
                                    <Box>
                                        <Typography>
                                            {customer.name || `Customer #${customer.id}`}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: "#94A3B8",
                                                fontSize: 12
                                            }}
                                        >
                                            {customer.email || customer.phone || "Customer"}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Account Number"
                            name="accountNumber"
                            value={account.accountNumber}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            select
                            label="Account Type"
                            name="accountType"
                            value={account.accountType}
                            onChange={handleChange}
                            fullWidth
                        >
                            <MenuItem value="Savings">
                                Savings
                            </MenuItem>

                            <MenuItem value="Current">
                                Current
                            </MenuItem>

                            <MenuItem value="Fixed">
                                Fixed Deposit
                            </MenuItem>
                        </TextField>

                        <TextField
                            label="Opening Balance"
                            type="number"
                            name="balance"
                            value={account.balance}
                            onChange={handleChange}
                            fullWidth
                        />

                    </Stack>

                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                        pt: 2
                    }}
                >
                    <Button
                        onClick={handleClose}
                        sx={{
                            color: "#94A3B8",
                            textTransform: "none",
                            fontWeight: 600
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            background:
                                "linear-gradient(135deg,#8B5CF6,#7C3AED)",
                            borderRadius: 3,
                            px: 4,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow:
                                "0 10px 25px rgba(139,92,246,.35)",
                            "&:hover": {
                                background:
                                    "linear-gradient(135deg,#7C3AED,#6D28D9)",
                                transform: "translateY(-2px)"
                            }
                        }}
                    >
                        {editAccount ? "Update Account" : "Create Account"}
                    </Button>

                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false
                    })
                }
            >
                <Alert
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </>
    );

}
