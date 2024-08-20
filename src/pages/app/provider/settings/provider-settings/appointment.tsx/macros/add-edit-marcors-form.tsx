import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import CustomFormLabel from "../../../../../../../components/common/custom-form-label";

import { Box, FormHelperText, Grid, InputBase } from "@mui/material";
import { commonWidget } from "../../../../../../../styles/common";
import { withCommonModal } from "../../../../../../../components/common/modal/common-modal-hoc";
interface AddEditMacrosFormProps {
  formik: any;
  isShow?: boolean;
}
const AddEditMacrosForm = ({ formik, isShow }: AddEditMacrosFormProps) => {
  const classes = commonWidget();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "10px",
      }}
    >
      <Box width={"100%"} p={1}>
        <CustomFormLabel label="Template Name" isRequired={true} />
        <InputBase
          fullWidth
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          error={!!(formik.errors.templateName && formik.touched.templateName)}
          // onChange={(e) =>
          //   formik.setFieldValue("templateName", e.target.value)
          // }
          disabled={!!isShow}
          name="templateName"
          value={formik.values.templateName}
          placeholder="Enter macros name"
          classes={{
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
            focused: classes.textFieldActive,
            error: classes.inputBoxError,
          }}
        />
        {formik.touched.templateName && formik.errors.templateName && (
          <FormHelperText error>{formik.errors.templateName}</FormHelperText>
        )}
        <Grid item xs={12} mt={2}>
          <CustomFormLabel label="Description" isRequired={true} />
          <InputBase
            fullWidth
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={!!(formik.errors.description && formik.touched.description)}
            // onChange={(e) =>
            //   formik.setFieldValue("description", e.target.value)
            // }
            disabled={!!isShow}
            name="description"
            multiline={true}
            rows={3}
            value={formik.values.description}
            placeholder="Enter Description"
            classes={{
              root: classes.providerTextAreaField,
              input: classes.textFieldInput,
              focused: classes.textFieldActive,
              error: classes.inputBoxError,
            }}
          />
          {formik.touched.description && formik.errors.description && (
            <FormHelperText error>{formik.errors.description}</FormHelperText>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default AddEditMacrosForm;
