import { Box, Grid, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { usePatientControllerServiceUpdatePatientAccess } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";

interface PortalAccessProps {
  patientData: any;
}

const PortalAccess = (props: PortalAccessProps) => {
  const { patientData } = props;
  const [checked, setChecked] = React.useState(patientData?.active);
  const dispatch = useDispatch();

  const { mutateAsync, error, isError } =
    usePatientControllerServiceUpdatePatientAccess();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    mutateAsync({
      patientUuid: patientData?.uuid,
      active: event.target.checked,
    }).then((res: any) => {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: res.message as any,
          severity: "success",
        })
      );
    });
  };

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  return (
    <>
      <Grid container alignContent={"center"}>
        <Box
          p={2}
          m={2}
          sx={{
            border: "1px solid #1A1A1A40",
            width: "fit-content",
            borderRadius: "10px",
          }}
        >
          <Grid>
            <Typography>{"Patient App Access "}</Typography>
          </Grid>
          <Grid container gap={2} alignItems={"center"}>
            <Typography>
              {"Enable or Disable for Active/Inactive Patients"}
            </Typography>
            <Typography>{":"}</Typography>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default PortalAccess;
