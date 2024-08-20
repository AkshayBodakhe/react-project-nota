import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  templateName: Yup.string()
    .trim()
    .min(2, "Must contain at least two characters value")
    .required("Please enter the title ")
    .matches(/^[a-zA-Z0-9\s]*$/, "Please enter the valid title "),
  description: Yup.string()
    .trim()
    .min(2, "Must contain at least two characters value")
    .required("Please enter the description"),
});
