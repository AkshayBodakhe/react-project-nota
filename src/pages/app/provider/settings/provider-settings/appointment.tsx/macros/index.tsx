import { useEffect, useState } from "react";
import { onSubmitHandler } from "../../../../../../../components/common/handleFormSubmit";
import {
  useMacrosControllerServiceDeleteMacros,
  useMacrosControllerServiceGetAllMacros,
} from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import AddEditViewMacros from "./add-macros";
import MacrosList from "./macros-list";
import { macrosListMapper } from "./mapper";
import Loading from "../../../../../../../components/common/spinner/loading";
import { PaginationState } from "../../../../../../../components/common/enums-and-interfaces/interfaces";
import { alertAction } from "../../../../../../../store/features/common-actions/snackbar/alertSlice";
import { useDispatch } from "react-redux";
import { DeleteDialog } from "../../../../../../../components/core/delete-dialog";

interface MacrosProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  editData: any;
  setEditData: (val: any) => void;
  providerGroupUuid: string;
}
const Macros = (props: MacrosProps) => {
  const {
    open,
    setOpen: handleOnOpenForm,
    editData,
    setEditData,
    providerGroupUuid,
  } = props;
  const [viewOpen, setViewOpen] = useState(false);
  const dispatch = useDispatch();
  const [pagination, setPagination] = useState<PaginationState>({
    page: 0,
    size: 10,
    searchString: "",
    sortBy: "created,desc",
    sortDirection: "",
    status: true,
    totalElements: 0,
    totalPages: 0,
  });
  const [macrosListData, setMacrosListData] = useState([]);
  const [isDeleteModalOpen, setIsOpenDeleteModalOpen] = useState(false);
  const [deleteUuid, setDeleteUuid] = useState<any>();
  const {
    data: macrosData,
    refetch,
    isLoading,
    isRefetching,
  } = useMacrosControllerServiceGetAllMacros({
    providerGroupUuid,
    page: pagination.page,
    size: pagination.size,
    sort: [pagination.sortBy],
  });

  const { mutateAsync: deleteMacros, isSuccess } =
    useMacrosControllerServiceDeleteMacros();
  const setOpen = (val: boolean) => {
    handleOnOpenForm(val);
  };
  const onDelete = (data: any) => {
    setIsOpenDeleteModalOpen((item) => !item);
    // handleFormSubmit({ macrosUuid: data?.uuid }, deleteMacros);
    setDeleteUuid(data?.uuid);
  };

  const handleEventSuccessModalOpen = () => {
    handleFormSubmit({ macrosUuid: deleteUuid }, deleteMacros);
    setIsOpenDeleteModalOpen((item) => !item);
  };

  const onSuccess = (...args: any) => {
    refetch();
    handleClose();
    if (args[1]) {
      const fun = args[1];
      fun();
    }
  };
  const handleFormSubmit = (data: any, apiReqFun: any, callback?: any) => {
    const processAPI = () => apiReqFun(data);
    onSubmitHandler({
      processAPI,
      onSuccess: (...args: any) => onSuccess(...args, callback),
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        alertAction.setAlert({
          open: true,
          message: "Macros deleted successfully",
          severity: "success",
        })
      );
    }
  }, [isSuccess]);

  const handleClose = () => {
    setOpen(false);
    setEditData(undefined);
    setViewOpen(false);
  };
  const handleEdit = (data: any) => {
    setEditData(data);
    setOpen(true);
  };

  const handleView = (data: any) => {
    handleEdit(data);
    setViewOpen(true);
  };
  useEffect(() => {
    if (macrosData) {
      setMacrosListData(macrosData?.data?.content?.map(macrosListMapper) || []);
      setPagination({
        ...pagination,
        totalElements: macrosData?.data?.totalElements,
        totalPages: macrosData?.data?.totalPages,
      });
    }
  }, [macrosData]);
  return (
    <>
      <MacrosList
        data={macrosListData || []}
        handleEdit={handleEdit}
        pagination={pagination}
        setPagination={setPagination}
        handleView={handleView}
        handleDelete={onDelete}
      />
      {isLoading || (isRefetching && <Loading />)}

      <AddEditViewMacros
        handleClose={handleClose}
        dialogTitle={
          viewOpen ? "Macros Template" : editData ? "Edit Macros" : "Add Macros"
        }
        buttonTitle={"Save"}
        open={open}
        editData={editData}
        isShow={viewOpen}
        refetch={refetch}
      />
      {isDeleteModalOpen && (
        <DeleteDialog
          open={isDeleteModalOpen}
          onClose={() => setIsOpenDeleteModalOpen(false)}
          onEventSuccessModalOpen={handleEventSuccessModalOpen}
          title={"Delete the User"}
          message={`macro`}
        />
      )}
    </>
  );
};

export default Macros;
