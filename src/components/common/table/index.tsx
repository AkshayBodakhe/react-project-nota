import { Table, TableContainer } from "@mui/material";
import React from "react";
import TableHeadComponent from "./table-head-component";
import TableBodyComponent from "./table-body-component";
import { TableProps } from "../enums-and-interfaces/interfaces";
import Loading from "../spinner/loading";
import { commonWidget } from "../../../styles/common";

const CommonTable = (props: TableProps) => {
  const {
    columns,
    tableData,
    isLoading,
    handleStatusChange,
    handleActionClick,
    maxHeight,
    navigateToChildren,
    isAdmin,
    options,
  } = props;

  const classes = commonWidget();

  return (
    <React.Fragment key={"CommonTable"}>
      <TableContainer
        sx={{
          maxHeight: `${maxHeight || "600px"} !important`,
          overflowY: "auto !important",
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHeadComponent isAdmin={isAdmin} columns={columns} />
          <TableBodyComponent
            isAdmin={isAdmin}
            columns={columns || []}
            isLoading={isLoading}
            options={options}
            tableData={tableData || []}
            handleActionClick={handleActionClick}
            handleStatusChange={handleStatusChange}
            navigateToChildren={navigateToChildren}
          />
        </Table>
        {isLoading && <Loading />}
        {tableData?.length === 0 && !props.isLoading && (
          <div className={classes.noDataMsg}>No Data Available</div>
        )}
      </TableContainer>
    </React.Fragment>
  );
};

export default CommonTable;
