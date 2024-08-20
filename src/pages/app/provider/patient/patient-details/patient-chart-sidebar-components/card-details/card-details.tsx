import {
  Box,
  ButtonBase,
  Dialog,
  DialogActions,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../../styles/common";
import PatientCardDetails from "./patient-card-details";
import {
  usePatientControllerServiceGetCards,
  usePatientControllerServiceRemoveCard,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { tableUseStyles } from "../../../../appointment/calendar/appointmentWithLocations";
import { Column } from "../medication";
import { tableStyle } from "../allergies/allergies-list";
import Loading from "../../../../../../../components/common/spinner/loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UI } from "../../../../../admin/settings/roles-responsibility/roles-responsibility-table";
import ConfirmationModal, {
  css,
} from "../../../../../../../components/core/confirmation-modal/confirmation-modal";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { ErrorResponseEntity } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import EventSucessModal from "../../../../../../../components/common/success-modal";

interface CardDetailProps {
  patientData: any;
}

export const columns: Column[] = [
  { id: "name", label: "Card Holder Name" },
  { id: "cardType", label: "Card Type" },
  { id: "cardMode", label: "Card Mode" },
  { id: "cardExp", label: "Card Expiry" },
  { id: "lastFour", label: "Last Four Digit" },
  { id: "action", label: "Action" },
];

const CardDetailsComponent = (props: CardDetailProps) => {
  const [openCard, setOpenCard] = useState(false);
  const [cardInfo, setCardInfo] = useState<any>();
  const { patientData } = props;
  const classes = tableStyle();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [rowData, setRowData] = useState<any>();
  const [callSuccessEvent, openCallSuccessEvent] = useState(false);

  const handleOpenCard = (isSuccess?: any) => {
    setOpenCard((item) => !item);
    if (isSuccess === "calledSuccess") {
      handleOpenSuccessModal();
    }
  };
  const [deleteDialog, setDeleteDialog] = useState(false);
  const rolesStyle = UI();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const dispatch = useDispatch();

  const { data: cardData, refetch: callGetCard } =
    usePatientControllerServiceGetCards({ patientUuid: patientData?.uuid });

  useEffect(() => {
    setCardInfo(cardData && cardData.data);
  }, [cardData]);

  useEffect(() => {
    callGetCard();
  }, [!openCard]);

  const getFullName = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return "-";
    return firstName + " " + lastName;
  };

  const handleClick = (event: any, index: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleRemoveCard = () => {
    setDeleteDialog((item) => !item);
    setAnchorEl(null);
  };

  const {
    mutateAsync,
    error,
    isError,
    data: dataMsg,
  } = usePatientControllerServiceRemoveCard();

  const confirmationResult = async () => {
    if (rowData) {
      await mutateAsync({
        customerId: rowData?.customerId,
        cardId: rowData?.cardId,
      })
        .then((res) => {
          if (res) {
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.message as any,
                severity: "success",
              })
            );
          }
          setAnchorEl(null);
          callGetCard();
          handleRemoveCard();
        })
        .catch((_error) => {
          handleRemoveCard();
        });
    } else {
      setRowData(null);
    }
  };

  useEffect(() => {
    if (isError) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
    }
  }, [isError]);

  const handleOpenSuccessModal = () => {
    openCallSuccessEvent((item) => !item);
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          position: "absolute",
          right: "65px",
          top: "190px",
        }}
      >
        {/* <Typography
          variant="h4"
          sx={{
            color: "#004186",
            fontWeight: "bold",
            fontSize: "16px !important",
          }}
        >
          {"Card Details"}
        </Typography> */}
        <ButtonBase
          onClick={handleOpenCard}
          sx={{
            ...formButtonStyle.mainButtonStyle,
            height: "42px",
          }}
        >
          <Typography>{"Add Card"}</Typography>
        </ButtonBase>
      </Grid>
      <Grid container justifyContent={"center"} pb={1} pt={3}>
        <TableContainer
          component={Paper}
          // className={classes.tableContainer}
          sx={{ maxHeight: "500px" }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
              // className={classes.headingBackground}
              >
                {columns.map((column) => (
                  <TableCell
                    align={"center"}
                    key={column.id}
                    className={classes.tableHeader}
                    style={{
                      padding: "10px",
                      minWidth: column.minWidth,
                    }}
                  >
                    <Typography
                      variant="h5"
                      className={classes.tableHeaderText}
                    >
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cardInfo &&
                cardInfo.map((row: any, index: any) => {
                  return (
                    <TableRow key={index} hover>
                      {columns.map((column) => (
                        <TableCell key={column.id} align={"center"}>
                          {column.id === "lastFour" ? (
                            <Box
                              sx={{
                                display: "flex",
                                gap: "5px",
                                justifyContent: "center",
                              }}
                            >
                              <Typography>{"**** **** ****"}</Typography>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {row[column.id]}
                              </Typography>
                            </Box>
                          ) : column.id === "name" ? (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {getFullName(
                                  row["cardHolderFirstName"],
                                  row["cardHolderLastName"]
                                )}
                              </Typography>
                            </Box>
                          ) : column.id === "action" ? (
                            <Grid>
                              <MoreVertIcon
                                sx={{ cursor: "pointer", width: "6vw" }}
                                onClick={(e) => handleClick(e, index)}
                              />
                              <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                                sx={{
                                  "& .css-3dzjca-MuiPaper-root-MuiPopover-paper-MuiMenu-paper":
                                    {
                                      boxShadow:
                                        "0px 1px 3px 0px rgba(0,0,0,0.1)",
                                    },
                                }}
                              >
                                <MenuItem
                                  className={rolesStyle.menuStyle}
                                  onClick={() => {
                                    handleRemoveCard(), setRowData(row);
                                  }}
                                >
                                  Remove
                                </MenuItem>
                              </Menu>
                            </Grid>
                          ) : (
                            <Box>
                              <Typography
                                variant="h5"
                                sx={{ color: "#000000" }}
                              >
                                {row[column.id]}
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {cardInfo && cardInfo.length === 0 && (
          <Typography p={1}>{"No cards available!"}</Typography>
        )}
        {!cardInfo && (
          <Grid container justifyContent={"center"}>
            <Loading />
          </Grid>
        )}
      </Grid>
      <Grid>
        {callSuccessEvent && (
          <EventSucessModal
            onClose={handleOpenSuccessModal}
            message="Card Added Successfully"
          />
        )}
      </Grid>

      <Grid>
        {openCard && (
          <PatientCardDetails
            open={openCard}
            handleClose={handleOpenCard}
            patientData={patientData}
          />
        )}
      </Grid>
      <Grid>
        {/* {
          <ConfirmationModal
            open={deleteDialog}
            handleClose={confirmationResult}
            message={"Are you sure you want to Delete"}
          />
        } */}
        <Dialog
          open={deleteDialog}
          onClose={handleRemoveCard}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          maxWidth="sm"
          sx={{
            padding: "20px",
          }}
          fullWidth
        >
          <Grid container p={2}>
            <Grid item xs={11} pt={1} pl={1}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {"Are you sure you want to remove this card!"}
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            ></Grid>
          </Grid>
          <DialogActions>
            <Grid sx={{ display: "flex", gap: "20px" }}>
              <Grid>
                <ButtonBase sx={css.cancel} onClick={handleRemoveCard}>
                  No
                </ButtonBase>
              </Grid>
              <Grid>
                <ButtonBase
                  sx={css.save}
                  onClick={() => {
                    confirmationResult();
                  }}
                >
                  Yes
                </ButtonBase>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

export default CardDetailsComponent;
