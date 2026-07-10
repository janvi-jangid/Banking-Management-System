import {
    Card,
    CardContent,
    Typography,
    Box,
    MenuItem,
    Select
} from "@mui/material";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function AccountOverview({ accounts = [] }) {

    const savings = accounts.filter(
        a => a.accountType?.toUpperCase() === "SAVINGS"
    ).length;

    const current = accounts.filter(
        a => a.accountType?.toUpperCase() === "CURRENT"
    ).length;

    const fixed = accounts.filter(
        a =>
            a.accountType?.toUpperCase() === "FIXED" ||
            a.accountType?.toUpperCase() === "FD"
    ).length;

    const total = savings + current + fixed;

    const data = {
        labels: ["Savings", "Current", "Fixed"],
        datasets: [
            {
                data:
                    total === 0
                        ? [1, 1, 1]
                        : [savings, current, fixed],

                backgroundColor: [
                    "#8B5CF6",
                    "#3B82F6",
                    "#22C55E"
                ],

                borderColor: "#171C2C",
                borderWidth: 5,
                hoverOffset: 10
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "68%",

        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },

        animation: {
            duration: 1200
        }
    };

    const percentage = count =>
        total === 0 ? 0 : Math.round((count / total) * 100);

    const Item = ({ color, title, count }) => (

        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}
        >

            <Box>

                <Typography
                    sx={{
                        color: "white",
                        fontWeight: 600,
                        fontSize: 15
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: color,
                            marginRight: 10
                        }}
                    />
                    {title}
                </Typography>

                <Typography
                    sx={{
                        color: "#94A3B8",
                        mt: 1,
                        fontSize: 14
                    }}
                >
                    {count} accounts
                </Typography>

            </Box>

            <Typography
                sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: 15
                }}
            >
                {percentage(count)}%
            </Typography>

        </Box>
    );

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

            <CardContent sx={{ p: 4 }}>

                {/* Header */}

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 5
                    }}
                >

                    <Typography
                        variant="h5"
                        sx={{
                            color: "white",
                            fontWeight: 900
                        }}
                    >
                        Account Overview
                    </Typography>

                    <Select
                        size="small"
                        value="month"
                        sx={{
                            color: "white",
                            width: 150,
                            height: 44,
                            background: "rgba(7,15,32,.64)",
                            borderRadius: 2,
                            ".MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgba(148,163,184,.32)"
                            },
                            "& svg": {
                                color: "white"
                            }
                        }}
                    >
                        <MenuItem value="month">
                            This Month
                        </MenuItem>
                    </Select>

                </Box>

                {/* Body */}

                <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 6,
                            flexWrap: "wrap"
                        }}
                    >

                    {/* Chart */}

                    <Box
                        sx={{
                            width: "48%",
                            minWidth: 280,
                            height: 260,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Doughnut
                            data={data}
                            options={options}
                        />
                    </Box>

                    {/* Right Side */}

                    <Box
                        sx={{
                            width: "42%",
                            minWidth: 260
                        }}
                    >

                        <Item
                            color="#8B5CF6"
                            title="Savings Accounts"
                            count={savings}
                        />

                        <Item
                            color="#3B82F6"
                            title="Current Accounts"
                            count={current}
                        />

                        <Item
                            color="#22C55E"
                            title="Fixed Deposits"
                            count={fixed}
                        />

                    </Box>

                </Box>

            </CardContent>

        </Card>

    );
}
