import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Box,
    Button
} from "@mui/material";
import { Link } from "react-router-dom";

function formatType(type = "") {
    return type
        .replace("TRANSFER_IN", "Transfer")
        .replace("TRANSFER_OUT", "Transfer")
        .replace("WITHDRAW", "Withdraw")
        .replace("DEPOSIT", "Deposit");
}

function typeStyles(type = "") {
    if (type === "WITHDRAW" || type === "TRANSFER_OUT") {
        return { background: "rgba(244,63,94,.24)", color: "#FB7185" };
    }

    if (type.includes("TRANSFER")) {
        return { background: "rgba(59,130,246,.24)", color: "#60A5FA" };
    }

    return { background: "rgba(34,197,94,.22)", color: "#34D399" };
}

function statusStyles(status = "COMPLETED") {
    const normalized = status.toUpperCase();

    if (normalized === "FAILED") {
        return { background: "rgba(239,68,68,.24)", color: "#FCA5A5" };
    }

    if (normalized === "PENDING") {
        return { background: "rgba(245,158,11,.22)", color: "#FBBF24" };
    }

    return { background: "rgba(34,197,94,.22)", color: "#34D399" };
}

function formatDate(value) {
    if (!value) return "--";

    return new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

export default function RecentTransactions({ transactions }) {
    const recentTransactions = transactions.slice(0, 5);

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

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: "white",
                            fontWeight: 900
                        }}
                    >
                        Recent Transactions
                    </Typography>

                    <Button
                        component={Link}
                        to="/transactions"
                        variant="contained"
                        sx={{
                            background: "linear-gradient(135deg,#7C3AED,#4C1D95)",
                            borderRadius: 1.5,
                            textTransform: "none",
                            px: 2.5,
                            "&:hover": {
                                background: "linear-gradient(135deg,#8B5CF6,#5B21B6)"
                            }
                        }}
                    >
                        View All
                    </Button>
                </Box>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                ID
                            </TableCell>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                Type
                            </TableCell>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                Account
                            </TableCell>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                Amount
                            </TableCell>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                Date
                            </TableCell>

                            <TableCell sx={{ color: "#C8D2E8", borderBottom: "1px solid rgba(148,163,184,.18)", fontWeight: 700 }}>
                                Status
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {recentTransactions.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={6}
                                    align="center"
                                    sx={{
                                        color: "#9CA3AF",
                                        borderBottom: 0,
                                        py: 5
                                    }}
                                >
                                    No Transactions Found
                                </TableCell>

                            </TableRow>

                        ) : (

                            recentTransactions.map((transaction) => {
                                const status = transaction.status || "COMPLETED";
                                const amountPrefix = transaction.transactionType === "DEPOSIT" || transaction.transactionType === "TRANSFER_IN" ? "+" : "-";
                                const amountColor = amountPrefix === "+" ? "#22C55E" : "#FB7185";

                                return (

                                <TableRow
                                    key={transaction.id}
                                    hover
                                    sx={{
                                        background: "rgba(15,23,42,.18)",
                                        "& td": {
                                            borderBottom: "1px solid rgba(148,163,184,.12)"
                                        },
                                        "&:hover": {
                                            background: "rgba(139,92,246,.08)"
                                        }
                                    }}
                                >

                                    <TableCell sx={{ color: "white" }}>
                                        #TRX{String(transaction.id).replace("local-", "").slice(0, 5).toUpperCase()}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={formatType(transaction.transactionType)}
                                            sx={{
                                                ...typeStyles(transaction.transactionType),
                                                fontWeight: "bold"
                                            }}
                                        />

                                    </TableCell>

                                    <TableCell sx={{ color: "white" }}>
                                        {transaction.account?.accountNumber || "---- **** ----"}
                                    </TableCell>

                                    <TableCell>

                                        <Typography
                                            sx={{
                                                color: amountColor,
                                                fontWeight: "bold"
                                            }}
                                        >
                                            {amountPrefix} Rs {Number(transaction.amount || 0).toLocaleString("en-IN")}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>

                                        <Typography color="#D1D5DB">

                                            {formatDate(transaction.transactionDate)}

                                        </Typography>

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                            sx={{
                                                ...statusStyles(status),
                                                fontWeight: 700
                                            }}
                                        />

                                    </TableCell>

                                </TableRow>

                                );
                            })

                        )}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}
