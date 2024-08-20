import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppointmentControllerServiceGetSlotsFromConfiguration } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  Appointment,
  FetchSlotsRequest,
  LocationControllerService,
  PatientControllerService,
  ProviderControllerService,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { style } from "../../referral/style/common-style";
import BookAppointmentForm from "./bookAppointmentForm";
import SchedulingAddPatient from "./scheduling-add-patient";
import { useSelector } from "react-redux";
import { RESCHEDULE_APPT } from "./appointmentWithLocations";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { formatDateMMDDYYWithoutTz } from "../complete-check-in/complete-check-in";
import AgeCalculator from "../../../../../components/common/age-calculator/age-calculator";
import { toCamelCase } from "../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import avatar_01 from "../../../../../assets/other/avatar_01.jpg";

const { appointmentType, visitType } = FetchSlotsRequest;
interface Props {
  title: string;
  onClose: () => void;
  open: boolean;
  appointmentDetails?: any;
}

export const firstContainer = {
  border: "1px solid black",
  borderRadius: "5px",
  height: "70px",
  width: "70px",
};

function ScheduleAppointment(props: Props) {
  const { onClose, open, title, appointmentDetails } = props;
  const commonStyle = style();
  const [providerOptions, setProviderOptions] = useState<any>(null);
  const [locationOptions, setLocationOptions] = useState<any>(null);
  const [appointmentOption, setAppointmentOption] = useState<any>(null);
  const [addpatient, setAddPatient] = useState(false);
  const [searchBy, setSearchBy] = useState("");

  const [patientList, setpatientList] = useState<any>(null);
  const Pageable = {
    page: 0,
    size: 100,
    searchBy: "",
    sort: [],
  };
  const [pageableData, setPageableData] = useState(Pageable);
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";

  const close = () => {
    onClose();
  };

  const [searchPatient, setSearchPatient] = useState("");

  const getPatientList = async () => {
    const patientList = await PatientControllerService.getPatients(
      providerGroupUuid,
      0,
      20,
      "created",
      "desc",
      searchPatient
    );
    setpatientList(patientList?.data?.content);
  };

  const getProviderList = async () => {
    const providerList = await ProviderControllerService.getAllProviders(
      providerGroupUuid,
      pageableData.page,
      pageableData.size,
      pageableData.sort,
      searchBy
    );
    setProviderOptions(providerList?.data?.content);
  };

  const getLocationList = async () => {
    const locationList = await LocationControllerService.getAllLocations(
      providerGroupUuid
    );
    setLocationOptions(locationList?.data?.content);
  };

  useEffect(() => {
    const type = Object.values(Appointment.type) as string[];
    setAppointmentOption(type);
    getPatientList();
    getLocationList();
  }, []);

  useEffect(() => {
    getPatientList();
  }, [searchPatient]);

  useEffect(() => {
    getProviderList();
  }, [searchBy]);
  return (
    <div>
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
        <DialogTitle sx={{ padding: "10px 10px 0px 10px!important" }}>
          <Grid className={commonStyle.dialogTitle}>
            <Grid>
              <Typography variant="h4" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            </Grid>
            <Grid style={{ cursor: "pointer" }}>
              <CloseIcon onClick={close} />
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {title === RESCHEDULE_APPT && (
            <>
              <Box sx={{ display: "flex", gap: "30px" }} pt={3}>
                {/* <Grid sx={firstContainer} /> */}
                <img
                  style={{ height: "70px", width: "70px" }}
                  src={appointmentDetails?.avatar || avatar_01}
                />
                <Grid container flexDirection={"column"} rowGap={2}>
                  <Box>
                    <Typography fontWeight={"600"}>
                      {appointmentDetails?.patientName}
                    </Typography>
                  </Box>
                  <Box
                    display={"grid"}
                    gridTemplateColumns={"40% 30% 30%"}
                    // rowGap={3}
                  >
                    <Grid container gap={2.5}>
                      <Typography>
                        {formatDateMMDDYYWithoutTz(appointmentDetails?.dob)}
                      </Typography>
                      <Typography>
                        <AgeCalculator
                          birthdate={appointmentDetails?.dob as string}
                        />
                        {" yrs"}
                      </Typography>
                      <Typography>
                        {toCamelCase(appointmentDetails?.patientGender)}
                      </Typography>
                    </Grid>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      <PhoneIphoneIcon />
                      <Typography>
                        {appointmentDetails?.contactNumber}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: "3px" }}>
                      <MailOutlineIcon />
                      <Typography
                        noWrap
                        title={appointmentDetails?.patientEmail}
                        sx={{ cursor: "pointer" }}
                      >
                        {appointmentDetails?.patientEmail}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Box>
              <Box sx={{ display: "flex", gap: "10px" }} pt={2}>
                <Typography sx={{ color: "black", fontWeight: "500" }}>
                  {"Provider Name"}
                </Typography>
                <Typography>{appointmentDetails?.providerName}</Typography>
              </Box>
            </>
          )}
        </DialogContent>
        <BookAppointmentForm
          locationOptions={locationOptions}
          setSearchPatient={setSearchPatient}
          patientList={patientList}
          providerOptions={providerOptions}
          setAddPatient={setAddPatient}
          appointmentOption={appointmentOption}
          key={"apnt"}
          close={close}
          setSearchBy={setSearchBy}
          appointmentDetails={appointmentDetails}
        />
      </Dialog>
      {addpatient && (
        <SchedulingAddPatient
          open={addpatient}
          onClose={() => setAddPatient(false)}
          title="New Patient"
        />
      )}
    </div>
  );
}

export default ScheduleAppointment;
