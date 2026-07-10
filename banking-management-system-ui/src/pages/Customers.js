import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CustomerTable from "../components/CustomerTable";
import AddCustomerDialog from "../components/AddCustomerDialog";

import useDashboardData from "../hooks/useDashboardData";

import {
    Box,
    Toolbar,
    Typography,
    Button
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

export default function Customers() {

    const { customers, fetchData } = useDashboardData();

    const [open, setOpen] = useState(false);

    const [editCustomer, setEditCustomer] = useState(null);

    const handleOpen = () => {
        setEditCustomer(null);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditCustomer(null);
    };

    const handleEdit = (customer) => {
        setEditCustomer(customer);
        setOpen(true);
    };

    const refreshCustomers = () => {
        fetchData();
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
                                fontWeight: "bold"
                            }}
                        >
                            Customers
                        </Typography>

                        <Typography
                            sx={{
                                color: "#9CA3AF",
                                mt: 1
                            }}
                        >
                            Manage all registered customers.
                        </Typography>

                    </Box>

                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        sx={{
                            background: "#8B5CF6",
                            px: 3,
                            py: 1.2,
                            borderRadius: 2,
                            textTransform: "none",
                            fontWeight: "bold",
                            "&:hover": {
                                background: "#7C3AED"
                            }
                        }}
                    >
                        Add Customer
                    </Button>

                </Box>

                <CustomerTable
                    customers={customers}
                    handleEdit={handleEdit}
                    refreshCustomers={refreshCustomers}
                />

                <AddCustomerDialog
                    open={open}
                    handleClose={handleClose}
                    refreshCustomers={refreshCustomers}
                    editCustomer={editCustomer}
                />

            </Box>

        </Box>

    );

}