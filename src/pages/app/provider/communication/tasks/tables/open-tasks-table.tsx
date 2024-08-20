import AddIcon from "@mui/icons-material/Add";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  // Avatar,
  // IconButton,
  // Menu,
  // MenuItem,
  // Paper,
  // Table,
  // TableBody,
  // TableCell,
  // TableContainer,
  // TableHead,
  // TablePagination,
  // TableRow,
  ButtonBase,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ActionType } from "../../../../../../components/common/enums-and-interfaces/enums";
import {
  Column,
  PaginationState,
} from "../../../../../../components/common/enums-and-interfaces/interfaces";
import CommonTable from "../../../../../../components/common/table";
import { DeleteDialog } from "../../../../../../components/core/delete-dialog";
import { useTasksControllerServiceGetAllTask } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { TasksControllerService } from "../../../../../../sdk/thinkemr-core-0.0.1/requests";
import { formButtonStyle } from "../../../../../../styles/common";
import AddEditTask from "../add-edit-task";
import Filter from "../filter";
import { useDispatch } from "react-redux";
import { alertAction } from "../../../../../../store/features/common-actions/snackbar/alertSlice";
import CustomPagination from "../../../../../../components/common/pagination";
import { useSelector } from "react-redux";

const columns: Column[] = [
  { id: "date", label: "Date", minWidth: 100, displaySort: false },
  // { id: "type", label: "Task Type", minWidth: 150, displaySort: false },
  { id: "assignBy", label: "Assign By", minWidth: 100, displaySort: false },
  { id: "title", label: "Task Title", minWidth: 180, displaySort: false },
  { id: "assignTo", label: "Assign To", minWidth: 100, displaySort: false },
  {
    id: "patientName",
    label: "Patient Name",
    minWidth: 180,
    displaySort: false,
  },
  { id: "due", label: "Due Date", minWidth: 150, displaySort: false },
  { id: "status", label: "Status", minWidth: 100, displaySort: false },
  { id: "priority", label: "Priority", minWidth: 100, displaySort: false },
  { id: "action", label: "Action", minWidth: 50, displaySort: false },
];

const sxs = {
  iconArrowWort: {
    marginBottom: "-2px",
    // marginTop: '6px',
    fontSize: "14px",
    transform: "rotate(90deg)",
    color: "#4C4C4CCC",
    cursor: "pointer",
    // marginLeft: '2px',
  },
  heading: {
    margin: "10px 0 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchBoxWidth: {
    width: "20rem",
    background: "white",
    "@media (max-width: 820px)": {
      width: "100% !important",
    },
    "@media (max-width: 768px)": {
      width: "100% !important",
    },
  },
  avatarStyle: {
    width: "32px !important",
    height: "32px !important",
  },
};

function OpenTasksTable() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [editTaskData, setEditTaskData] = useState<any>("");
  const [getFilters, setFilters] = useState({
    patientName: "",
    type: undefined,
    priority: undefined,
    dueDate: undefined,
    status: undefined,
  });
  if (!isFilterVisible) {
    (getFilters.patientName = ""),
      (getFilters.type = undefined),
      (getFilters.priority = undefined),
      (getFilters.dueDate = undefined),
      (getFilters.status = undefined);
  }
  const providerDetail = useSelector(
    (state: any) => state.commonReducer?.userDetail?.data
  );
  const providerGroupUuid = providerDetail?.providerGroup || "";
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    sortBy: "",
    searchString: "",
    totalPages: 0,
    totalElements: 0,
    sortDirection: "",
    status: true,
    state: "",
  });

  const pageable = {
    page: pagination.page,
    size: pagination.size,
    sort: [""],
  };

  const { data, refetch, isSuccess, isLoading } =
    useTasksControllerServiceGetAllTask({
      providerGroupUuid,
      page: pagination.page,
      size: pagination.size,
      sort: ["created,desc"],

      patientName: getFilters?.patientName,
      // type:
      //   getFilters.type != "ALL" && isFilterVisible ? getFilters.type : undefined,
      priority:
        getFilters.priority != "ALL" && isFilterVisible
          ? getFilters.priority
          : undefined,
      dueDate:
        getFilters.dueDate != "ALL" && isFilterVisible
          ? getFilters.dueDate
          : undefined,
      status:
        getFilters.status != "ALL" && isFilterVisible
          ? getFilters.status
          : undefined,
    });

  useEffect(() => {
    refetch();
  }, [isFilterVisible]);

  const dispatch = useDispatch();
  const [modal, setModal] = useState({
    type: "",
    open: false,
  });

  const showFilters = () => {
    setFilterVisible(!isFilterVisible);
  };

  const formatDate = (inputDate: any) => {
    const parsedDate = new Date(inputDate);

    const month = parsedDate.getMonth() + 1;
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();

    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const formattedDate = `${formattedMonth}-${formattedDay}-${year}`;
    return formattedDate;
  };

  useEffect(() => {
    if (isSuccess && !!data) {
      const getData = data?.data?.content.map((task: any) => {
        return {
          uuid: task.uuid,
          date: formatDate(task?.createdDate),
          type: task.taskType,
          assignBy: task?.assignedBy?.firstName
            ? `${task?.assignedBy?.firstName} ${task?.assignedBy?.lastName}`
            : "-",
          title: task?.taskTitle ? task.taskTitle : "-",
          assignTo: {
            id: task?.assignedTO?.uuid,
            name: task?.assignedTO?.firstName
              ? `${task?.assignedTO?.firstName} ${task?.assignedTO?.lastName}`
              : "-",
          },
          patientName: {
            id: task?.patient?.uuid,
            name: task?.patient?.firstName
              ? `${task?.patient?.firstName} ${task?.patient?.lastName}`
              : "-",
          },
          due: formatDate(task.dueDate),
          status: task.status,
          priority: task.priority,
          note: task?.note,
          action: ActionType.ACTION_WITH_MOREVERTICON,
        };
      });
      setTaskList(getData);
      setPagination((prev: any) => ({
        ...prev,
        totalPages: data?.data?.totalPages,
        totalElements: data?.data?.totalElements,
      }));
    }
  }, [isSuccess, data]);

  const deleteTask = async () => {
    handleClose();
    let response = await TasksControllerService.deleteTask(editTaskData?.uuid);
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

  const handleClose = () => {
    setModal({ open: false, type: "" });
  };

  const handleAction = (type: string, event: any) => {
    setEditTaskData(event);
    setModal({ open: true, type: type });
  };

  const openModel = () => {
    setModal({ open: true, type: "Add" });
  };

  return (
    <>
      <Grid container sx={{ background: "#fff" }}>
        <Grid item container xs={12} p={2} spacing={2}>
          <Grid item container justifyContent={"space-between"}>
            <Grid item sx={{ ...sxs.heading, margin: "0px" }}>
              <Typography variant="h2">Tasks</Typography>
            </Grid>
            <Grid item>
              <Grid container gap={"20px"}>
                <Grid item>
                  <ButtonBase
                    sx={{
                      color: "#36588C",
                      border: "1px solid #36588C",
                      borderRadius: "4px",
                      padding: "8px 10px",
                    }}
                    onClick={showFilters}
                  >
                    <Typography variant="h5">
                      {isFilterVisible ? "Cancel" : "Filters"}
                    </Typography>
                  </ButtonBase>
                </Grid>
                <Grid item>
                  <ButtonBase
                    sx={{ ...formButtonStyle.saveButtonStyle, height: "37px" }}
                    onClick={openModel}
                  >
                    <AddIcon />
                    New Tasks
                  </ButtonBase>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {isFilterVisible && (
              <Grid item xs={12} pb={2}>
                <Filter setFilterOptions={setFilters} />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12}>
            <CommonTable
              columns={columns}
              maxHeight="600px"
              options={["Review", "Edit", "Delete"]}
              isLoading={isLoading}
              tableData={taskList}
              handleStatusChange={handleAction}
              handleActionClick={handleAction}
            />
          </Grid>
        </Grid>
      </Grid>
      {modal.open &&
        (() => {
          switch (modal.type) {
            case "Add":
              return (
                <AddEditTask
                  open={modal.open}
                  onClose={handleClose}
                  title="Add Task"
                  refetch={refetch}
                  providerGroupUuid={providerGroupUuid}
                />
              );
            case "Edit":
              return (
                <AddEditTask
                  open={modal.open}
                  onClose={handleClose}
                  title="Edit Task"
                  refetch={refetch}
                  editTaskData={editTaskData}
                  providerGroupUuid={providerGroupUuid}
                />
              );
            case "Review":
              return (
                <AddEditTask
                  open={modal.open}
                  onClose={handleClose}
                  title="Review Task"
                  refetch={refetch}
                  editTaskData={editTaskData}
                  providerGroupUuid={providerGroupUuid}
                />
              );
            case "Delete":
              return (
                <DeleteDialog
                  open={modal.open}
                  onClose={handleClose}
                  onEventSuccessModalOpen={deleteTask}
                  title={"Delete Task"}
                  message={"task"}
                />
              );
            default:
              return <></>;
          }
        })()}
      <Grid item xs={12}>
        <CustomPagination
          pagination={pagination}
          setPagination={setPagination}
        />
      </Grid>
    </>
  );
}

export default OpenTasksTable;
