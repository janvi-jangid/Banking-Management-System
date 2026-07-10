import { useEffect, useState } from "react";
import api, { getApiErrorMessage } from "../services/api";
import { saveLocalCustomer } from "../services/localStore";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Snackbar,
    Alert
} from "@mui/material";

const emptyCustomer = {
    name: "",
    phone: "",
    email: "",
    address: "",
    aadhar: ""
};

export default function AddCustomerDialog({
                                              open,
                                              handleClose,
                                              refreshCustomers,
                                              editCustomer = null
                                          }) {

    const [customer, setCustomer] = useState(emptyCustomer);

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    useEffect(() => {

        if (editCustomer) {
            setCustomer(editCustomer);
        } else {
            setCustomer(emptyCustomer);
        }

    }, [editCustomer, open]);

    const handleChange = (e) => {

        setCustomer({
            ...customer,
            [e.target.name]: e.target.value
        });

    };

    const validate = () => {

        if (
            !customer.name ||
            !customer.phone ||
            !customer.email ||
            !customer.address ||
            !customer.aadhar
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

        if (!validate()) return;

        const request = editCustomer
            ? api.put(`/customers/${customer.id}`, customer)
            : api.post("/customers", customer);

        request
            .then(() => {

                refreshCustomers();

                handleClose();

                setSnackbar({
                    open: true,
                    message: editCustomer
                        ? "Customer Updated Successfully"
                        : "Customer Added Successfully",
                    severity: "success"
                });

                setCustomer(emptyCustomer);

            })
            .catch((err) => {

                if (!err.response) {
                    saveLocalCustomer(customer);
                    refreshCustomers();
                    handleClose();
                    setCustomer(emptyCustomer);

                    setSnackbar({
                        open: true,
                        message: "Customer saved locally. Start the backend to save it in the database.",
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
                        fontWeight: 700
                    }}
                >
                    {editCustomer ? "Edit Customer" : "Add Customer"}
                </DialogTitle>

                <DialogContent>

                    <Stack spacing={2} mt={2}>

                        <TextField
                            label="Full Name"
                            name="name"
                            value={customer.name}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Phone Number"
                            name="phone"
                            value={customer.phone}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Email Address"
                            name="email"
                            value={customer.email}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Address"
                            name="address"
                            value={customer.address}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Aadhar Number"
                            name="aadhar"
                            value={customer.aadhar}
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
                            borderRadius: 2,
                            px: 3,
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
                            background: "linear-gradient(135deg,#8B5CF6,#7C3AED)",
                            borderRadius: 3,
                            px: 4,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: 700,
                            boxShadow: "0 10px 25px rgba(139,92,246,.35)",
                            transition: ".3s",
                            "&:hover": {
                                background: "linear-gradient(135deg,#7C3AED,#6D28D9)",
                                transform: "translateY(-2px)",
                                boxShadow: "0 15px 30px rgba(139,92,246,.45)"
                            }
                        }}
                    >
                        {editCustomer ? "Update Customer" : "Save Customer"}
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
