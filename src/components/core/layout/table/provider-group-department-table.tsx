import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import DepartmentModal from "../../../common/modal/department-modal";
import providerGroupService from "../../../../service/provider-group--service";
import { Enums } from "../../../../pages/app/admin/provider-groups/common-files/enums";
import { useDispatch } from "react-redux";
import {
  Column,
  PaginationState,
} from "../../../common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../store/features/common-actions/snackbar/alertSlice";
import CommonTable from "../../../common/table";
import {
  ActionType,
  StatusType,
} from "../../../common/enums-and-interfaces/enums";
import CustomPagination from "../../../common/pagination";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const columns: Column[] = [
  {
    id: "deptId",
    label: "Department ID",
    minWidth: 30,
    displaySort: false,
    align: "left",
  },
  {
    id: "name",
    label: "Department Name",
    minWidth: 120,
    displaySort: false,
    align: "left",
  },
  {
    id: "admin",
    label: "Department Admin",
    minWidth: 120,
    displaySort: false,
    align: "left",
  },
  {
    id: "contact",
    label: "Contact Number",
    minWidth: 120,
    displaySort: false,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 40,
    displaySort: false,
    align: "center",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 40,
    displaySort: false,
    align: "center",
  },
];

type Props = {
  departmentList: any[];
  refetch: any;
  pagination: PaginationState;
  setPagination: any;
  isLoading: boolean;
};

export default function ProviderGroupDepartmentTable(props: Props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [editDepartment, setEditDepartment] = useState("");
  const [departmentList, setDepartmentList] = useState<any[]>([]);
  const [providerGroupSchema] = useState<any>(
    localStorage.getItem(Enums.PROVIDER_GROUP_KEY) || ""
  );

  let { id: providerGroupUuid } = useParams();
  if (!providerGroupUuid) {
    const providerInfo = useSelector(
      (state: any) => state.commonReducer.userDetail?.data
    );
    providerGroupUuid = providerInfo?.providerGroup || "";
  }

  const handleEdit = (department: any) => {
    setOpen(true);
    setEditDepartment(department);
  };

  const handleStatusChange = (e: any, department: any) => {
    setDepartmentList((prev: any) => {
      return prev.map((res: any) => {
        if (res.uuid === department.uuid) {
          return {
            ...res,
            active: e.target.checked,
          };
        }
        return res;
      });
    });

    department.active = e.target.checked;

    try {
      providerGroupService
        .updateStatus(providerGroupSchema, department.uuid, e.target.checked)
        .then((res: any) => {
          if (res?.status >= 200 && res.status <= 299) {
            setOpen(false);
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data.message,
                severity: "success",
              })
            );
          } else
            dispatch(
              alertAction.setAlert({
                open: true,
                message: res.data?.message || "",
                severity: "error",
              })
            );
        });
      // providerGroupService.addEditDepartment(providerGroupSchema, department, 'UPDATE').then(() => {
      //   setOpen(false);
      // })
    } catch (_error) {}
  };

  useEffect(() => {
    const newRows = props.departmentList?.map((department: any) => {
      return {
        id: department.id,
        uuid: department.uuid,
        deptId: department.deptId,
        active: department.active,
        name: department.name,
        adminId: department.adminId,
        admin: `${department.adminId.firstName} ${department.adminId.lastName}`,
        contact: department.contact || "",
        status: StatusType.TOGGLE_BTN,
        action: ActionType.ACTION_WITH_EDIT_BTN,
      };
    });
    setDepartmentList(newRows);
  }, [props]);

  return (
    <React.Fragment key={"ProviderGroups"}>
      <Paper elevation={0}>
        <CommonTable
          isAdmin={true}
          columns={columns}
          tableData={departmentList}
          isLoading={props.isLoading}
          handleStatusChange={(data: any, event: any) =>
            handleStatusChange(event, data)
          }
          handleActionClick={(department: any) => handleEdit(department)}
        />
      </Paper>
      <CustomPagination
        pagination={props.pagination}
        setPagination={props.setPagination}
      />
      <DepartmentModal
        open={[open, setOpen]}
        editDepartment={editDepartment}
        onClose={props.refetch}
        providerGroupUuid={providerGroupUuid as string}
      />
    </React.Fragment>
  );
}
