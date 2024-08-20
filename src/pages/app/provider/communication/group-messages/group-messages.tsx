import AddIcon from "@mui/icons-material/Add";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { Box, ButtonBase, Grid, Tab, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { formButtonStyle } from "../../../../../../src/styles/common";
import AppLayout from "../../../../../components/core/layout/layout";
import { providerConstants } from "../../../../../constants/provider";
import GroupList from "./group-list";
import OutgoingMessages from "./outgoing-messages";
import AddGroupMessages from "./add-group-messages";
import AddGroupList from "./add-group";
import CustomPagination from "../../../../../components/common/pagination";
import { PaginationState } from "../../../../../components/common/enums-and-interfaces/interfaces";
const { PROVIDER } = providerConstants;

function GroupMessages() {
  const [openGroupMessage, setOpenGroupMessage] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [open, setOpen] = useState(false);
  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [value, setValue] = React.useState("1");


  const paginationData = {
    page: 0,
    size: 10,
    sort: ["created,desc"],
    totalPages: 0,
    totalElements: 0,
  };

  const [msgPagination, setMsgPagination] = useState<any>(paginationData);
  useEffect(() => {
    setMsgPagination(paginationData);
  }, [value]);
  return (
    <>
      <Grid
        container
        sx={{
          background: "#FFFFFF",
          boxShadow: "0px 0px 8px #00000029",
          borderRadius: "5px",
          opacity: 1,
        }}
        p={2}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Group Messages
            </Typography>
          </Grid>
          <Grid item>
            {value == "1" && (
              <ButtonBase
                sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                onClick={() => setOpenGroupMessage(true)}
              >
                Send Group Messages
              </ButtonBase>
            )}
            {value == "2" && (
              <ButtonBase
                sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                onClick={() => setOpen(true)}
              >
                <AddIcon />
                Create Group
              </ButtonBase>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab
                    style={{ textTransform: "capitalize", fontSize: "16px" }}
                    label="Outgoing Messages"
                    value="1"
                  ></Tab>
                  <Tab
                    style={{ textTransform: "capitalize", fontSize: "16px" }}
                    label="Group List"
                    value="2"
                  />
                </TabList>
              </Box>
            </TabContext>
          </Box>
        </Grid>
        <Grid item xs={12} mt={2}>
          {value == "1" && (
            <OutgoingMessages
              isRefetch={refetch}
              setPaginationData={setMsgPagination}
              pagination={msgPagination}
            />
          )}
          {value == "2" && (
            <GroupList
              isRefetch={refetch}
              setPaginationData={setMsgPagination}
              pagination={msgPagination}
            />
          )}
        </Grid>
        {openGroupMessage && (
          <AddGroupMessages
            title={"Group Message"}
            source="Add"
            open={openGroupMessage}
            setOpen={setOpenGroupMessage}
            refetch={() => setRefetch(true)}
          />
        )}
        {open && (
          <AddGroupList
            title={"Add Group"}
            source="Add"
            open={open}
            onClose={() => {
              setOpen(false);
            }}
            refetch={() => setRefetch(true)}
          />
        )}
      </Grid>
      <CustomPagination
        pagination={msgPagination}
        setPagination={setMsgPagination}
      />
    </>
  );
}

export default AppLayout(GroupMessages, { source: PROVIDER });
