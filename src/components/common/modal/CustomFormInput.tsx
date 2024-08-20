import { Grid, InputBase } from "@mui/material";
import FormLabel from "../label/form-label";
import { commonWidget } from "../../../styles/common";

type Props = {
    id: string
    name: string
    value: string
    label: any
    isRequired: boolean
    error: string
    flex: number
    placeholder: string
}

function CustomFormInput(props: Props) {

    const classes = commonWidget();

    return (
        <Grid item xs={2.4}>
            <FormLabel label={props.label} />
            <InputBase
                fullWidth
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                // onChange={(e) =>
                //     setFieldValue("visitDate", e.target.value)
                // }
                classes={{
                    root: classes.providerTextInput,
                    input: classes.textFieldInput,
                    error: classes.inputBoxError,
                }}
                sx={{ width: '100% !important' }}
            />
        </Grid>
        //     {props.error.locationId && (
        //         <FormHelperText error>
        //             {props.error.locationId}
        //         </FormHelperText>
        //     )}
        // </Box>
    );
}

export default CustomFormInput;