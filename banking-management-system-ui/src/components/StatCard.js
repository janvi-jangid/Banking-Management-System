import { Card, CardContent, Typography, Box } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import ShowChartIcon from "@mui/icons-material/ShowChart";

export default function StatCard({
                                     title,
                                     value,
                                     icon,
                                     color,
                                     growth
                                 }) {

    const isPositive = growth?.toString().includes("+");

    return (
        <Card
            sx={{
                background: "linear-gradient(145deg,rgba(17,26,46,.96),rgba(11,18,34,.96))",
                color: "white",
                borderRadius: 2,
                height: 170,
                border: "1px solid rgba(148,163,184,.2)",
                boxShadow: "0 18px 48px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.04)",
                overflow: "hidden",
                position: "relative"
            }}
        >
            <CardContent
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                }}
            >

                {/* TOP SECTION */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <Box
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 3,
                            background: color,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 16px 35px rgba(0,0,0,.26)"
                        }}
                    >
                        {icon}
                    </Box>

                    <Box>
                        <Typography sx={{ color: "#B5B7C8", fontSize: 15 }}>
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{
                                mt: 1,
                                fontWeight: 900,
                                color: "#FFFFFF",
                                textShadow: "0 2px 18px rgba(255,255,255,.1)"
                            }}
                        >
                            {value}
                        </Typography>
                    </Box>
                </Box>

                {/* BOTTOM SECTION */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                    {isPositive ? (
                        <TrendingUpIcon sx={{ color: "#22C55E", fontSize: 18 }} />
                    ) : (
                        <TrendingDownIcon sx={{ color: "#EF4444", fontSize: 18 }} />
                    )}

                    <Typography
                        sx={{
                            color: isPositive ? "#22C55E" : "#EF4444",
                            fontWeight: "bold"
                        }}
                    >
                        {growth}
                    </Typography>

                    <Typography sx={{ color: "#A0A6C2" }}>
                        from last month
                    </Typography>

                    <Box sx={{ ml: "auto", display: "flex", alignItems: "end", gap: 0.5 }}>
                        {[12, 18, 14, 24, 20, 31].map((height, index) => (
                            <Box
                                key={height + index}
                                sx={{
                                    width: 8,
                                    height,
                                    borderRadius: 4,
                                    background: index % 2 === 0
                                        ? "rgba(139,92,246,.92)"
                                        : "rgba(59,130,246,.92)"
                                }}
                            />
                        ))}
                        <ShowChartIcon
                            sx={{
                                color: isPositive ? "#22C55E" : "#FB7185",
                                fontSize: 18,
                                ml: 0.5
                            }}
                        />
                    </Box>

                </Box>

            </CardContent>
        </Card>
    );
}
