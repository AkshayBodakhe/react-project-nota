import React from "react";
import CommonModal from "../../../../../components/common/modal/common-modal";
import { Grid, Box } from "@mui/material";
import { calculateDOB, transformText } from "../../../../../components/common/helper";
import moment from "moment";
interface AppointmentDetailProps {
  appointmentDetail: any;
}
const AppointmentDetail = (props:AppointmentDetailProps) => {
  const {appointmentDetail} = props
  return (
    <Box>
      <Grid container xs={12}>
        <Grid
          item
          xs={3}
          height={"5rem"}
          sx={{
          }}
        >
          <img src={'https://cdn-icons-png.flaticon.com/512/21/21104.png'} height={'70px'} width={'70px'}/>
          
        </Grid>
        <Grid
          item
          xs={9}
          sx={{
          }}
        >
          <Grid item xs={12}>
            {" "}
            {appointmentDetail?.patientName}
          </Grid>
          <Box display={"flex"} gap={2}>
            <Box> {moment.utc(appointmentDetail?.dob).format('DD MMMM YYYY')}</Box>
            <Box> {calculateDOB(appointmentDetail?.dob)}</Box>
            <Box> {transformText(appointmentDetail?.patientGender)}</Box>
          </Box>
          <Box display={"flex"} gap={2}>
            <Box display={"flex"} gap={2}>
              <Box>icon</Box>
              <Box>{appointmentDetail?.contactNumber}</Box>
            </Box>
            <Box display={"flex"} gap={2}>
              <Box>icon</Box>
              <Box>{appointmentDetail?.contactNumber}</Box>{" "}
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Grid container xs={12}>
        <Grid item xs={1}>
          Icon
        </Grid>
        <Grid item xs={11}>
        {transformText(appointmentDetail?.appointmentType)}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid
          item
          xs={11}
          height={"5rem"}
          sx={{
            background: "#dedcd7",
          }}
        >
          {moment.utc(appointmentDetail?.appointmentDate).format('dddd DD MMMM YYYY')}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          {transformText(appointmentDetail?.appointmentStatus)}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          Input filed here
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppointmentDetail;
