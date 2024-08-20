import { ButtonBase, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";

export const masterStyle = makeStyles(() => ({
    heading: {
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 0px",
    },
    buttonActive: {
        fontSize: "14px !important",
        background: "#36588C 0% 0% no-repeat padding-box !important",
        borderRadius: "5px !important",
        width: "168px",
        height: "32px",
        margin: "5px 3px !important",
    },
    buttonTypoActive: {
        fontSize: "14px !important",
        color: "#FFFF !important",
    },
    buttonTypoDeactive: { color: "#1A1A1A66" },
    buttonGrid1: {
        borderRadius: "5px",
        border: "none",
        boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2) !important",
    },

    buttonDeactive: {
        borderRadius: "5px !important",
        background: "#1A1A1A1A 0% 0% no-repeat padding-box !important",
        width: "168px",
        height: "32px",
        margin: "5px 3px !important",

        "&:hover": {
            background: '#DAEAF8 !important',
            color: '#36588C !important'
        }
    },
}));

interface RenderButtonProps {
    name: string;
    label: string;
    btnActive?: boolean;
    path: string;
    subPath: string
}

const renderTabsData = [
    {
        name: "Summary",
        path: "/account-receivable/summary",
        lable: "summary", // isActive: checkMaster?.dataImport,
        subPath: '/provider/billing/account-receivable'
    },
    {
        name: "Patient",
        path: "/account-receivable/patient",
        lable: "patient", // isActive: checkMaster?.labCatalog,
    },
    {
        name: "Insurance",
        path: "/account-receivable/insurance",
        lable: "insurance", // isActive: checkMaster?.labCatalog,
    }
];

function ReveivableNavBtns() {

    const classes = masterStyle();
    const currentPath = useLocation().pathname;
    const RenderButton: React.FC<RenderButtonProps> = ({
        label,
        // btnActive,
        name,
        path,
        subPath
    }) => {
        const toPath = `/provider/billing/account-receivable/${label}`;
        return (
            <Link to={toPath}>
                <ButtonBase
                    className={
                        subPath !== '' && subPath === currentPath ? classes.buttonActive : currentPath.includes(path) ? classes.buttonActive : classes.buttonDeactive
                    }
                    // onClick={() => handleUserSetting(label)}
                    focusRipple
                >
                    <Typography
                        className={
                            subPath !== '' && subPath === currentPath ? classes.buttonTypoActive : currentPath.includes(path) ? classes.buttonTypoActive : classes.buttonTypoDeactive
                        }
                    >
                        {name}
                    </Typography>
                </ButtonBase>
            </Link>
        );
    };

    return (
        <>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container className={classes.heading} xs={12}>
                    <Grid className={classes.buttonGrid1} item>
                        {renderTabsData.map((data) => {
                            return <RenderButton label={data.lable} name={data.name} path={data.path} subPath={data.subPath || ''} />;
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default ReveivableNavBtns;