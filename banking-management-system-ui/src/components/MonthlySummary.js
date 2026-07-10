import { Card, CardContent, Typography, Box } from "@mui/material";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

export default function MonthlySummary({ transactions = [] }) {

    const now = new Date();

    const currentMonthTransactions = transactions.filter(transaction => {
        if (!transaction.transactionDate) return false;

        const date = new Date(transaction.transactionDate);
        return date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear();
    });

    const deposits = currentMonthTransactions
        .filter(transaction =>
            transaction.transactionType === "DEPOSIT" ||
            transaction.transactionType === "TRANSFER_IN"
        )
        .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

    const withdrawals = currentMonthTransactions
        .filter(transaction =>
            transaction.transactionType === "WITHDRAW" ||
            transaction.transactionType === "TRANSFER_OUT"
        )
        .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0);

    const netGrowth = deposits - withdrawals;

    const chartData = [
        { month: "Jan", income: 38, expenses: 22 },
        { month: "Feb", income: 50, expenses: 31 },
        { month: "Mar", income: 58, expenses: 28 },
        { month: "Apr", income: 70, expenses: 40 },
        { month: "May", income: 78, expenses: 50 },
        { month: "Jun", income: 89, expenses: 59 },
        { month: "Jul", income: Math.max(12, deposits / 1000), expenses: Math.max(8, withdrawals / 1000) }
    ];

    return (
        <Card
            sx={{
                background: "linear-gradient(145deg,rgba(17,26,46,.96),rgba(11,18,34,.96))",
                borderRadius: 2,
                border: "1px solid rgba(148,163,184,.2)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                animation: "fadeIn 0.6s ease-in-out",
                boxShadow: "0 18px 48px rgba(0,0,0,.24)"
            }}
        >
            <CardContent>
                <Typography
                    variant="h6"
                    sx={{ color: "#FFFFFF", mb: 3, fontWeight: 900 }}
                >
                    Monthly Summary
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 3,
                        mb: 2,
                        flexWrap: "wrap"
                    }}
                >
                    <Typography sx={{ color: "#C4B5FD" }}>
                        Income: Rs {deposits.toLocaleString("en-IN")}
                    </Typography>
                    <Typography sx={{ color: "#FB7185" }}>
                        Expenses: Rs {withdrawals.toLocaleString("en-IN")}
                    </Typography>
                    <Typography sx={{ color: netGrowth >= 0 ? "#34D399" : "#FB7185" }}>
                        Net: {netGrowth >= 0 ? "+" : "-"}Rs {Math.abs(netGrowth).toLocaleString("en-IN")}
                    </Typography>
                </Box>

                <ResponsiveContainer width="100%" height={230}>
                    <BarChart data={chartData}>
                        <CartesianGrid stroke="rgba(148,163,184,.18)" vertical={false} />
                        <XAxis dataKey="month" stroke="#B8C2D8" />
                        <YAxis stroke="#B8C2D8" />
                        <Tooltip
                            cursor={{ fill: "rgba(139,92,246,.08)" }}
                            contentStyle={{
                                background: "#0B1222",
                                border: "1px solid rgba(148,163,184,.24)",
                                color: "#fff"
                            }}
                        />
                        <Bar dataKey="income" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="expenses" fill="#FB5F8F" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
