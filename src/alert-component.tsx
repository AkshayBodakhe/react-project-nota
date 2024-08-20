import CommonSnackbar from "./components/common/commonSnackBar/snackBar";
import { useAppSelector } from "./store/hooks";

export const AlertComponent = () => {

    const alert: any = useAppSelector(state => state.commonReducer.alertReducer);

    return (
        <CommonSnackbar
            message={alert.message}
            open={alert.open}
            severity={alert.severity}
        />
    )
}