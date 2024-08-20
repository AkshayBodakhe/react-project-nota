import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Grid, Typography } from "@mui/material";
import { patientStyle } from "../../../../patient/style/commonStyle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { PracticeHour } from "../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { Props } from "./appointment-time";
import FormInput from "../../../../../../../components/common/atom/FormInput";
import { WeekDays } from "../../../../../../../components/common/form-enum";
import { useEffect } from "react";
import { generateUniqueId } from "../../../../../../../components/common/helper";

function DaySlotCreation(props: Props) {
  const { blocks, setBlocks } = props;

  const classes = patientStyle();

  useEffect(() => {}, [blocks]);

  const addSlots = () => {
    setBlocks((prevBlocks: any) => [
      ...prevBlocks,
      {
        id: (blocks?.length || 0) + 1,
        dayOfWeek: '',
        startTime: '',
        endTime: ''
      },
    ]);
  };

  const deleteSlots = (id: any) => {
    setBlocks((prevBlocks: any) =>
      prevBlocks.filter((block: any) => block.id !== id)
    );
  };

  const handleChange = (event: PracticeHour, index: number, field: string) => {
    setBlocks((prev: any) =>
      prev.map((res: any, i: number) => {
        if (i === index) {
          return {
            ...res,
            [field]: event,
          };
        }
        return res;
      })
    );
  };

  // function getDay(index: number): PracticeHour.dayOfWeek {
  //   let day: PracticeHour.dayOfWeek = Object.keys(PracticeHour.dayOfWeek)[index] as PracticeHour.dayOfWeek || PracticeHour.dayOfWeek.SUNDAY;
  //   return day;
  // }

  return (
    <Grid
      item
      xs={12}
      mt={2}
      sx={{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #1A1A1A1A",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5" sx={{ color: "#1A1A1A" }}>
          Day Slot Creation
        </Typography>
        <Grid item sx={{ display: "flex" }}>
          <AddOutlinedIcon sx={{ fontSize: "18px", color: "#1B5984" }} />
          <Typography
            variant="h5"
            sx={{ color: "#1B5984", cursor: "pointer" }}
            onClick={addSlots}
          >
            Add Slot
          </Typography>
        </Grid>
      </Grid>
      {blocks?.length !== 0 &&
        blocks?.map((block: any, index: number) => (
          <Grid item xs={12} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={3.8}>
                <FormInput
                  control="select"
                  name="day"
                  label="Day"
                  value={block.dayOfWeek}
                  options={WeekDays}
                  placeholder="Select"
                  onChange={(event: any) => {
                    handleChange(event.target.value, index, "dayOfWeek");
                  }}
                />
              </Grid>
              <Grid item xs={3.8}>
                <FormInput
                  control="time"
                  label={"Start Time"}
                  format="HH:mm"
                  value={block.startTime}
                  onChange={(event: any) => {
                    handleChange(event, index, "startTime");
                  }}
                />
              </Grid>
              <Grid item xs={3.8}>
                <FormInput
                  control="time"
                  label={"End Time"}
                  format="HH:mm"
                  value={block.endTime}
                  onChange={(event: any) => {
                    handleChange(event, index, "endTime");
                  }}
                />
              </Grid>
              <Grid
                item
                xs={0.6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" className={classes.label}>
                  {"\uFEFF"}
                </Typography>
                <DeleteOutlineOutlinedIcon
                  onClick={() => deleteSlots(block.id)}
                  sx={{
                    color: "#1A1A1ACC",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default DaySlotCreation;
