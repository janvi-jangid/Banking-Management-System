import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import { Card,CardContent,Typography } from "@mui/material";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const data={

    labels:["Savings","Current","Fixed"],

    datasets:[{

        data:[65,25,10],

        backgroundColor:[

            "#A855F7",

            "#3B82F6",

            "#10B981"

        ]

    }]

};

export default function AccountChart(){

    return(

        <Card sx={{

            background:"#1B1D2A",

            color:"white",

            borderRadius:4

        }}>

            <CardContent>

                <Typography variant="h6" mb={2}>

                    Account Types

                </Typography>

                <Doughnut data={data}/>

            </CardContent>

        </Card>

    );

}