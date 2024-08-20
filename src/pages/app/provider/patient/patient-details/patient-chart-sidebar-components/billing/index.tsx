import { ButtonBase, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import { demographicsIndexStyles } from "../demographics";
import AddIcon from "@mui/icons-material/Add";
import { PatientBillingType } from "../enums-interfaces/enums";
import { PatientData } from "../diagnoses";
import BillingIndexTab from "./biling-tab";

function BillingTab(props: PatientData) {

    const [value, setValue] = useState(Object.values(PatientBillingType).indexOf(PatientBillingType.ENCOUNTERS_FOR_BILLING));
    const classes = demographicsIndexStyles();
    // const [open, setOpen] = useState(false);
    const [tabs] = useState(Object.values(PatientBillingType))
    // const [modalType, setModalType] = useState<PatientBillingType>(PatientBillingType.ENCOUNTERS_FOR_BILLING);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => { }, []);

    // const handleOpenModal = (modalType: PatientBillingType) => {
    //     setModalType(modalType);
    //     setOpen(true);
    // }

    // const handleClose = () => {
    //     setOpen(false);
    // }

    return (
        <Grid>
            <Grid container xs={12}>
                <Grid item xs={10}>
                    <Tabs value={value} onChange={handleChange}>
                        {tabs.map((tab: any) => {
                            return (
                                <Tab
                                    key={tab}
                                    sx={{
                                        textTransform: "capitalize",
                                        fontWeight: "bold !important",
                                        fontSize: "16px",
                                    }}
                                    label={tab}
                                />
                            )
                        })}
                    </Tabs>
                </Grid>
                <Grid item xs={2} className={classes.buttonGrid} pr={1.5}>
                    {value === 0 && (
                        <ButtonBase
                            type="submit"
                            sx={{ ...formButtonStyle.mainButtonStyle, height: "40px !important" }}
                            // onClick={() => handleOpenModal(PatientBillingType.ENCOUNTERS_FOR_BILLING)}
                        >
                            <span className={classes.addButtonTypo}>
                                <AddIcon />
                            </span>
                            <Typography variant="h4" className={classes.buttonTypo}>Create Superbill</Typography>
                        </ButtonBase>

                    )}
                    {value === 1 && (
                        <ButtonBase
                            type="submit"
                            sx={{ ...formButtonStyle.mainButtonStyle, height: "40px !important" }}
                            // onClick={() => handleOpenModal(PatientBillingType.ENCOUNTERS_FOR_BILLING)}
                        >
                            <span className={classes.addButtonTypo}>
                                <AddIcon />
                            </span>
                            <Typography variant="h4" className={classes.buttonTypo}>Create Superbill</Typography>
                        </ButtonBase>
                    )}
                    {value === 2 && (
                        <>
                            {/* <Filters /> */}
                        </>
                    )}
                </Grid>
            </Grid>
            <Grid className={classes.tabSwitchGrid}>
                {<BillingIndexTab patientData={props.patientData} billingType={Object.values(PatientBillingType)[value]} />}
            </Grid>
            {/* {open && (() => {
                switch (modalType) {
                    case LabType.LAB_ORDER:
                        return (<>
                            <AddEditLabResults
                                patientData={props.patientData}
                                open={open}
                                onClose={handleClose}
                                title="Lab Requisition Form"
                            />
                        </>)
                    case LabType.LAB_RESULT:
                        return (<>
                            <AddEditLabResult
                                open={open}
                                onClose={handleClose}
                                patientData={props.patientData}
                                title={'Add Lab Result'}
                            />
                        </>)
                    default:
                        break;
                }
            })()} */}
        </Grid>
    )
}

export default BillingTab;