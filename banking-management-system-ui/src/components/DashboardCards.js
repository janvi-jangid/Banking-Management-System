import Grid from "@mui/material/Grid";
import PeopleIcon from "@mui/icons-material/People";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

import StatCard from "./StatCard";

export default function DashboardCards({
                                           customers = [],
                                           accounts = [],
                                           totalBalance = 0,
                                           transactions = []
                                       }) {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Customers"
                    value={customers.length}
                    icon={<PeopleIcon sx={{ fontSize: 35 }} />}
                    color="linear-gradient(135deg,#A855F7,#6D28D9)"
                    growth="+12.5%"
                />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Accounts"
                    value={accounts.length}
                    icon={<AccountBalanceWalletIcon sx={{ fontSize: 35 }} />}
                    color="linear-gradient(135deg,#38BDF8,#2563EB)"
                    growth="+8.3%"
                />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Balance"
                    value={`Rs ${Number(totalBalance).toLocaleString("en-IN")}`}
                    icon={<CurrencyRupeeIcon sx={{ fontSize: 35 }} />}
                    color="linear-gradient(135deg,#22C55E,#059669)"
                    growth="+15.7%"
                />
            </Grid>

            <Grid item xs={12} sm={6} lg={3}>
                <StatCard
                    title="Total Transactions"
                    value={transactions.length}
                    icon={<SwapHorizIcon sx={{ fontSize: 35 }} />}
                    color="linear-gradient(135deg,#F59E0B,#F97316)"
                    growth="+10.1%"
                />
            </Grid>

        </Grid>
    );
}
