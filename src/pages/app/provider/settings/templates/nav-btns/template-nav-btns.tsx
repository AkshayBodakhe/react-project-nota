import { Box, ButtonBase, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link, useLocation } from "react-router-dom";
import { formButtonStyle } from "../../../../../../styles/common";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";


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
        width: "15rem",
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
        width: "15rem",
        height: "32px",
        margin: "5px 3px !important",

        "&:hover": {
            background: '#DAEAF8 !important',
            color: '#36588C !important'
        }
    },
    addButtonTypo: {
        color: "white !important",
        display: "flex",
        // paddingLeft: "12px",
        paddingRight: "2px",
        opacity:"0.9"
    },
}));

interface RenderButtonProps {
    name: string;
    label: string;
    btnActive?: boolean;
    path: string;
    subPath: string
}

enum Tabs {
    VISIT_NOTES = 'visit-notes',
    ROS = 'ros',
    PYHSICAL_EXAM = 'physical-exam',
    ASSESSMENTS = 'screening-assessments'
}

const renderTabsData = [
    {
        name: "Visit Notes",
        path: "/settings/templates/visit-notes",
        lable: Tabs.VISIT_NOTES, // isActive: checkMaster?.dataImport,
        subPath: '/provider/settings/templates'
    },
    {
        name: "Review of System (ROS)",
        path: "/settings/templates/ros",
        lable: Tabs.ROS, // isActive: checkMaster?.labCatalog,
    },
    {
        name: "Physical Exam (PE)",
        path: "/settings/templates/physical-exam",
        lable: Tabs.PYHSICAL_EXAM, // isActive: checkMaster?.labCatalog,
    },
    {
        name: "Screening Assessments",
        path: "/settings/templates/screening-assessments",
        lable: Tabs.ASSESSMENTS, // isActive: checkMaster?.labCatalog,
    }
];

const sxs = {

    createBtn: {
        display: 'flex',
        justifyContent: 'end'
    }
}

function TemplateNavBtns() {
    const classes = masterStyle();
    const currentPath = useLocation().pathname;
    const [activeTab, setActiveTab] = useState<string>('');

    const handleCreateClick = () => {

    }

    const handleTabChange = (label: string) => {
        setActiveTab(label)
    }

    useEffect(() => {
        if (currentPath.includes(Tabs.VISIT_NOTES))
            setActiveTab(Tabs.VISIT_NOTES)
        else if (currentPath.includes(Tabs.ROS))
            setActiveTab(Tabs.ROS)
        else if (currentPath.includes(Tabs.PYHSICAL_EXAM))
            setActiveTab(Tabs.PYHSICAL_EXAM)
        else
            setActiveTab(Tabs.ASSESSMENTS)
    }, [activeTab]);

    const RenderButton: React.FC<RenderButtonProps> = ({
        label,
        // btnActive,
        name,
        path,
        subPath
    }) => {
        const toPath = `/provider/settings/templates/${label}`;
        return (
            <Link to={toPath}>
                <ButtonBase
                    className={
                        subPath !== '' && subPath === currentPath ? classes.buttonActive : currentPath.includes(path) ? classes.buttonActive : classes.buttonDeactive
                    }
                    onClick={() => handleTabChange(label)}
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
                    <Box sx={sxs.createBtn}>
                        <ButtonBase onClick={handleCreateClick} type="submit"
                            sx={{ ...formButtonStyle.saveButtonStyle ,width:"auto" , padding:"0px 10px !important"}}>
                            <span className={classes.addButtonTypo}>
                                <AddIcon />
                            </span>
                            {(() => {
                                switch (activeTab) {
                                    case Tabs.VISIT_NOTES:
                                        return (<>Create Visit Note</>);
                                    case Tabs.ROS:
                                        return (<>Create ROS</>);
                                    case Tabs.PYHSICAL_EXAM:
                                        return (<>Create PE</>);
                                    case Tabs.ASSESSMENTS:
                                        return (<>Create Assessment</>);
                                    default:
                                        break;
                                }
                            })()}
                        </ButtonBase>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}

export default TemplateNavBtns;