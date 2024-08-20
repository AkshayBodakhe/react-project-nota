import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {
  ButtonBase,
  Grid,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLoggedInUser } from "../../../../../components/common/enums-and-interfaces/common-functions";
import { ActionType } from "../../../../../components/common/enums-and-interfaces/enums";
import { Column } from "../../../../../components/common/enums-and-interfaces/interfaces";
import CustomPagination from "../../../../../components/common/pagination";
import CommonTable from "../../../../../components/common/table";
import { DeleteDialog } from "../../../../../components/core/delete-dialog";
import AppLayout from "../../../../../components/core/layout/layout";
import { adminConstants } from "../../../../../constants/admin";
import { useContactDirectoryControllerServiceGetAllContactDirectory } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  ContactDirectory,
  ContactDirectoryControllerService,
} from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { formButtonStyle } from "../../../../../styles/common";
import { style } from "../../referral/style/common-style";
import AddEditContact from "./add-edit-contact";
const { PROVIDER } = adminConstants;
const contactDirectoryType = ContactDirectory.contactType;
const css = {
  container: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 8px #00000029",
    opacity: 1,
  },
};

const columns: Column[] = [
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "type",
    label: "Contact Type",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  {
    id: "address",
    label: "Address",
    minWidth: 80,
    displaySort: false,
    align: "left",
  },
  {
    id: "contact",
    label: "Contact",
    minWidth: 100,
    displaySort: false,
    align: "left",
  },
  { id: "fax", label: "Fax", minWidth: 100, displaySort: false, align: "left" },
  {
    id: "email",
    label: "Email",
    minWidth: 80,
    displaySort: false,
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 80,
    displaySort: false,
    align: "left",
  },
];

function ContactDictionary() {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 50,
      },
    },
  };
  const classes = style();
  const dispatch = useDispatch();
  const [contact, setContact] = useState<any>("");
  const [contactData, setContactData] = useState<any>("");
  const [tableData, setTableData] = useState<any[]>([]);
  const [searchString, setsearchString] = useState("");
  const [modal, setModal] = useState({
    type: "",
    open: false,
  });
  const [contactType, setContactType] = useState<any>([]);
  const [pagination, setPagination] = useState<any>({
    page: 0,
    size: 10,
    sort: ["created,desc"],
    sortBy: "",
    searchString: "",
    totalPages: 0,
    totalElements: 0,
    sortDirection: "",
    status: true,
    state: "",
  });
  const { data, isSuccess, refetch, isLoading } =
    useContactDirectoryControllerServiceGetAllContactDirectory({
      providerGroupUuid: getLoggedInUser()?.providerGroup,
      contactType: contact == "ALL" ? null : contact,
      ...pagination,
      searchString: searchString,
    });

  useEffect(() => {
    const type = Object.values(contactDirectoryType) as string[];
    setContactType(type);
  }, []);

  useEffect(() => {
    if (isSuccess && !!data) {
      const contactDir = data?.data?.content.map((contact: any) => {
        return {
          id: contact.id,
          uuid: contact.uuid,
          name: contact.name,
          type: contact.contactType,
          address: contact.address,
          contact: contact.contact,
          fax: contact.fax,
          email: contact.email,
          action: ActionType.ACTION_WITH_MOREVERTICON,
        };
      });
      setTableData(contactDir);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [isSuccess, data]);

  const handleAction = (action: string, editData: any) => {
    setContactData(editData);
    setModal({ open: true, type: action });
  };

  const handleClose = () => {
    setContactData({});
    setModal({ open: false, type: "" });
  };

  const deleteTask = async () => {
    handleClose();
    let response =
      await ContactDirectoryControllerService.deleteContactDirectory(
        contactData?.uuid
      );
    if (response?.message) {
      refetch();
      dispatch(
        alertAction.setAlert({
          open: true,
          message: response?.message as unknown as string,
          severity: "success",
        })
      );
    }
  };

  return (
    <>
      <Grid container sx={css.container}>
        <Grid item container p={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Grid item>
                <Typography
                  variant="h3"
                  sx={{ color: "#1A1A1ACC", fontWeight: "bold" }}
                >
                  Contact Directory
                </Typography>
              </Grid>
              <Grid item>
                <Grid container gap={"10px"} alignItems={"center"}>
                  <Grid item>
                    <Select
                      className={[classes.selectInputStyle].join(" ")}
                      sx={{ width: "270px" }}
                      value={contact}
                      name="contactType"
                      onChange={(e: any) => setContact(e.target.value)}
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <span>
                              <Typography
                                variant="h5"
                                sx={{
                                  color: "#1A1A1A80 !important",
                                }}
                              >
                                Select Contact Type
                              </Typography>
                            </span>
                          );
                        }
                        return <Typography variant="h5">{selected}</Typography>;
                      }}
                      MenuProps={MenuProps}
                      displayEmpty
                    >
                      {contactType?.map((data: any) => {
                        return (
                          <MenuItem
                            value={data}
                            className={classes.menuItemColorStyle}
                          >
                            {data}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Grid>
                  <Grid item>
                    <Paper component="form" className={classes.paperSearch}>
                      <InputBase
                        className={classes.inputBase}
                        placeholder="Search by name, type, address"
                        value={searchString}
                        onChange={(e) => setsearchString(e.target.value)}
                      />
                      <IconButton
                        type="button"
                        className={classes.iconButton}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>
                  <Grid item>
                    <ButtonBase
                      sx={{
                        ...formButtonStyle.saveButtonStyle,
                        height: "42px",
                      }}
                      onClick={() => setModal({ open: true, type: "Add" })}
                    >
                      <AddIcon />
                      Add Contact
                    </ButtonBase>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CommonTable
              columns={columns}
              maxHeight="600px"
              options={["Edit", "Delete"]}
              isLoading={isLoading}
              tableData={tableData}
              handleStatusChange={handleAction}
              handleActionClick={handleAction}
            />
          </Grid>
        </Grid>
        {modal.open &&
          (() => {
            switch (modal.type) {
              case "Add":
              case "Edit":
                return (
                  <AddEditContact
                    open={modal.open}
                    onClose={handleClose}
                    title={contactData.uuid ? "Edit Contact" : "Add Contact"}
                    editData={contactData}
                    refetch={refetch}
                  />
                );
              case "Delete":
                return (
                  <DeleteDialog
                    open={modal.open}
                    onClose={handleClose}
                    onEventSuccessModalOpen={deleteTask}
                    title={"Delete Contact"}
                    message={"contact"}
                  />
                );
              default:
                return <></>;
            }
          })()}
      </Grid>
      <Grid item xs={12}>
        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </Grid>
    </>
  );
}

export default AppLayout(ContactDictionary, { source: PROVIDER });
