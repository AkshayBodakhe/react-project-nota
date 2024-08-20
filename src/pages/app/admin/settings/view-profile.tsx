import { ButtonBase, Grid, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProfileImage from "../../../../assets/other/profile.jpg";
import { makeStyles } from "@mui/styles";
import { adminConstants } from "../../../../constants/admin";

export const userProfileStyles = makeStyles(() => {
  return {
    mainGrid: { width: "799px !important", height: "352px",padding:'25px' },
    typography: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    imgGrid: {
      width: "70px !important",
      height: "230px",
      borderRadius: "30px",
    },

    fieldTypo: {
      color: "#3A3A3ACC",
      padding: "14px !important",
    },
    valueTypo: {
      color: "#1A1A1A99",
      padding: "14px !important",
      fontWeight: "bold !important",
    },
    content: {
      borderRadius: "15px",
    },
  };
});

interface UserProfileProps {
  open: boolean;
  setOpen?: any;
  usersettingcardsdata?: any;
  onClose?: any;
}
function UserProfileDialog(props: UserProfileProps) {
  const {
    //open, 
    setOpen,
    usersettingcardsdata,
    //onClose 
  } = props;
  const { NAME, ROLE, EMAILID, CONTACT_NUMBER, USER_PROFILE, USER_TYPE } =
    adminConstants;

  const classes = userProfileStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grid container p={2} className={classes.mainGrid}>
      <Grid container className={classes.typography} alignItems={'center'}>
        <Grid item xs={11} sx={{display:"flex",justifyContent:"center",alignItems:"baseline"}}>
          <Typography variant="h2" >{USER_PROFILE}</Typography>
        </Grid>
        <Grid item>
          <ButtonBase  onClick={handleClose}>
            <CloseIcon />
          </ButtonBase>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container xs={12} gap={3}>
          <Grid item xs={3.5} className={classes.imgGrid}>
            <img
              width="100%"
              height="100%"
              src={usersettingcardsdata.avatar || ProfileImage}
              className={classes.content}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item lg={4}>
                <Typography variant="h4" className={classes.fieldTypo}>
                  {NAME}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h4" className={classes.valueTypo}>{`${usersettingcardsdata.firstName || ""
                  } ${usersettingcardsdata.lastName || ""}  `}</Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="h4" className={classes.fieldTypo}>
                  {EMAILID}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h4" className={classes.valueTypo}>
                  {usersettingcardsdata.email || ""}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="h4" className={classes.fieldTypo}>
                  {CONTACT_NUMBER}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h4" className={classes.valueTypo}>
                  {usersettingcardsdata?.phone || ""}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="h4" className={classes.fieldTypo}>
                  {USER_TYPE}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h4" className={classes.valueTypo}>
                  {usersettingcardsdata?.roleType || "-"}
                </Typography>
              </Grid>
              <Grid item lg={4}>
                <Typography variant="h4" className={classes.fieldTypo}>
                  {ROLE}
                </Typography>
              </Grid>
              <Grid item lg={8}>
                <Typography variant="h4" className={classes.valueTypo}>
                  {usersettingcardsdata?.role?.name || "-"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserProfileDialog;
