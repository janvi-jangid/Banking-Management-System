import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
    labels: ["Savings", "Current", "Fixed Deposit"],
    datasets: [
        {
            data: [65, 25, 10],
            backgroundColor: ["#8B5CF6", "#3B82F6", "#22C55E"],
            borderWidth: 0,
            hoverOffset: 8
        }
    ]
};

const options = {
    cutout: "70%",
    plugins: {
        legend: {
            position: "bottom",
            labels: {
                color: "#E5E7EB",
                padding: 15,
                font: {
                    size: 13
                }
            }
        },
        tooltip: {
            enabled: true
        }
    },
    maintainAspectRatio: false
};

export default function BalanceChart() {
    return (
        <Box
            sx={{
                background: "#171C2C",
                border: "1px solid #2B3043",
                borderRadius: 4,
                p: 3,
                height: 320,
                color: "white"
            }}
        >
            <Typography
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: "#A855F7"
                }}
            >
                Account Distribution
            </Typography>

            <Box sx={{ height: "240px" }}>
                <Doughnut data={data} options={options} />
            </Box>
        </Box>
    );
}