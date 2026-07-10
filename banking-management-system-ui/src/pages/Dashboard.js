import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import DashboardCards from "../components/DashboardCards";
import AccountOverview from "../components/AccountOverview";
import MonthlySummary from "../components/MonthlySummary";
import QuickAction from "../components/QuickAction";
import RecentTransactions from "../components/RecentTransactions";

import {
    Box,
    Toolbar
} from "@mui/material";

import useDashboardData from "../hooks/useDashboardData";

export default function Dashboard() {

    const { customers, accounts, transactions } = useDashboardData();

    const totalBalance = accounts.reduce(
        (sum, acc) => sum + (acc.balance || 0),
        0
    );

    return (
        <Box
            sx={{
                display: "flex",
                background: "radial-gradient(circle at top left, rgba(139,92,246,.16), transparent 30%), #050B18",
                color: "white",
                minHeight: "100vh"
            }}
        >

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    px: { xs: 2, md: 4 },
                    py: 3,
                    background: "linear-gradient(135deg,#071023 0%,#050B18 45%,#07101F 100%)"
                }}
            >

                <Toolbar />

                <Navbar />

                {/* STAT CARDS */}

                <DashboardCards
                    customers={customers}
                    accounts={accounts}
                    totalBalance={totalBalance}
                    transactions={transactions}
                />

                {/* TOP ROW */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            xl: "1.2fr 1.8fr"
                        },
                        gap: 3,
                        mt: 3,
                        alignItems: "stretch"
                    }}
                >

                    <AccountOverview accounts={accounts} />

                    <RecentTransactions
                        transactions={transactions}
                    />

                </Box>

                {/* SECOND ROW */}

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            lg: "1fr 1fr"
                        },
                        gap: 3,
                        mt: 3
                    }}
                >

                    <QuickAction />

                    <MonthlySummary transactions={transactions} />

                </Box>

            </Box>

        </Box>
    );
}
