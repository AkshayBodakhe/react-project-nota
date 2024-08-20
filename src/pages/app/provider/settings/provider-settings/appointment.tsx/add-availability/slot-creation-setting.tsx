import { Grid, Typography } from "@mui/material";
import { Props } from "./appointment-time";
import FormInput from '../../../../../../../components/common/atom/FormInput';
import { AppointmentTimeZones, BookingWindows } from "../../../../../../../components/common/form-enum";
import { useEffect } from "react";

function SlotCreationSettings(props: Props) {

  const {
    formik: {
      values,
      handleChange
    }
  } = props;

  return (
    <Grid
      container
      mt={2}
      sx={{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #1A1A1A1A",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">Slot Creation Settings</Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between", gap: "10px" }} mt={2}>
        <Grid item xs={6}>
          <FormInput
            control="select"
            name="bookingWindow"
            value={values.bookingWindow}
            label={'Booking Window'}
            options={BookingWindows}
            placeholder="Select"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormInput
            control="select"
            name="bookingWindowTimeZone"
            value={values.bookingWindowTimeZone}
            label={'Time Zone'}
            options={AppointmentTimeZones}
            placeholder="Select"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SlotCreationSettings;
