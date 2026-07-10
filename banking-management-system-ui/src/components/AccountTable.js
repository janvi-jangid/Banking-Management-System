import { useMemo, useState } from "react";
import api from "../services/api";
import { deleteLocalAccount } from "../services/localStore";

import {
    Card,
    CardContent,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    TextField,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Snackbar,
    Alert,
    Tooltip,
    Chip,
    Avatar,
    Box,
    TablePagination
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function AccountTable({
                                         accounts = [],
                                         handleEdit,
                                         refreshAccounts
                                     }) {

    const [search, setSearch] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(8);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const filteredAccounts = useMemo(() => {

        return accounts.filter(account =>

            account.accountNumber
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            account.customer?.name
                ?.toLowerCase()
                .includes(search.toLowerCase())

            ||

            account.accountType
                ?.toLowerCase()
                .includes(search.toLowerCase())

        );

    }, [accounts, search]);

    const totalBalance = filteredAccounts.reduce(
        (sum, acc) => sum + Number(acc.balance || 0),
        0
    );

    const deleteAccount = () => {

        api.delete(`/accounts/${deleteId}`)

            .then(() => {

                refreshAccounts();

                setDeleteId(null);

                setSnackbar({
                    open: true,
                    message: "Account Deleted Successfully",
                    severity: "success"
                });

            })

            .catch((err) => {

                if (!err.response) {
                    deleteLocalAccount(deleteId);
                    refreshAccounts();
                    setDeleteId(null);

                    setSnackbar({
                        open: true,
                        message: "Account deleted locally.",
                        severity: "success"
                    });

                    return;
                }

                setSnackbar({
                    open: true,
                    message: "Cannot delete account.",
                    severity: "error"
                });

            });

    };

    const paginatedAccounts =
        filteredAccounts.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    return (


        <>

            {/* Statistics */}

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3,1fr)",
                    gap: 3,
                    mb: 3
                }}
            >

                <Card
                    sx={{
                        background: "#171C2C",
                        border: "1px solid #2B3043",
                        borderRadius: 4
                    }}
                >
                    <CardContent>

                        <Typography color="#94A3B8">
                            Total Accounts
                        </Typography>

                        <Typography
                            sx={{
                                color: "white",
                                fontSize: 30,
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            {filteredAccounts.length}
                        </Typography>

                    </CardContent>

                </Card>

                <Card
                    sx={{
                        background: "#171C2C",
                        border: "1px solid #2B3043",
                        borderRadius: 4
                    }}
                >
                    <CardContent>

                        <Typography color="#94A3B8">
                            Total Balance
                        </Typography>

                        <Typography
                            sx={{
                                color: "#10B981",
                                fontSize: 30,
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            Rs {totalBalance.toLocaleString("en-IN")}
                        </Typography>

                    </CardContent>

                </Card>

                <Card
                    sx={{
                        background: "#171C2C",
                        border: "1px solid #2B3043",
                        borderRadius: 4
                    }}
                >
                    <CardContent>

                        <Typography color="#94A3B8">
                            Savings Accounts
                        </Typography>

                        <Typography
                            sx={{
                                color: "#8B5CF6",
                                fontSize: 30,
                                fontWeight: 700,
                                mt: 1
                            }}
                        >
                            {
                                filteredAccounts.filter(
                                    a =>
                                        a.accountType?.toLowerCase() ===
                                        "savings"
                                ).length
                            }

                        </Typography>

                    </CardContent>

                </Card>

            </Box>

            <Card
                sx={{
                    borderRadius: 4,
                    background: "#171C2C",
                    border: "1px solid #2B3043"
                }}
            >

                <CardContent>

                    <TextField
                        fullWidth
                        placeholder="Search Account..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        sx={{
                            mb: 3,
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

                    <TableContainer
                        component={Paper}
                        sx={{
                            background: "transparent",
                            boxShadow: "none"
                        }}
                    >

                        <Table>

                            <TableHead>

                                <TableRow
                                    sx={{
                                        background:
                                            "#20263A"
                                    }}
                                >

                                    <TableCell sx={{ color: "white" }}>
                                        Customer
                                    </TableCell>

                                    <TableCell sx={{ color: "white" }}>
                                        Account No.
                                    </TableCell>

                                    <TableCell sx={{ color: "white" }}>
                                        Type
                                    </TableCell>

                                    <TableCell sx={{ color: "white" }}>
                                        Balance
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        sx={{ color: "white" }}
                                    >
                                        Actions
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {paginatedAccounts.map(account => (

                                    <TableRow
                                        key={account.id}
                                        hover
                                        sx={{
                                            transition: ".25s",
                                            "&:hover": {
                                                background:
                                                    "#20263A"
                                            }
                                        }}
                                    >

                                        <TableCell>

                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2
                                                }}
                                            >

                                                <Avatar
                                                    sx={{
                                                        bgcolor:
                                                            "#8B5CF6"
                                                    }}
                                                >
                                                    <AccountBalanceWalletIcon />
                                                </Avatar>

                                                <Typography
                                                    color="white"
                                                >
                                                    {account.customer?.name ??
                                                        "N/A"}
                                                </Typography>

                                            </Box>

                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "#ddd"
                                            }}
                                        >
                                            {account.accountNumber}
                                        </TableCell>

                                        <TableCell>

                                            <Chip
                                                label={
                                                    account.accountType
                                                }
                                                color={
                                                    account.accountType?.toLowerCase() ===
                                                    "current"
                                                        ? "primary"
                                                        : "secondary"
                                                }
                                            />

                                        </TableCell>

                                        <TableCell
                                            sx={{
                                                color: "#10B981",
                                                fontWeight: 700
                                            }}
                                        >
                                            Rs {Number(
                                            account.balance
                                        ).toLocaleString("en-IN")}
                                        </TableCell>

                                        <TableCell align="center">

                                            <Tooltip title="Edit">

                                                <IconButton
                                                    onClick={() =>
                                                        handleEdit(account)
                                                    }
                                                >
                                                    <EditIcon
                                                        sx={{
                                                            color:
                                                                "#3B82F6"
                                                        }}
                                                    />
                                                </IconButton>

                                            </Tooltip>

                                            <Tooltip title="Delete">

                                                <IconButton
                                                    onClick={() =>
                                                        setDeleteId(
                                                            account.id
                                                        )
                                                    }
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            color:
                                                                "#EF4444"
                                                        }}
                                                    />
                                                </IconButton>

                                            </Tooltip>

                                        </TableCell>

                                    </TableRow>

                                ))}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={filteredAccounts.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={(e, p) =>
                            setPage(p)
                        }
                        onRowsPerPageChange={(e) => {
                            setRowsPerPage(
                                parseInt(e.target.value)
                            );
                            setPage(0);
                        }}
                        sx={{
                            color: "white"
                        }}
                    />

                </CardContent>

            </Card>

            <Dialog
                open={deleteId !== null}
                onClose={() => setDeleteId(null)}
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
                        color: "#EF4444",
                        fontWeight: 700
                    }}
                >
                    Delete Account
                </DialogTitle>

                <DialogContent>

                    <Typography sx={{ color: "#CBD5E1" }}>
                        Are you sure you want to delete this account?
                        This action cannot be undone.
                    </Typography>

                </DialogContent>

                <DialogActions sx={{ p: 3 }}>

                    <Button
                        onClick={() => setDeleteId(null)}
                        sx={{
                            color: "#94A3B8",
                            textTransform: "none"
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={deleteAccount}
                        sx={{
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: 700
                        }}
                    >
                        Delete
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
