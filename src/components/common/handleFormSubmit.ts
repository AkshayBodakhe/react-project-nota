interface submitHandlerProps {
  processAPI: () => Promise<any>;
  setShowLoader?: (val: boolean) => void;
  onSuccess?: (msg: string, isNotShowSuccessMsg?: boolean) => void;
  onClose?: () => void;
  setErrorMsg?: (msg: string) => void;
}
export const onSubmitHandler = ({
  setShowLoader,
  processAPI,
  onSuccess,
  onClose,
  setErrorMsg,
}: submitHandlerProps) => {
  setShowLoader && setShowLoader(true);
  processAPI()
    .then((res: any) => {
      if (["CREATED", "OK", "UPDATED"].includes(res.code)) {
        onSuccess && onSuccess(res.message);
      }
      setShowLoader&&   setShowLoader(false);
      onClose && onClose();
    })
    .catch((err: any) => {
      setShowLoader && setShowLoader(false);
      setErrorMsg && setErrorMsg(err?.body?.message);
    });
};
