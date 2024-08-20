import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import {
  usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory
} from "../../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { PatientSocialHistory } from "../../../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { Column } from "../../medication";
import AddNewSocialHistory from "../social-history/add-social-history";
import SocialHitoryTable from "./social-history-table";
export const style = makeStyles(() => ({
  label: {
    color: "#1A1A1ACC",
    fontWeight: "bold !important",
  },
  description: {
    color: "#1A1A1A80",
  },
  leftContainer: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: "1px solid #1A1A1A40",
    borderRadius: "5px",
    opacity: 1,
    padding: "10px",
  },
  currentIndex: {
    background: "#7070700F",
    borderRadius: "5px",
    opacity: 1,
    borderLeft: "5px solid #2C57B3",
    padding:"5px 10px"
  },
  section:{
    padding:"0px 10px",
    cursor:"pointer"
  }
}));

interface SocailHistoryProps {
  patientData?: any;
}

export const SocialHistoryFormColumns: Column[] = [
  { id: "name", label: "Name", minWidth: 400 },
  { id: "description", label: "Description", minWidth: 250 },
  //   { id: "action", label: "Action", minWidth: 100 },
];

function NewSocialHistory(props: SocailHistoryProps) {
  const { patientData } = props;
  const classes = style();
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Education Level');
  const [pagination, setPagination] = useState({
    patientUuid: patientData?.uuid,
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    totalPages: 0,
    totalElements: 0,
  });
  const [socialHistoryType, setSocialHistoryType] = useState(
    PatientSocialHistory.socialHistoryType.EDUCATION_LEVEL
  );
  const [socialHistoryData, setSocialHistoryData] = useState([]);
  const { data, isSuccess, refetch } =
    usePatientSocialHistoryControllerServiceGetAllPatientSocialHistory({
        patientUuid: patientData?.uuid,
        socialHistoryType: socialHistoryType,
        page:pagination?.page,
        size:pagination?.size
    });

  useEffect(() => {
    if (isSuccess && !!data) {
      const newRows = data?.data?.content.map((data: any) => ({
        name: data?.name,
        description: data?.description,
      }));
      setSocialHistoryData(newRows);
      setPagination((pre:any)=>({
        ...pre,
        totalPages:data?.data?.totalPages,
        totalElements:data?.data?.totalElements
      }))
    }
  }, [isSuccess,data]);

  useEffect(() => {
    setHistoryType(index);
  }, []);

  const openModal = (index: number) => {
    setHistoryType(index);
    setOpen(true);
    setIndex(index);
  };

  const checkOption = (index:number) =>{
    setHistoryType(index);
    setIndex(index);
  };

  const setHistoryType = (index: number) => {
    switch (index) {
      case 0:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.EDUCATION_LEVEL
        );
        setTitle('Education Level')
        break;
      case 1:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.FINANCIAL_STRAIN
        );
        setTitle('Financial Strain')
        break;
      case 2:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.EXPOSURE_TO_VIOLENCE
        );
        setTitle('Exposure To Violence')
        break;
      case 3:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.TOBACCO_USE
        );
        setTitle('Tobacco Use')
        break;
      case 4:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.ALCOHOL_USE
        );
        setTitle('Alcohol Use')
        break;
      case 5:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.PHYSICAL_ACTIVITY
        );
        setTitle('Physical Activity')
        break;
      case 6:
        setSocialHistoryType(PatientSocialHistory.socialHistoryType.STRESS);
        setTitle('Stress')
        break;
      case 7:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.SEXUAL_ORIENTATION
        );
        setTitle('Sexual Orientation')
        break;
      case 8:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.NUTRITION_HISTORY
        );
        setTitle('Nutrition History')
        break;
      case 9:
        setSocialHistoryType(
          PatientSocialHistory.socialHistoryType.SOCIAL_HISTORY
        );
        setTitle('Social History')
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", gap: "10px" }} mt={1}>
        <Grid item xs={4} className={classes.leftContainer}>
          <Grid item xs={12} className={index == 0 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(0)}>
                Education Level
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(0)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No education level recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 1 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(1)}>
                Financial Strain
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(1)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No financial strain recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 2 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(2)}>
                Exposure To Violence
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(2)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              1. Exposure to Violence : Score 06 : 10-04-2023
            </Typography>
          </Grid>
          
          <Grid item xs={12} mt={2} className={index == 3 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(3)}>
                Tobacco Use
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(3)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              1. Ex-Smoker : 10-04-2023
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 4 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(4)}>
                Alcohol Use
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(4)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No alcohol use recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 5 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(5)}>
                Physical Activity
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(5)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No physical activity recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 6 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(6)}>
                Stress
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(6)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No stress recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 7 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(7)}>
                Sexual Orientation
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(7)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No sexual orientation recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 8 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(8)}>
                Nutrition History
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(8)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No nutrition history recorded
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2} className={index == 9 ? classes.currentIndex : classes.section}>
            <Grid container alignItems={"center"} gap={"10px"}>
              <Typography variant="h4" className={classes.label} onClick={() => checkOption(9)}>
                Social History (Free text)
              </Typography>{" "}
              <ControlPointOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => openModal(9)}
              />
            </Grid>
            <Typography variant="h5" className={classes.description}>
              No nutrition history recorded
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={8} className={classes.leftContainer}>
          <SocialHitoryTable
            SocialHistoryFormColumns={SocialHistoryFormColumns}
            socialHistoryData={socialHistoryData}
            title={title}
            btnTitle="Add PH"
            pagination={pagination}
            setPagination={setPagination}
          />
        </Grid>
      </Grid>
      <AddNewSocialHistory
        title={`Add ${title}`}
        source="Add"
        open={open}
        setOpen={setOpen}
        patientData={patientData}
        socialHistoryType={socialHistoryType}
        refetch={refetch}
      />
    </>
  );
}

export default NewSocialHistory;
