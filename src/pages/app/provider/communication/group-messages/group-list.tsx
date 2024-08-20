import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import {
  Column,
  PaginationState,
} from "../../../../../components/common/enums-and-interfaces/interfaces";
import CommonTable from "../../../../../components/common/table";
import { useCommunicationControllerServiceGetGroups } from "../../../../../sdk/thinkemr-core-0.0.1/queries";
import { ActionType } from "../../../../../components/common/enums-and-interfaces/enums";
import AddGroupList from "./add-group";
import { DeleteDialog } from "../../../../../components/core/delete-dialog";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../store/features/common-actions/snackbar/alertSlice";
import { CommunicationControllerService } from "../../../../../sdk/thinkemr-core-0.0.1/requests";
import { useSelector } from "react-redux";
const columns: Column[] = [
  {
    id: "groupName",
    label: "Group Name",

    displaySort: false,
    align: "left",
  },
  {
    id: "createdBy",
    label: "Created By",

    displaySort: false,
    align: "left",
  },
  {
    id: "dateTime",
    label: "Created On",

    displaySort: false,
    align: "left",
  },
  {
    id: "patients",
    label: "Number Of Patients",

    displaySort: false,
    align: "left",
  },
  { id: "action", label: "Action", displaySort: false },
];

interface GroupProps {
  isRefetch: any;
  setPaginationData: any;
  pagination: any
}

function GroupList(props: GroupProps) {
  const { isRefetch, setPaginationData,pagination } = props;
  const dispatch = useDispatch();
  const [groupList, setGroupList] = useState([]);
  const [editData, setEditTaskData] = useState<any>("");
  const [groupData, setGroupData] = useState<any>("");
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup;
  const { data, isSuccess, refetch, isLoading } =
    useCommunicationControllerServiceGetGroups({
      providerGroupUuid,
     ...pagination
    });

  const [modal, setModal] = useState({
    type: "",
    open: false,
  });

  useEffect(() => {
    if (editData) {
      getGropList(editData?.uuid);
    }
  }, [editData]);

  const getGropList = async (uuid: any) => {
    const data = await CommunicationControllerService.getGroup(uuid);
    setGroupData(data);
  };

  useEffect(() => {
    if (isSuccess && !!data) {
      const getData = data?.data?.content.map((data: any) => {
        return {
          uuid: data.uuid,
          groupName: data.name,
          createdBy: data.createdBy,
          dateTime: data.createdOn,
          patients: data.patientCount,
          action: ActionType.ACTION_WITH_MOREVERTICON,
        };
      });
      setGroupList(getData);
      setPaginationData((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [isSuccess, data]);


  useEffect(() => {
    if (isRefetch) {
      refetch();
    }
  }, [isRefetch]);

  const handleAction = (type: string, event: any) => {
    setEditTaskData(event);
    setModal({ open: true, type: type });
  };

  const handleClose = () => {
    setModal({ open: false, type: "" });
  };

  const deleteTask = async () => {
    handleClose();
    let response = await CommunicationControllerService.deleteGroup(
      editData.uuid
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
      <Grid item xs={12}>
        <CommonTable
          columns={columns}
          maxHeight="600px"
          options={["Edit", "Delete"]}
          isLoading={isLoading}
          tableData={groupList}
          handleStatusChange={handleAction}
          handleActionClick={handleAction}
        />
      </Grid>
      {modal.open &&
        (() => {
          switch (modal.type) {
            case "Add":
              return (
                <AddGroupList
                  open={modal.open}
                  onClose={handleClose}
                  title="Add Group"
                  refetch={refetch}
                />
              );
            case "Edit":
              return (
                <AddGroupList
                  open={modal.open}
                  onClose={handleClose}
                  title="Edit Group"
                  refetch={refetch}
                  editData={groupData}
                />
              );
            case "Delete":
              return (
                <DeleteDialog
                  open={modal.open}
                  onClose={handleClose}
                  onEventSuccessModalOpen={deleteTask}
                  title={"Delete Task"}
                  message={"Group"}
                />
              );
            default:
              return <></>;
          }
        })()}
    </>
  );
}

export default GroupList;
