/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AuthorizationTable from "../authorization-tab/authorization-table";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { authorizationdata } from "../../../../../../../../mock-data/authorizationtabledetails";
export const indexStyle = makeStyles(() => ({
  body: {
    height: "100%",
    // overflowY: "scroll",
    // overflowX: "scroll",
  },
}));

export interface Row {
  [key: string]: string | JSX.Element | number | any;
}

export interface Column {
  id: string;
  label: string | JSX.Element;
  minWidth?: number;
}
export const authorizationFormColumns: Column[] = [
  { id: "authorization", label: "Authorization", minWidth: 100 },
  { id: "procedurecodes", label: "Procedure Codes", minWidth: 100 },
  { id: "startdate", label: "Start Date", minWidth: 100 },
  { id: "enddate", label: "End Date", minWidth: 100 },
  { id: "speciality", label: "Speciality", minWidth: 100 },
  { id: "visitapproved", label: "Visit Approved", minWidth: 100 },
  { id: "visitremaining", label: "Visit Remaining", minWidth: 100 },
  { id: "notes", label: "Notes", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 100 },
];

function createAuthorizationForms(
  authorization: string,
  procedurecodes: string,
  startdate: string,
  enddate: string,
  speciality: string,
  visitapproved: string,
  visitremaining: string,
  notes: string,
  status: boolean
): Row {
  return {
    authorization,
    procedurecodes,
    startdate,
    enddate,
    speciality,
    visitapproved,
    visitremaining,
    notes,
    status,
  };
}

function AuthorizationTab() {
  const classes = indexStyle();
  const [activeAuthorizationData, setActiveAuthorizationData] = useState<Row[]>(
    []
  );
  const [expiredAuthorizationData, setExpiredAuthorizationData] = useState<
    Row[]
  >([]);

  useEffect(() => {
    const newRows = authorizationdata?.content.map((data: any) => {
      return createAuthorizationForms(
        data.authorization,
        data.procedurecodes,
        data.startdate,
        data.enddate,
        data.speciality,
        data.visitapproved,
        data.visitremaining,
        data.notes,
        data.status
      );
    });

    const activeData = newRows.filter((res) => res.status === true);
    const expiredData = newRows.filter((res) => res.status === false);
    setActiveAuthorizationData(activeData);
    setExpiredAuthorizationData(expiredData);
  }, []);
  return (
    <>
      <Grid className={classes.body}>
        <AuthorizationTable
          title="Insurance Authorization"
          authorizationData={activeAuthorizationData}
          authorizationFormColumns={authorizationFormColumns}
        />
        <AuthorizationTable
          title="Expired Authorization"
          authorizationData={expiredAuthorizationData}
          authorizationFormColumns={authorizationFormColumns}
        />
      </Grid>
    </>
  );
}

export default AuthorizationTab;
