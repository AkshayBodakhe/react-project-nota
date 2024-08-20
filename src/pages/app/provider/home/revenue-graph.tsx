import { Box, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";



import { CategoryScale } from 'chart.js';

ChartJS.register(...registerables);


ChartJS.register(CategoryScale);

// const sxs = {
//     detailTitle: {
//         background: "#36588C",
//         color: "white",
//         padding: "1%",
//         borderRadius: "10px 10px 0 0",
//     },
// };

const data = {
    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'A', 'N', 'D'],
    type: 'line',
    datasets: [
        {
            data: [33, 43, 36, 41, 40, 38, 34, 42, 29, 33, 31, 43],
            fill: false,
            borderColor: "#36588C",
        },
        {
            data: [38, 43, 35, 31, 34, 38, 47, 47, 35, 44, 35, 26],
            fill: false,
            borderColor: "#2B9224",
        },{
            data: [34, 33, 28, 23, 44, 56, 36, 27, 45, 54, 53, 28],
            borderColor: "rgba(217, 52, 43, 1)",
            fill: false
        }
    ],
};

const options = {
    tension: 0.5,
    legend: {
        display: false
    },
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    borderWidth: 1,
    pointBorderWidth: 1,
}


function RevenueGraph() {
    return (
        <>
            {/* <Box sx={{ background: "white" }}> */}
                {/* <Box sx={sxs.detailTitle}>Practice or provider revenues</Box> */}
                <Box sx={{ padding: '5px' }}>
                    <div className="App">
                        <Line data={data} id="2" options ={options}/>
                    </div>
                    <Box sx={{ display: 'flex',justifyContent: 'flex-end', gap: '10px' }}>
                        <Typography style={{ color: '#2B9224',fontFamily: 'Roboto,sans-serif' }}>Top Revenue</Typography> &nbsp;&nbsp;
                        <Typography style={{ color: '#36588C', fontFamily: 'Roboto,sans-serif' }}>Copay/cash</Typography>&nbsp;&nbsp;
                        <Typography style={{ color: '#D9342B', fontFamily: 'Roboto,sans-serif' }}>Insurance</Typography>
                    </Box>
                </Box>
            {/* </Box> */}
        </>
    );
}

export { RevenueGraph };
