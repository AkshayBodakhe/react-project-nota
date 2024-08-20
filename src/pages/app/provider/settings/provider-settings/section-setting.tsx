import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { Grid, Typography } from "@mui/material";

interface SectionInterface {
  title: string;
  options: any;
  imageSrc: any;
  setIsSetting: any;
  setShowSetting: any;
  setAppointmentTab?: any;
  setSelectedIndex?: any;
}

function SectionSetting(props: SectionInterface) {
  const getOpen = (element: string) => {
    props.setIsSetting(true);
    if (props.title == "Appointment") {
      element === "Availability"
        ? props.setAppointmentTab(0)
        : props.setAppointmentTab(1);
      props.setShowSetting(0);
    } else if (props.title == "Provider Group") props.setShowSetting(1);
    else if (props.title == "Forms Builder") props.setShowSetting(2);
    else if (props.title === "Master") props.setShowSetting(3);
  };

  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: "flex", gap: "10px" }}>
        <img src={props.imageSrc}></img>
        <Typography sx={{ color: "#1B5984", fontWeight: 600 }} variant="h4">
          {props.title}
        </Typography>
      </Grid>
      {props.options.map((element: string, index: number) => (
        <Grid
          item
          xs={12}
          mt={2}
          key={element}
          sx={{ cursor: "pointer" }}
          onClick={() => {
            getOpen(element);
            props.setSelectedIndex(index);
          }}
        >
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h5" sx={{ color: "#1A1A1A99" }}>
              {element}
            </Typography>
            <ArrowForwardIosOutlinedIcon
              sx={{ color: "#1A1A1ACC", fontSize: "14px" }}
            />
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}
export default SectionSetting;
