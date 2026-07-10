import { useMemo, useState } from "react";
import api from "../services/api";
import { deleteLocalCustomer } from "../services/localStore";

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
    Tooltip
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function CustomerTable({
                                                                                                        customers = [],
                                                                                                        handleEdit,
                                                                                                        refreshCustomers
                                                                                                    }) {


    const [search, setSearch] = useState("");

    const [deleteId, setDeleteId] = useState(null);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const filteredCustomers = useMemo(() => {

        return customers
            .filter(customer =>

                customer.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                customer.email
                    ?.toLowerCase()
                    .includes(search.toLowerCase())

                ||

                customer.phone
                    ?.includes(search)

            )
            .sort((a, b) =>

                a.name.localeCompare(b.name)

            );

    }, [customers, search]);

    const deleteCustomer = () => {

        api.delete(`/customers/${deleteId}`)
            .then(() => {

                refreshCustomers();

                setDeleteId(null);

                setSnackbar({
                    open: true,
                    message: "Customer Deleted Successfully",
                    severity: "success"
                });

            })
            .catch(err => {

                if (!err.response) {
                    deleteLocalCustomer(deleteId);
                    refreshCustomers();
                    setDeleteId(null);

                    setSnackbar({
                        open: true,
                        message: "Customer deleted locally.",
                        severity: "success"
                    });

                    return;
                }

                setSnackbar({
                    open: true,
                    message:
                        err.response?.data ||
                        "Cannot delete customer.",
                    severity: "error"
                });

            });

    };

    return (

        <>

            <Card
                sx={{
                    mt: 2,
                    borderRadius: 4,
                    background: "#171C2C",
                    border: "1px solid #2B3043"
                }}
            >

                <CardContent>

                    <TextField
                        fullWidth
                        placeholder="Search customer..."
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
                                        sx={{ color: "#A855F7" }}
                                    />
                                </InputAdornment>
                            )
                        }}
                    />

                    <TableContainer component={Paper}
                                    sx={{
                                        background: "transparent",
                                        boxShadow: "none"
                                    }}
                    >

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell sx={{ color: "white", fontWeight: 700 }}>ID</TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: 700 }}>Name</TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: 700 }}>Email</TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: 700 }}>Phone</TableCell>

                                    <TableCell sx={{ color: "white", fontWeight: 700 }}>Address</TableCell>

                                    <TableCell align="center"
                                               sx={{ color: "white", fontWeight: 700 }}>
                                        Actions
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {filteredCustomers.map(customer => (

                                    <TableRow
                                        key={customer.id}
                                        hover
                                        sx={{
                                            "&:hover": {
                                                background: "#20263A"
                                            }
                                        }}
                                    >

                                        <TableCell sx={{ color: "#ddd" }}>
                                            {customer.id}
                                        </TableCell>

                                        <TableCell sx={{ color: "#ddd" }}>
                                            {customer.name}
                                        </TableCell>

                                        <TableCell sx={{ color: "#ddd" }}>
                                            {customer.email}
                                        </TableCell>

                                        <TableCell sx={{ color: "#ddd" }}>
                                            {customer.phone}
                                        </TableCell>

                                        <TableCell sx={{ color: "#ddd" }}>
                                            {customer.address}
                                        </TableCell>

                                        <TableCell align="center">

                                            <Tooltip title="Edit">

                                                <IconButton
                                                    onClick={() =>
                                                        handleEdit(customer)
                                                    }
                                                >
                                                    <EditIcon
                                                        sx={{
                                                            color: "#3B82F6"
                                                        }}
                                                    />
                                                </IconButton>

                                            </Tooltip>

                                            <Tooltip title="Delete">

                                                <IconButton
                                                    onClick={() =>
                                                        setDeleteId(customer.id)
                                                    }
                                                >
                                                    <DeleteIcon
                                                        sx={{
                                                            color: "#EF4444"
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

                </CardContent>

            </Card>

            <Dialog
                open={deleteId !== null}
                onClose={() => setDeleteId(null)}
            >

                <DialogTitle>
                    Delete Customer
                </DialogTitle>

                <DialogContent>

                    <Typography>

                        Are you sure you want to delete this customer?

                    </Typography>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setDeleteId(null)
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        color="error"
                        variant="contained"
                        onClick={deleteCustomer}
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
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

        </>

    );

}
