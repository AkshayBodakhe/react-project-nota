import { Checkbox, Grid, Typography } from "@mui/material";
import { patientStyle } from "./../style/commonStyle";
import React, { useEffect, useState } from "react";
import ActiveInactiveSwitch from "../../../../../components/common/custom-switch";

interface Consent {
  id: number;
  key: string;
  name: string;
  checked: boolean;
}

export type Props = {
  formik: any;
  providerList?: any[];
  locationList?: any[];
  insurancePayerList?: any[];
  setIsValid?: any;
  isSubmitting?: boolean;
  isValid?: boolean;
  setIsSubmitting?: any;
  apptDetails?: any;
};

function Privacy(props: Props) {
  const {
    formik: { values, setFieldValue },
    isSubmitting,
    setIsValid,
  } = props;
  const classes = patientStyle();

  const [privacy, setPrivacy] = useState<Consent[]>([
    {
      id: 1,
      key: "emailConsent",
      name: "Consent To Email",
      checked: values.emailConsent,
    },
    {
      id: 2,
      key: "callConsent",
      name: "Consent To Call",
      checked: values.callConsent,
    },
    {
      id: 3,
      key: "messageConsent",
      name: "Consent To Message",
      checked: values.messageConsent,
    },
  ]);

  useEffect(() => {
    if (isSubmitting) {
      setIsValid(true);
    }
  }, [isSubmitting]);

  const handleChange = (event: any, fieldName: string, index: number) => {
    setFieldValue(`${fieldName}`, event.target.checked);

    setPrivacy((prev) => {
      return prev.map((consent, j) => {
        if (index === j) {
          return {
            ...consent,
            checked: event.target.checked,
          };
        }
        return consent;
      });
    });
  };

  return (
    <React.Fragment key={"Privacy"}>
      <Grid container rowSpacing={2}>
        {privacy.map((item: Consent, index: number) => {
          return (
            <Grid item className={classes.checkBoxItem}>
              <Checkbox
                checked={item.checked}
                onClick={(e: any) => handleChange(e, item.key, index)}
              />
              <Typography variant="h4" className={classes.checkBoxText}>
                {item.name}
              </Typography>
            </Grid>
          );
        })}
        {/* <Grid item container>
          <Grid item xs={1}>
            Patient Status
          </Grid>
          <Grid item>
            <ActiveInactiveSwitch
              state={values.active}
              onChange={(event: any) =>
                setFieldValue("active", event.target.checked)
              }
            />
          </Grid>
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
}

export default Privacy;
