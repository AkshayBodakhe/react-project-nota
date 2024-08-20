import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import { providerConstants } from "../../../../../../constants/provider";
import CustomDateRangePicker from "./custom-date-range-picker";
import { useEffect, useState } from "react";
import { commonWidget } from "../../../../../../styles/common";
import { DisableDate, Options } from "../../../common-files/enums";

const currentYear = new Date().getFullYear();

const daysLabels = [
  "0-30 Days",
  "31-60 Days",
  "61-90 Days",
  "90-120 Days",
  "120+ Days",
  "Total Dues",
];

const monthLabels = [
  `Jan ${currentYear}`,
  `Feb ${currentYear}`,
  `Mar ${currentYear}`,
  `Apr ${currentYear}`,
  `May ${currentYear}`,
  `Jun ${currentYear}`,
  `Jul ${currentYear}`,
  `Aug ${currentYear}`,
  `Sep ${currentYear}`,
  `Oct ${currentYear}`,
  `Nov ${currentYear}`,
  `Dec ${currentYear}`,
];

const quarterlyLabels = [
  `Q1 ${currentYear}`,
  `Q2 ${currentYear}`,
  `Q3 ${currentYear}`,
  `Q4 ${currentYear}`,
];

const { DUE_PAYMENT } = providerConstants;

let patientData: any[] = [10, 15, 50, 35, 45, 56, 65, 35, 45, 25, 15, 5];
let insuranceData: any[] = [5, 25, 35, 65, 56, 52, 40, 55, 25, 45, 35, 15];

const data = {
  labels: daysLabels,
  datasets: [
    {
      id: "patient",
      label: "Patient",
      data: patientData,
      barPercentage: 0.5,
      barThickness: 20,
      backgroundColor: "#DAEAf8",
      borderColor: "#DAEAf8",
      borderWidth: 1,
    },
    {
      label: "hide",
      data: [],
    },
    {
      id: "insurance",
      label: "Insurance",
      data: insuranceData,
      barPercentage: 0.5,
      barThickness: 20,
      backgroundColor: "#36598C",
      borderColor: "#36598C",
      borderWidth: 1,
    },
  ],
};

const sxs = {
  graphContainer: {
    height: "80vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    background: "white",
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "2%",
    alignItems: "center",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
  },
};

function DuePaymentChart() {
  const classes = commonWidget();
  const [select, setSelect] = useState(Options.days);

  const handleChange = (event: any) => {
    setSelect(event.target.value);
    switch (event?.target?.value) {
      case Options.days:
        data.labels = daysLabels;
        patientData = [5, 25, 35, 65, 56, 52, 40];
        insuranceData = [10, 15, 50, 35, 45, 56, 65];
        break;
      case Options.month:
        data.labels = monthLabels;
        patientData = [10, 15, 50, 35, 45, 56, 65, 35, 45, 25, 15];
        insuranceData = [5, 25, 35, 65, 56, 52, 40, 55, 25, 45, 35];
        break;
      case Options.quarterly:
        data.labels = quarterlyLabels;
        patientData = [5, 25, 35, 65, 56, 52, 40];
        insuranceData = [10, 15, 50, 35, 45, 56, 65];
        break;
      default:
        break;
    }
  };

  const handleClose = (_date: any) => {};

  useEffect(() => {}, [select]);

  return (
    <>
      <Box sx={sxs.graphContainer}>
        <Box sx={sxs.headingContainer}>
          <Typography variant="h3">{DUE_PAYMENT}</Typography>
          <Box sx={sxs.filterContainer}>
            <Box>
              <CustomDateRangePicker
                disableDates={DisableDate.FUTURE}
                onClose={handleClose}
                format="DD/MM/YYYY"
                inputPlaceholder="Select by Date"
              />
            </Box>
            <Box>
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={select}
                  classes={{
                    root: classes.providerTextInput,
                    error: classes.inputBoxError,
                  }}
                  sx={{ width: "15rem !important", textAlign: "left" }}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={Options.days}>30 Days</MenuItem>
                  <MenuItem value={Options.month}>Month</MenuItem>
                  <MenuItem value={Options.quarterly}>Quarterly</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Bar
          options={{
            responsive: true,
            // hover: {
            //     mode: 'null'
            // },
            plugins: {
              title: {
                display: true,
                position: "bottom",
                text: "Aging Period",
              },
              legend: {
                labels: {
                  borderRadius: 50,
                  font: {
                    size: 15,
                    family: "Roboto",
                  },
                  filter: (item) => item.text !== "hide",
                },
              },
            },
            layout: {
              padding: {
                bottom: 30,
              },
            },
            scales: {
              x: {
                type: "category",
                grid: {
                  drawOnChartArea: false,
                },
              },
              y: {
                grid: {
                  drawOnChartArea: false,
                },
                title: {
                  display: true,
                  text: "Revenue Generated",
                  font: {
                    family: "Roboto",
                    size: 14,
                  },
                },
              },
            },
          }}
          data={data}
        />
      </Box>
    </>
  );
}

export default DuePaymentChart;
