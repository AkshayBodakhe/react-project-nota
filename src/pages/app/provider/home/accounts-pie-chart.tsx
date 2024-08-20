import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CustomOptions {
    spacing: number;
    radius: string;
    cutout: string;
    responsive?: true,
}

const labels = [
    { title: "Pending from 120 days", color: 'rgba(20,184,166)' },
    { title: "Pending from 90 days", color: 'rgba(245,158,10)' },
    { title: "Pending from 60 days", color: 'rgba(99,102,241)' },
    { title: "Pending from 30 days", color: 'rgba(59,132,246)' }
];

const data = {
    // labels: [
    //     'Green',
    //     'Orange',
    //     'Purple',
    //     'Blue'
    // ],
    datasets: [
        {
            data: [6, 5, 4, 3],
            backgroundColor: [
                "rgba(20,184,166)",
                "rgba(245,158,10)",
                "rgba(99,102,241)",
                "rgba(59,132,246)",
            ],
            borderColor: [
                "rgba(20,184,166)",
                "rgba(245,158,10)",
                "rgba(99,102,241)",
                "rgba(59,132,246)",
            ],
            borderWidth: 1,
        },
    ],
};

const sxs = {

    detailTitle: {
        background: "#36588C",
        color: "white",
        padding: "1%",
        borderRadius: "10px 10px 0 0",
    },
    customLabel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        justifyContent: 'space-around',
        height: '25vh'
    },
    label: {
        borderRadius: '50%',
        width: '10px',
        height: '10px'
    }
};

function AccountsPieChart(props?: CustomOptions) {
    return (
        <Box sx={{ display: "flex", alignItems: 'center' }}>
            <Box>
                <Doughnut data={data} options={{
                    ...props, plugins: {
                        // legend: {
                        //     position: 'right',
                        //     labels: {
                        //         boxWidth: 10,
                        //         useBorderRadius: true,
                        //         borderRadius: 100,
                        //     }
                        // }
                    }
                }} />
            </Box>
            <Box sx={sxs.customLabel}>
                {labels &&
                    labels.map((label) => {
                        return (
                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                <Typography sx={{ ...sxs.label, background: `${label.color}` }}></Typography>
                                {label.title}
                            </div>
                        );
                    })}
            </Box>
        </Box>
    );
}

export { AccountsPieChart };
