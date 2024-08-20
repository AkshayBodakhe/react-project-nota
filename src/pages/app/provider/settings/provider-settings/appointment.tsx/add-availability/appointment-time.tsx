import {
  Grid,
  Typography,
} from "@mui/material";
import FormInput from "../../../../../../../components/common/atom/FormInput";
import { AppointmentsTime } from "../../../../../../../components/common/form-enum";
import { useEffect } from "react";

export type Props = {
  formik: any;
  blocks?: any[];
  setBlocks?: any;
}

function AppointmentTime(props: Props) {

  const {
    formik: {
      values,
      setFieldValue,
      handleChange
    },
  } = props;

  const newAppointmentTime = [
    15,
    30,
    45,
    60,
    75,
    90,
    105,
    120,
  ];

  const bufferTimeOptions = [
    0,
    15,
    30,
    45,
  ];

  useEffect(()=>{
  },[setFieldValue]);

  return (
    <>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Initial Consult Time{" "}
            <span style={{ color: "#1A1A1A99" }}>(minutes)</span>
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2} sx={{ display: "flex", gap: "5px" }}>
          {newAppointmentTime.map((element, index) => (
            <Grid
              key={index}
              item
              onClick={() => setFieldValue('initialConsultTime', element)}
              sx={{
                width: "40px",
                height: "40px",
                background: element == values.initialConsultTime ? "#1B5984" : "#F3F3F3",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                color: element == values.initialConsultTime ? "#fff" : null
              }}
            >
              <Typography variant="h5">{element}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Follow Up Appointment Time{" "}
            <span style={{ color: "#1A1A1A99" }}>(minutes)</span>
          </Typography>
        </Grid>
        <Grid item xs={12} mt={2} sx={{ display: "flex", gap: "5px" }} >
          {newAppointmentTime.map((element: any,index) => (
            <Grid
              item
              key={index}
              onClick={() => setFieldValue('followUpConsultTime', element)}
              sx={{
                width: "40px",
                height: "40px",
                background: element == values.followUpConsultTime ? "#1B5984" : "#F3F3F3",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                alignItems: "center",
                color: element == values.followUpConsultTime ? "#fff" : null
              }}
            >
              <Typography variant="h5">{element}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Prevents Appointments Less Than</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", gap: "15px" }}>
          <Grid item xs={2}>
            <FormInput
              value={values.minScheduleNoticeInput}
              name="minScheduleNoticeInput"
              label={''}
              options={AppointmentsTime}
              placeholder="Type Here"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} mt={1}>
            <FormInput
              control="select"
              name="schedulingNoticeInputType"
              value={values.schedulingNoticeInputType}
              label={''}
              options={AppointmentsTime}
              placeholder="Select"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container mt={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Buffer Time <span style={{ color: "#1A1A1A99" }}>(minutes)</span>
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} mt={2} sx={{ display: "flex", gap: "5px" }}>
          {bufferTimeOptions.map((element: any,index) => (
            <Grid
              key={index}
              item
              onClick={() => setFieldValue('eventBuffer', element)}
              sx={{
                width: "40px",
                height: "40px",
                background: element == values.eventBuffer ? "#1B5984" : "#F3F3F3",
                display: "flex",
                cursor: "pointer",
                justifyContent: "center",
                alignItems: "center",
                color: element == values.eventBuffer ? "#fff" : ''
              }}
            >
              <Typography variant="h5">{element}</Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default AppointmentTime;
