import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

import { Card, CardContent, Typography } from "@mui/material";
import { useMemo } from "react";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function TransactionBarChart({ transactions = [] }) {

    const data = useMemo(() => {
        const totals = weekDays.map(day => ({
            name: day,
            deposits: 0,
            withdraw: 0,
            transactions: 0
        }));

        transactions.forEach(transaction => {
            if (!transaction.transactionDate) return;

            const dayIndex = new Date(transaction.transactionDate).getDay();
            const amount = Number(transaction.amount || 0);
            totals[dayIndex].transactions += 1;

            if (transaction.transactionType === "DEPOSIT" ||
                transaction.transactionType === "TRANSFER_IN") {
                totals[dayIndex].deposits += amount;
            }

            if (transaction.transactionType === "WITHDRAW" ||
                transaction.transactionType === "TRANSFER_OUT") {
                totals[dayIndex].withdraw += amount;
            }
        });

        return totals;
    }, [transactions]);

    return (
        <Card
            sx={{
                background: "#171C2C",
                borderRadius: 4,
                border: "1px solid #2B3147",
                height: "100%",
                width: "100%"
            }}
        >
            <CardContent>
                <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
                    Transactions Overview
                </Typography>

                <ResponsiveContainer width="100%" height={260}>
                    <BarChart
                        data={data}
                        barCategoryGap="20%"
                    >
                        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                        <XAxis dataKey="name" stroke="#aaa" />
                        <YAxis stroke="#aaa" />
                        <Tooltip />

                        <Bar
                            dataKey="deposits"
                            fill="#22c55e"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1200}
                            animationEasing="ease-in-out"
                        />

                        <Bar
                            dataKey="withdraw"
                            fill="#ef4444"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1200}
                            animationEasing="ease-in-out"
                        />

                        <Bar
                            dataKey="transactions"
                            fill="#60a5fa"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1200}
                            animationEasing="ease-in-out"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
