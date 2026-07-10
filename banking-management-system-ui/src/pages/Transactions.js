import { useMemo, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import useDashboardData from "../hooks/useDashboardData";
import api from "../services/api";
import { depositAmount, withdrawAmount } from "../services/transactionActions";
import { deleteLocalTransaction } from "../services/localStore";

import {
    Box,
    Toolbar,
    Typography,
    Card,
    CardContent,
    Grid,
    TextField,
    InputAdornment,
    Button,
    MenuItem,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    Stack
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export default function Transactions() {

    const {
        accounts,
        transactions,
        fetchData
    } = useDashboardData();

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");

    const [open, setOpen] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [transaction, setTransaction] = useState({
        accountId: "",
        transactionType: "DEPOSIT",
        amount: ""
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (e) => {

        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });

    };

    const handleSave = async () => {

        if (!transaction.accountId || !transaction.amount || Number(transaction.amount) <= 0) {
            setSnackbar({
                open: true,
                message: "Please select an account and enter a valid amount.",
                severity: "warning"
            });
            return;
        }

        setSaving(true);

        try {
            const action = transaction.transactionType === "DEPOSIT"
                ? depositAmount
                : withdrawAmount;
            const result = await action({
                accountId: transaction.accountId,
                amount: transaction.amount,
                accounts
            });

            fetchData();
            setOpen(false);
            setTransaction({
                accountId: "",
                transactionType: "DEPOSIT",
                amount: ""
            });
            setSnackbar({
                open: true,
                message: result.mode === "local"
                    ? "Transaction saved locally. Start the backend to save it in the database."
                    : "Transaction Successful",
                severity: "success"
            });
        } catch (err) {
            fetchData();
            setSnackbar({
                open: true,
                message: err.message || "Transaction Failed",
                severity: "error"
            });
        } finally {
            setSaving(false);
        }

    };

    const filteredTransactions = useMemo(() => {

        return transactions.filter(t => {

            const matchSearch =
                t.account?.accountNumber
                    ?.toLowerCase()
                    .includes(search.toLowerCase()) ||
                t.transactionType
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchFilter =
                filter === "ALL"
                    ? true
                    : t.transactionType === filter;

            return matchSearch && matchFilter;

        });

    }, [transactions, search, filter]);

    const completedTransactions = transactions.filter(t => (t.status || "COMPLETED") === "COMPLETED");

    const totalDeposit = completedTransactions
        .filter(t => t.transactionType === "DEPOSIT")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalWithdraw = completedTransactions
        .filter(t => t.transactionType === "WITHDRAW")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalTransactions = transactions.length;

    const deleteTransaction = () => {

        api.delete(`/transactions/${deleteId}`)
            .then(() => {

                fetchData();

                setDeleteId(null);

                setSnackbar({
                    open: true,
                    message: "Transaction Deleted",
                    severity: "success"
                });

            })
            .catch((err) => {

                if (!err.response) {
                    deleteLocalTransaction(deleteId);
                    fetchData();
                    setDeleteId(null);

                    setSnackbar({
                        open: true,
                        message: "Transaction deleted locally.",
                        severity: "success"
                    });

                    return;
                }

                setSnackbar({
                    open: true,
                    message: "Delete Failed",
                    severity: "error"
                });

            });

    };

    const headerStyle = {
        padding: "16px",
        textAlign: "left",
        color: "#CBD5E1",
        fontWeight: "bold",
        borderBottom: "1px solid #2B3043"
    };

    const cellStyle = {
        padding: "16px",
        color: "white"
    };

    const getTransactionColor = (type) => {
        if (type === "DEPOSIT" || type === "TRANSFER_IN") {
            return "#22C55E";
        }

        if (type === "WITHDRAW" || type === "TRANSFER_OUT") {
            return "#EF4444";
        }

        return "#8B5CF6";
    };

    const formatTransactionType = (type) =>
        type?.replace("_", " ") || "UNKNOWN";

    const getStatusColor = (status = "COMPLETED") => {
        if (status === "FAILED") {
            return { background: "rgba(239,68,68,.22)", color: "#FCA5A5" };
        }

        if (status === "PENDING") {
            return { background: "rgba(245,158,11,.22)", color: "#FBBF24" };
        }

        return { background: "rgba(34,197,94,.22)", color: "#34D399" };
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

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4
                    }}
                >

                    <Box>

                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: 700
                            }}
                        >
                            Transactions
                        </Typography>

                        <Typography
                            sx={{
                                color: "#94A3B8",
                                mt: 1
                            }}
                        >
                            Deposit, Withdraw and Account Activity
                        </Typography>

                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpen(true)}
                        sx={{
                            background: "#8B5CF6",
                            px: 3,
                            py: 1.2,
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: 700,
                            "&:hover": {
                                background: "#7C3AED"
                            }
                        }}
                    >
                        New Transaction
                    </Button>

                </Box>

                <Grid container spacing={3}>

                    {/* Statistics Cards */}

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                background: "#171C2C",
                                borderRadius: 4,
                                border: "1px solid #2B3043"
                            }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color: "#94A3B8",
                                                fontSize: 15
                                            }}
                                        >
                                            Total Deposits
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: "#22C55E",
                                                fontWeight: 700,
                                                mt: 1
                                            }}
                                        >
                                            Rs {totalDeposit.toLocaleString("en-IN")}
                                        </Typography>

                                    </Box>

                                    <TrendingUpIcon
                                        sx={{
                                            color: "#22C55E",
                                            fontSize: 45
                                        }}
                                    />

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                background: "#171C2C",
                                borderRadius: 4,
                                border: "1px solid #2B3043"
                            }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color: "#94A3B8"
                                            }}
                                        >
                                            Total Withdrawals
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: "#EF4444",
                                                fontWeight: 700,
                                                mt: 1
                                            }}
                                        >
                                            Rs {totalWithdraw.toLocaleString("en-IN")}
                                        </Typography>

                                    </Box>

                                    <TrendingDownIcon
                                        sx={{
                                            color: "#EF4444",
                                            fontSize: 45
                                        }}
                                    />

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12} md={4}>

                        <Card
                            sx={{
                                background: "#171C2C",
                                borderRadius: 4,
                                border: "1px solid #2B3043"
                            }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                                >

                                    <Box>

                                        <Typography
                                            sx={{
                                                color: "#94A3B8"
                                            }}
                                        >
                                            Transactions
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                color: "#8B5CF6",
                                                fontWeight: 700,
                                                mt: 1
                                            }}
                                        >
                                            {totalTransactions}
                                        </Typography>

                                    </Box>

                                    <SwapHorizIcon
                                        sx={{
                                            color: "#8B5CF6",
                                            fontSize: 45
                                        }}
                                    />

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                    <Grid item xs={12}>

                        <Card
                            sx={{
                                mt: 1,
                                background: "#171C2C",
                                borderRadius: 4,
                                border: "1px solid #2B3043"
                            }}
                        >

                            <CardContent>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        gap: 2,
                                        mb: 3,
                                        flexWrap: "wrap"
                                    }}
                                >

                                    <TextField
                                        placeholder="Search transaction..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        sx={{
                                            flex: "1 1 280px",
                                            input: {
                                                color: "white"
                                            }
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon
                                                        sx={{
                                                            color: "#8B5CF6"
                                                        }}
                                                    />
                                                </InputAdornment>
                                            )
                                        }}
                                    />

                                    <TextField
                                        select
                                        value={filter}
                                        onChange={(e) =>
                                            setFilter(e.target.value)
                                        }
                                        sx={{
                                            width: 200,
                                            flexShrink: 0
                                        }}
                                    >
                                        <MenuItem value="ALL">
                                            All
                                        </MenuItem>

                                        <MenuItem value="DEPOSIT">
                                            Deposit
                                        </MenuItem>

                                        <MenuItem value="WITHDRAW">
                                            Withdraw
                                        </MenuItem>

                                        <MenuItem value="TRANSFER_IN">
                                            Transfer In
                                        </MenuItem>

                                        <MenuItem value="TRANSFER_OUT">
                                            Transfer Out
                                        </MenuItem>

                                    </TextField>

                                </Box>
                                <Box
                                    sx={{
                                        overflowX: "auto",
                                        borderRadius: 3
                                    }}
                                >

                                    <table
                                        style={{
                                            width: "100%",
                                            borderCollapse: "collapse",
                                            color: "white"
                                        }}
                                    >

                                        <thead>

                                        <tr
                                            style={{
                                                background: "#20263A"
                                            }}
                                        >

                                            <th style={headerStyle}>Account</th>
                                            <th style={headerStyle}>Type</th>
                                            <th style={headerStyle}>Amount</th>
                                            <th style={headerStyle}>Date</th>
                                            <th style={headerStyle}>Status</th>
                                            <th style={headerStyle}>Action</th>

                                        </tr>

                                        </thead>

                                        <tbody>

                                        {filteredTransactions.map((transaction) => (

                                            <tr
                                                key={transaction.id}
                                                style={{
                                                    borderBottom: "1px solid #2B3043",
                                                    transition: ".3s"
                                                }}
                                            >

                                                <td style={cellStyle}>
                                                    {transaction.account?.accountNumber}
                                                </td>

                                                <td style={cellStyle}>

                                                    <Chip
                                                        label={formatTransactionType(transaction.transactionType)}
                                                        sx={{
                                                            background: getTransactionColor(transaction.transactionType),
                                                            color: "white",
                                                            fontWeight: "bold"
                                                        }}
                                                    />

                                                </td>

                                                <td
                                                    style={{
                                                        ...cellStyle,
                                                        color: getTransactionColor(transaction.transactionType),
                                                        fontWeight: "bold"
                                                    }}
                                                >
                                                    Rs {Number(transaction.amount || 0).toLocaleString("en-IN")}
                                                </td>

                                                <td style={cellStyle}>
                                                    {transaction.transactionDate
                                                        ? new Date(
                                                            transaction.transactionDate
                                                        ).toLocaleString()
                                                        : "-"}
                                                </td>

                                                <td style={cellStyle}>
                                                    <Chip
                                                        label={(transaction.status || "COMPLETED").toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                                                        sx={{
                                                            ...getStatusColor(transaction.status || "COMPLETED"),
                                                            fontWeight: "bold"
                                                        }}
                                                    />
                                                </td>

                                                <td style={cellStyle}>

                                                    <IconButton
                                                        onClick={() =>
                                                            setDeleteId(transaction.id)
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            sx={{
                                                                color: "#EF4444"
                                                            }}
                                                        />
                                                    </IconButton>

                                                </td>

                                            </tr>

                                        ))}

                                        </tbody>

                                    </table>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>
                    {/* New Transaction Dialog */}

                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        fullWidth
                        maxWidth="sm"
                    >

                        <DialogTitle>
                            New Transaction
                        </DialogTitle>

                        <DialogContent>

                            <Stack spacing={2} mt={2}>

                                <TextField
                                    select
                                    label="Account"
                                    name="accountId"
                                    value={transaction.accountId}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {accounts.map((account) => (
                                        <MenuItem
                                            key={account.id}
                                            value={account.id}
                                        >
                                            {account.accountNumber}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    select
                                    label="Transaction Type"
                                    name="transactionType"
                                    value={transaction.transactionType}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="DEPOSIT">
                                        Deposit
                                    </MenuItem>

                                    <MenuItem value="WITHDRAW">
                                        Withdraw
                                    </MenuItem>

                                </TextField>

                                <TextField
                                    label="Amount"
                                    name="amount"
                                    type="number"
                                    value={transaction.amount}
                                    onChange={handleChange}
                                    fullWidth
                                />

                            </Stack>

                        </DialogContent>

                        <DialogActions>

                            <Button
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="contained"
                                onClick={handleSave}
                                disabled={saving}
                                sx={{
                                    background: "#8B5CF6",
                                    "&:hover": {
                                        background: "#7C3AED"
                                    }
                                }}
                            >
                                {saving ? "Saving..." : "Save"}
                            </Button>

                        </DialogActions>

                    </Dialog>

                    {/* Delete Dialog */}

                    <Dialog
                        open={deleteId !== null}
                        onClose={() => setDeleteId(null)}
                    >

                        <DialogTitle>
                            Delete Transaction
                        </DialogTitle>

                        <DialogContent>

                            <Typography>

                                Are you sure you want to delete this transaction?

                            </Typography>

                        </DialogContent>

                        <DialogActions>

                            <Button
                                onClick={() => setDeleteId(null)}
                            >
                                Cancel
                            </Button>

                            <Button
                                color="error"
                                variant="contained"
                                onClick={deleteTransaction}
                            >
                                Delete
                            </Button>

                        </DialogActions>

                    </Dialog>

                    {/* Snackbar */}

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
                            action={
                                <IconButton
                                    size="small"
                                    onClick={() =>
                                        setSnackbar({
                                            ...snackbar,
                                            open: false
                                        })
                                    }
                                >
                                    <CloseIcon
                                        fontSize="small"
                                        sx={{ color: "white" }}
                                    />
                                </IconButton>
                            }
                        >
                            {snackbar.message}
                        </Alert>

                    </Snackbar>

                </Grid>

            </Box>

        </Box>
    );
}
