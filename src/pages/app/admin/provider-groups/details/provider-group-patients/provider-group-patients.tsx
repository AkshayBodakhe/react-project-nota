import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import { columns } from "./patients-table";
import {
  commonWidget,
  getCustomStyle,
  iconArrowWort,
  // navigateToDetails,
} from "../../../../../../styles/common";
import { adminConstants } from "../../../../../../constants/admin";
import moment from "moment";
import Loading from "../../../../../../components/common/spinner/loading";
import CustomPagination from "../../../../../../components/common/pagination";
import { PaginationState } from "../../../../../../components/common/enums-and-interfaces/interfaces";

const { INACTIVE, ACTIVE } = adminConstants;

const providerGroupPatientsStyles = {
  tableContainer: {
    overflowX: "auto",
    width: "100% !important",
    background: 'white'
  },

  tablePagination: {
    marginTop: "-20x !important",
    border: "none !important",
    background: 'white'
  },

  tableCell2: {
    align: "left",
    // paddingBottom: "16px",
    // paddingLeft: "9px",
    padding: '10px 10px',
    backgroundColor: "#DAEAF8 !important",
    position: "relative",
  },

  actionIcon: {
    cursor: "pointer",
  },

  providerContainer: {
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  },

  actionButton: {
    textTransform: "initial",
  },

  tableBodycell: {
    // color: "#1A1A1A80",
    // fontSize: "16px",
    fontSize: "0.875rem",
    padding: "5px 10px !important",
    cursor: "pointer",
  },
};

type Props = {
  patientsList: any[];
  pagination: [PaginationState, any];
  isLoading: boolean
}

const ProviderGroupPatients = (props: Props) => {
  const classes = commonWidget();
  const [pagination, setPagination] = props.pagination;
  // const [count, setCount] = useState(0);
  const [providerGroupPatients, setProviderGroupPatients] = useState<any[]>([]);

  useEffect(() => {
    const resultRows = props.patientsList?.map(
      (patient: any) => {
        return {
          id: patient.id,
          patientName: `${patient.legalFirstName} ${patient.legalLastName}`,
          contactNumber: patient.contactNumber || '-',
          birthDate: `${moment(patient.birthDate).format("DD-MM-yyyy")}` || '-',
          lastVisit: `${moment(patient.lastVisit).format("DD-MM-yyyy")}` || '-',
          providers: `${patient.user.firstName} ${patient.user.lastName}` || '-',
          providerGroupLocation: `${patient.location.name || '-'}, ${patient.location.physicalAddress.city || '-'}, ${patient.location.physicalAddress.state || '-'}`,
          status: <> <div>
            {patient.active ? (
              <span
                style={{
                  background: "#54913526",
                  color: "#549135",
                  padding: "4px 6px",
                }}
              >
                {ACTIVE}
              </span>
            ) : (
              <span
                style={{
                  background: "#FF000026",
                  color: "#FF3300",
                  padding: "4px 7px",
                }}
              >
                {INACTIVE}
              </span>
            )}
          </div>  </>
        }
      }
    );
    setProviderGroupPatients(resultRows);
    // setCount(pagination.totalElements);
  }, [props]);

  return (
    <React.Fragment>
      <Grid>
        <Grid>
          <TableContainer sx={providerGroupPatientsStyles.tableContainer}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow className={classes.tableHeadRowContainer}>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={getCustomStyle(column.id, 'patientName') ? 'left' : 'center'}
                      style={{
                        minWidth: column.minWidth,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {column.label}
                        {column.displaySort && (
                          <SyncAltIcon sx={iconArrowWort} />
                        )}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className={classes.tableHeadRowContainer}>
                {providerGroupPatients && !props.isLoading && providerGroupPatients.map((patient: any) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={patient?.id}
                    >
                      {columns.map((column) => {
                        return (
                          <TableCell
                            key={column.id}
                            sx={providerGroupPatientsStyles}
                            align={getCustomStyle(column.id, 'patientName') ? 'left' : 'center'}
                            style={{ cursor: "default", padding: '10px' }}
                          >
                            {patient[column.id]}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {props.isLoading && <Loading />}
            {providerGroupPatients?.length === 0 && !props.isLoading && (
              <div className={classes.noDataMsg}>No Data Available</div>
            )}
          </TableContainer>
        </Grid>
        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </Grid>
    </React.Fragment>
  );
};

export default ProviderGroupPatients;
