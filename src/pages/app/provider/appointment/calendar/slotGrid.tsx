import { Grid, Typography } from "@mui/material";
import React from "react";
import { ScheduleAppointmentStyle } from "./widget";

interface SlotGridProps {
  index: number;
  setSelectedSlot: (data: string) => void;
  slot: string;
  selectedSlot: string
}
const SlotGrid = ({ index, setSelectedSlot, slot,selectedSlot }: SlotGridProps) => {
  const UIStyle = ScheduleAppointmentStyle();

  return (
    <Grid
      item
      xs={4}
      key={index}
      className={UIStyle.slots}
      sx={{
        background: `${slot == selectedSlot ? '#CCC' : '#FFFFFF' } 0% 0% no-repeat padding-box !important`,
      }}
      onClick={() => setSelectedSlot(slot)}
    >
      <Typography variant="h5">{slot}</Typography>
    </Grid>
  );
};

export default SlotGrid;
