import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import useDashboardData from "../hooks/useDashboardData";

import {
    Alert,
    Box,
    Card,
    CardContent,
    Chip,
    Stack,
    Toolbar,
    Typography
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const formatCurrency = (value) =>
    `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

const formatDate = (value) => {
    if (!value) return "Just now";

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Just now";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date);
};

function getLowBalanceLimit() {
    try {
        const settings = JSON.parse(localStorage.getItem("justbankSettings"));
        return Number(settings?.lowBalanceLimit || 1000);
    } catch {
        return 1000;
    }
}

export default function Notifications() {
    const { accounts, transactions } = useDashboardData();

    const lowBalanceLimit = getLowBalanceLimit();
    const lowBalanceAccounts = accounts.filter(account => Number(account.balance || 0) < lowBalanceLimit);
    const failedTransactions = transactions.filter(transaction => transaction.status === "FAILED");
    const recentTransactions = transactions.slice(0, 5);

    const alerts = [
        ...lowBalanceAccounts.map(account => ({
            id: `account-${account.id}`,
            icon: <AccountBalanceWalletIcon />,
            title: "Low balance account",
            detail: `${account.accountNumber} has ${formatCurrency(account.balance)} available.`,
            severity: "warning"
        })),
        ...failedTransactions.map(transaction => ({
            id: `transaction-${transaction.id}`,
            icon: <ReceiptLongIcon />,
            title: "Failed transaction",
            detail: `${transaction.transactionType} of ${formatCurrency(transaction.amount)} failed.`,
            severity: "error"
        }))
    ];

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
                    <Typography variant="h4" sx={{ color: "white", fontWeight: 800 }}>
                        Notifications
                    </Typography>
                    <Typography sx={{ color: "#94A3B8", mt: 1 }}>
                        Review important account and transaction updates.
                    </Typography>
                </Box>

                <Stack spacing={3}>
                    <Card sx={{ background: "#171C2C", border: "1px solid #2B3043", borderRadius: 2 }}>
                        <CardContent>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
                                <Stack direction="row" alignItems="center" spacing={1.5}>
                                    <NotificationsActiveIcon sx={{ color: "#A855F7" }} />
                                    <Typography sx={{ color: "white", fontWeight: 800 }}>
                                        Priority Alerts
                                    </Typography>
                                </Stack>
                                <Chip label={`${alerts.length} open`} sx={{ color: "white", bgcolor: "#263149" }} />
                            </Stack>

                            <Stack spacing={1.5}>
                                {alerts.length === 0 && (
                                    <Alert severity="success" variant="outlined">
                                        No urgent alerts. All monitored accounts look healthy.
                                    </Alert>
                                )}

                                {alerts.map(alert => (
                                    <Alert
                                        key={alert.id}
                                        severity={alert.severity}
                                        icon={alert.icon}
                                        variant="outlined"
                                    >
                                        <strong>{alert.title}</strong> {alert.detail}
                                    </Alert>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card sx={{ background: "#171C2C", border: "1px solid #2B3043", borderRadius: 2 }}>
                        <CardContent>
                            <Typography sx={{ color: "white", fontWeight: 800, mb: 2 }}>
                                Recent Activity
                            </Typography>

                            <Stack spacing={1.5}>
                                {recentTransactions.length === 0 && (
                                    <Typography sx={{ color: "#94A3B8" }}>
                                        No recent transactions yet.
                                    </Typography>
                                )}

                                {recentTransactions.map(transaction => (
                                    <Box
                                        key={transaction.id}
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            gap: 2,
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: "#111827",
                                            border: "1px solid #2B3043"
                                        }}
                                    >
                                        <Box>
                                            <Typography sx={{ color: "white", fontWeight: 700 }}>
                                                {transaction.transactionType?.replace("_", " ") || "Transaction"}
                                            </Typography>
                                            <Typography sx={{ color: "#94A3B8", fontSize: 14 }}>
                                                {transaction.account?.accountNumber || "Local account"} • {formatDate(transaction.transactionDate)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: "#22C55E", fontWeight: 800 }}>
                                            {formatCurrency(transaction.amount)}
                                        </Typography>
                                    </Box>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Stack>
            </Box>
        </Box>
    );
}
