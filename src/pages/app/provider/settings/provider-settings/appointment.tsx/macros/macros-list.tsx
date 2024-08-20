import { Paper } from "@mui/material";
import React from "react";
import CustomPagination from "../../../../../../../components/common/pagination";
import CommonTable from "../../../../../../../components/common/table";
import { Column } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import ActionMenu, {
  menuItem,
} from "../../../../../../../components/common/table/action-menu";
interface MacrosListProps {
  data: any[];
  handleEdit: (data: any) => void;
  setPagination: (data: any) => void;
  pagination: any;
  handleView: (data: any) => void;
  handleDelete: (data: any) => void;
}
const MacrosList = ({
  data,
  handleEdit,
  pagination,
  setPagination,
  handleView,
  handleDelete,
}: MacrosListProps) => {
  const menuItems: menuItem[] = [
    {
      itemName: "View",
      fun: handleView,
    },
    {
      itemName: "Edit",
      fun: handleEdit,
    },
    {
      itemName: "Delete",
      fun: handleDelete,
    },
  ];
  const columns: Column[] = [
    { id: "templateName", label: "Title", minWidth: 100, align: "left" },
    { id: "created", label: "Created By", minWidth: 200, align: "left" },
    {
      id: "action",
      label: "Action",
      minWidth: 200,
      align: "left",
      render: (_val: any, rowData: any) => (
        <ActionMenu menuItems={menuItems} rowData={rowData} />
      ),
    },
  ];

  return (
    <React.Fragment key={"CommonTable"}>
      <Paper elevation={0}>
        <CommonTable
          isAdmin={true}
          columns={columns}
          tableData={data}
          isLoading={false}
        />
      </Paper>
      <CustomPagination pagination={pagination} setPagination={setPagination} />
    </React.Fragment>
  );
};

export default MacrosList;
