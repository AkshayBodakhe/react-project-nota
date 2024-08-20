import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MacrosControllerService } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { formButtonStyle } from "../../../../../../styles/common";
import { formBuilderHeaders } from "../provider-setting-constats";
import Macros from "./macros";
import ConsentFormTable from "./macros/form-builder/consent-form/consent-form";
import IntakeFormTable from "./macros/form-builder/intake-form/intake-form";
import VisitNotesTab from "./macros/form-builder/visit-notes/visit-notes";
import { useNavigate } from "react-router-dom";
import { UPLOAD_CONSENT_FORM } from "./macros/form-builder/common-fb-const";
import CloseIcon from "@mui/icons-material/Close";
import IntakeFormWindow from "./macros/form-builder/intake-form/intake-form-window";
import CustomForm from "./macros/form-builder/intake-form/CustomForm";
import useHasPermission from "../../../../../../components/common/useHasPermission";
import { Permission } from "../../../../../../components/common/enums-and-interfaces/enums";

export const style = makeStyles(() => ({
  tab: {
    // fontWeight: "bold !important",
    fontSize: "16px !important",
  },
  tabSwitchGrid: {
    width: "inherit",
    height: "64vh",
    // overflowY: "scroll",
  },
  addButtonTypo: {
    color: "#ffffff !important",
    display: "flex",
    // paddingLeft: "12px",
    paddingRight: "2px",
    opacity: 0.9,
  },
  addUserRoleBtnTypo: {
    color: "#ffffff",
    display: "flex",
    // paddingRight: "12px",
  },
}));

const FormBuilderOption = (props: any) => {
  const classes = style();
  const [value, setValue] = React.useState(props.selectedIndex || 0);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState();
  const Navigate = useNavigate();
  const [openFormDialog, setOpenFormDialog] = useState(false);

  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";
  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };
  // const handleClickOpen = () => {
  //   if (value == 1) setOpen(true);
  // };
  const openFormModal = () => {
    value === 0 ? setOpen(true) : setOpen(false);
  };
  const getAllMacros = async () => {
    await MacrosControllerService.getAllMacros(providerGroupUuid, 0, 1);
  };
  useEffect(() => {
    getAllMacros();
  }, []);

  const canViewMacros=useHasPermission(Permission.MACROS)
  const canViewIntakeForm=useHasPermission(Permission.INTAKE_FORM)
  useEffect(() => {
    if (!canViewMacros) setValue(0);
    if(canViewMacros && !canViewIntakeForm) setValue(0);
  }, []);

  const getLabelText = (value: number) => {
    switch (value) {
      case 0:
        return "Add Macros";
      case 1:
        return "Create New Intake Plan";
      // case 2:
      //   return "Create New Visit Notes";
      // case 3:
      //   return "Create New Visit Notes";
      // case 4:
      //   return "Add Consent Form";
      default:
        return "";
    }
  };

  const handleNavigate = () => {
    setOpenFormDialog((item) => !item);
    // value === 1 && Navigate("/provider/settings/intake-form");
  };

  return (
    <>
      <Grid
        container
        sx={{
          background: "#fff",
          boxShadow: "0px 0px 8px #00000029",
          borderRadius: "5px",
          opacity: 1,
          padding: "10px",
        }}
      >
        {" "}
        <Grid item xs={12}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item sx={{ display: "flex", gap: "8px" }}>
              <ArrowBackOutlinedIcon
                sx={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => props.setIsSetting()}
              />
              <Typography sx={{ color: "#1A1A1ACC", fontWeight: 600 }}>
                Forms Builder
              </Typography>
            </Grid>
            <Grid item>
              {value === 3 && (
                <Button
                  sx={{
                    ...formButtonStyle.editProfileBtn,
                    marginRight: "10px",
                    backgroundColor: "white",
                  }}
                  // onClick={openFormModal}
                >
                  <AddOutlinedIcon
                    sx={{ color: "#1B5984", fontSize: "18px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    {UPLOAD_CONSENT_FORM}
                  </Typography>
                </Button>
              )}
              {value === 0 && canViewMacros && (
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => {
                    openFormModal();
                  }}
                >
                  <AddOutlinedIcon
                    sx={{ color: "#1B5984", fontSize: "18px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    {"Add Macros"}
                  </Typography>
                </Button>
              )}
              {(value === 1 || !canViewMacros) && (
                <Button
                  sx={formButtonStyle.editProfileBtn}
                  onClick={() => {
                    handleNavigate();
                  }}
                >
                  <AddOutlinedIcon
                    sx={{ color: "#1B5984", fontSize: "18px" }}
                  />
                  &nbsp;
                  <Typography
                    variant="h5"
                    sx={{ textTransform: "capitalize", fontWeight: 600 }}
                  >
                    {"Create New Intake Plan"}
                  </Typography>
                </Button>
              )}
            </Grid>
            {/* )} */}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {formBuilderHeaders.map((tab: any) => {
                  if (!canViewMacros && tab.label === "Macros") return null;
                  if (!canViewIntakeForm && tab.label === "Intake Form") return null;
                  return (
                    <Tab
                      key={tab.label}
                      className={classes.tab}
                      sx={{ textTransform: "capitalize" }}
                      label={tab.label}
                    />
                  );
                })}
              </Tabs>
            </Grid>
            <Grid item xs={12} mt={2}>
              {value == 0 && canViewMacros && (
                <Macros
                  open={open}
                  setOpen={setOpen}
                  editData={editData}
                  setEditData={setEditData}
                  providerGroupUuid={providerGroupUuid}
                />
              )}
              {(value === 1 || !canViewMacros) && (
                <IntakeFormTable callFromDialog={openFormDialog} />
              )}
              {value === 2 && <VisitNotesTab />}
              {value === 3 && <ConsentFormTable />}
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Dialog
            open={false}
            onClose={handleNavigate}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            maxWidth="xl"
            fullWidth
          >
            <DialogTitle
              sx={{ display: "flex", justifyContent: "space-between" }}
              id="scroll-dialog-title"
            >
              <Typography variant="h3" sx={{ fontWeight: "600" }}>
                {"Encounter Information"}
              </Typography>
              <div>
                <CloseIcon
                  onClick={handleNavigate}
                  sx={{ cursor: "pointer" }}
                />
              </div>
            </DialogTitle>
            <DialogContent>
              {/* <IntakeFormWindow handleClose={handleNavigate} /> */}
              {/* <CustomForm handleClose={handleNavigate} /> */}
            </DialogContent>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

export default FormBuilderOption;
