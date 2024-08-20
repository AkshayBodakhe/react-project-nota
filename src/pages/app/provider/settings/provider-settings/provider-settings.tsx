import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import providerProup from "../../../../../../src/assets/other/pgSetting.svg";
import AppLayout from "../../../../../components/core/layout/layout";
import {
  card,
  mainContainer,
} from "../../../../../components/core/layout/styles";
import { providerConstants } from "../../../../../constants/provider";
import AppointmentOptions from "./appointment.tsx/appointmentOptions";
import FormBuilderOption from "./appointment.tsx/formBuilderOption";
import { MasterOptions } from "./master-settings/constants/common-const";
import Master from "./master-settings/master";
import ProviderGroupOptions from "./provider-group-settings.tsx/provider-group-options";
import {
  Appointment,
  formBuilderOptions,
  providerGroupOptions,
} from "./provider-setting-constats";
import SectionSetting from "./section-setting";
import { isNavalaCare } from "../../../../../components/common/helper";
import useHasPermission from "../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../components/common/enums-and-interfaces/enums";
const { SETTINGS, PROVIDER } = providerConstants;

function ProviderSettings() {
  const [isSetting, setIsSetting] = useState<any>(false);
  const [showSetting, setShowSetting] = useState(null);
  const [appointmentTab, setAppointmentTab] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const canViewMasters=useHasPermission(Permission.MASTERS)
  const canViewAppointment=useHasPermission(Permission.AVAILABILITY)
  const canViewMacros=useHasPermission(Permission.MACROS)
  const canViewIntakeForm=useHasPermission(Permission.INTAKE_FORM)


  // const loginData = useSelector(
  //   (state: any) => state.commonReducer.loginReducer
  // );

  return (
    <>
      {!isSetting && (
        <Grid container marginTop={0} sx={mainContainer}>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{ color: "#1A1A1ACC", fontWeight: 600 }}
            >
              {SETTINGS}
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container columnGap={2}>
              {canViewAppointment && <Grid item xs={2.4} sx={card}>
                <SectionSetting
                  setIsSetting={setIsSetting}
                  setShowSetting={setShowSetting}
                  title="Appointment"
                  options={Appointment}
                  setAppointmentTab={setAppointmentTab}
                  imageSrc={providerProup}
                  setSelectedIndex={setSelectedIndex}
                />
              </Grid>}
              <Grid item xs={2.4} sx={card}>
                <SectionSetting
                  setIsSetting={setIsSetting}
                  setShowSetting={setShowSetting}
                  title="Provider Group"
                  options={providerGroupOptions}
                  imageSrc={providerProup}
                  setSelectedIndex={setSelectedIndex}
                />
              </Grid>
              {(canViewMacros || canViewIntakeForm )&& <Grid item xs={2.4} sx={card}>
                <SectionSetting
                  setIsSetting={setIsSetting}
                  setShowSetting={setShowSetting}
                  title="Forms Builder"
                  options={formBuilderOptions}
                  imageSrc={providerProup}
                  setSelectedIndex={setSelectedIndex}
                />
              </Grid>}
              {!isNavalaCare() && canViewMasters && (<Grid item xs={2.4} sx={card}>
                <SectionSetting
                  setIsSetting={setIsSetting}
                  setShowSetting={setShowSetting}
                  title={"Master"}
                  options={MasterOptions}
                  imageSrc={providerProup}
                  setAppointmentTab={setAppointmentTab}
                  setSelectedIndex={setSelectedIndex}
                ></SectionSetting>
              </Grid>) }
              
            </Grid>
          </Grid>
        </Grid>
      )}
      {isSetting && (
        <Grid item xs={12}>
          {showSetting == 1 && (
            <ProviderGroupOptions
              setIsSetting={() => setIsSetting(!isSetting)}
              selectedIndex={selectedIndex}
            />
          )}
          {showSetting == 0 && (
            <AppointmentOptions
              tabIndex={appointmentTab}
              setIsSetting={() => setIsSetting(!isSetting)}
            />
          )}
          {showSetting == 2 && (
            <FormBuilderOption
              tabIndex={appointmentTab}
              setIsSetting={() => setIsSetting(!isSetting)}
              selectedIndex={selectedIndex}
            />
          )}
          {showSetting == 3 && (
            <>
              <Master
                setIsSetting={() => setIsSetting(!isSetting)}
                selectedIndex={selectedIndex}
              />
            </>
          )}
        </Grid>
      )}
    </>
  );
}

export default AppLayout(ProviderSettings, { source: PROVIDER });
