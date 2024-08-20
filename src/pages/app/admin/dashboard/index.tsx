/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Dashboard from "./dashboard";
import AppLayout from "../../../../components/core/layout/layout";
import { adminConstants } from "../../../../constants/admin";
import {
  CatalogTable,
  Row,
} from "../../../../../src/components/core/layout/table/adminTable";
import { useEffect, useState } from "react";
import Graphs from "./graphs/graphs";
import { useProviderGroupControllerServiceGetAllProviderGroups } from "../../../../sdk/thinkemr-core-0.0.1/queries";
import {
  Column,
  PaginationState,
} from "../../../../components/common/enums-and-interfaces/interfaces";
import { StatusType } from "../../../../components/common/enums-and-interfaces/enums";
import { Typography } from "@mui/material";
const { ADMIN } = adminConstants;

export const dashboardcolumns: Column[] = [
  { id: "id", label: "Group ID", minWidth: 100, align: "left" },
  { id: "name", label: "Provider Group Name", minWidth: 200, align: "left" },
  {
    id: "isMultiSpeciality",
    label: "Speciality",
    minWidth: 150,
    align: "left",
  },
  {
    id: "providerCount",
    label: "Provider Count",
    minWidth: 70,
    align: "center",
  },
  { id: "patientCount", label: "Patient Count", minWidth: 70, align: "center" },
  { id: "status", label: "Status", minWidth: 50, align: "center" },
];

function AdminDashboardPage() {
  const [providerData, setProviderData] = useState<Row[]>([]);
  const [page, setPage] = useState(0);
  const [tableRowPerPage] = useState(10);
  const [pagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "created",
    sortDirection: "desc",
    searchString: "",
    state: "",
    totalPages: 0,
    totalElements: 0,
  });

  const { data, isLoading,refetch } =
    useProviderGroupControllerServiceGetAllProviderGroups({
      page: pagination.page,
      size: pagination.size,
      sortBy: pagination.sortBy,
      sortDirection: pagination.sortDirection,
      searchString: pagination.searchString,
      state: pagination.state,
    });

  useEffect(() => {
    if (data?.data && data.data?.content) {
      const newRows = data.data?.content.map((providerGroup: any) => {
        return {
          id: providerGroup.id,
          uuid: providerGroup.uuid,
          active: providerGroup.active,
          name: providerGroup.name,
          schema: providerGroup.schema,
          specialities: providerGroup.specialities.map(
            (state: any) => state.name
          ),
          isMultiSpeciality:
            providerGroup.specialities?.length > 1
              ? "Multi-Speciality"
              : providerGroup.specialities[0]?.name,
          phone: providerGroup.phone,
          website: providerGroup.website,
          providerCount: providerGroup.providerCount,
          patientCount: providerGroup.patientCount,
          address: `${providerGroup.physicalAddress.line1}`,
          state:
            providerGroup.physicalAddress.state.charAt(0).toUpperCase() +
            providerGroup.physicalAddress.state.slice(1).toLowerCase(),
          status: StatusType.TOGGLE_BTN,
        };
      });
      setProviderData(newRows);
    }
    //setCount(providerGroupsList?.totalElements);
    //setTotalElement(providerGroupsList?.totalElements);
  }, [data?.data]);

  return (
    <div>
      <Dashboard />
      <Graphs />
      <CatalogTable
        columns={dashboardcolumns}
        rows={providerData}
        setProviderGroupList={setProviderData}
        page={page}
        isLoading={isLoading}
        rowsPerPage={tableRowPerPage}
        setPage={setPage}
        countData={15}
        refetch={refetch}
      />
    </div>
  );
}
export default AppLayout(AdminDashboardPage, { source: ADMIN });
