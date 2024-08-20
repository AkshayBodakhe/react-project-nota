import { Box, CssBaseline, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect } from "react";
import theme from "../../../../theme";
import { useProviderGroupControllerServiceUpdateStatus } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import { useDispatch } from "react-redux";
import {
  Column,
  ErrorResponseEntity,
} from "../../../common/enums-and-interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import CommonTable from "../../../common/table";

export const adminTable = makeStyles(
  (theme) => ({
    tableHeader: {
      //height: "50px",
      //width: "100%",
      padding: "10px !important",
      background: "#FFC77B33 !important",
      color: "#1A1A1A99",
      boxShadow: "none !important",
      opacity: 1,
    },
    tableHeadRowContainer: {
      "& th": {
        backgroundColor: "#E7E7E7 !important",
        borderBottom: "none",
        fontSize: "14px",
        fontWeight: "600",
        padding: "8px 10px !important",
        color: "#1A1A1A99 !important",
      },

      "& td": {
        padding: "10px 10px !important",
        fontSize: "0.875rem",
      },
    },
    tableRowCell: {
      padding: "5px 10px !important",
      fontWeight: "bold !important",
      color: "#1A1A1ACC !important",

      [theme.breakpoints.down("xl")]: {
        padding: "1px 2px !important",
      },
    },
    tableBody: {
      background: "#F5F6F9 !important",
    },
    auditRowCell: {
      padding: "10px 15px !important",
    },
    successStatus: {
      background: "#549135",
      display: "flex",
      justifyContent: "center",
      color: "white",
      borderRadius: "20px",
      padding: "5px 5px",
    },
    failStatus: {
      background: "#FF3300",
      display: "flex",
      justifyContent: "center",
      color: "white",
      borderRadius: "20px",
      padding: "5px 5px",
    },
  }),
  { defaultTheme: theme }
);

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

const sxs = {
  tableContainer: {
    backgroundColor: "white",
    padding: "0.5%",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 6px #00000029",
    borderRadius: "10px",
    opacity: "1",
  },
  viewMore: {
    color: "#1B5984",
    fontWeight: 600,
    mt: 1,
    display: "flex",
    justifyContent: "end",
    mr: 1,
    fontSize: "16px",
    cursor: "pointer",
  },
};

interface ReusableTableProps {
  columns: Column[];
  setProviderGroupList?: any;
  rows: Row[];
  isLoading: boolean;
  countData?: any;
  source?: string;
  page?: any;
  rowsPerPage?: any;
  setPage?: any;
  refetch?:any;
}

export const CatalogTable: React.FC<ReusableTableProps> = ({
  columns,
  rows,
  isLoading,
  setProviderGroupList,
  refetch,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutateAsync, isError, error } =
    useProviderGroupControllerServiceUpdateStatus();

  useEffect(() => {
    if ((error as ErrorResponseEntity)?.body.message)
      dispatch(
        alertAction.setAlert({
          open: true,
          message: (error as ErrorResponseEntity).body.message,
          severity: "error",
        })
      );
  }, [isError]);

  const handleSwitchChange = async (providerGroup: any, event: any) => {
    setProviderGroupList((prev: any) => {
      return prev.map((res: any) => {
        if (res.uuid === providerGroup.uuid) {
          return {
            ...res,
            status: event.target.checked,
          };
        }
        return res;
      });
    });

    try {
      mutateAsync({
        status: event.target.checked,
        uuid: providerGroup.uuid,
      }).then((res: any) => {
        refetch();
        dispatch(
          alertAction.setAlert({
            open: true,
            message: res.message,
            severity: "success",
          })
        );
      });
    } catch (error) {}
  };

  return (
    <Box sx={sxs.tableContainer}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          mt: 0,
          display: "flex",
          alignContent: "center",
          justifyContent: "space-between",
        }}
      >
        <span>Provider Groups</span>
        <Box
          sx={sxs.viewMore}
          onClick={() => {
            navigate("/admin/provider-groups");
          }}
        >
          View all
        </Box>
      </Typography>
      <CssBaseline />
      <Paper elevation={0}>
        <CommonTable
          columns={columns}
          isAdmin={true}
          maxHeight={"300px"}
          handleActionClick={() => {}}
          handleStatusChange={(data: any, event: any) =>
            handleSwitchChange(data, event)
          }
          tableData={rows}
          isLoading={isLoading}
        />
      </Paper>
    </Box>
  );
};
