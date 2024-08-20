export const MasterOptions = [
  "Data Import",
  "Provider Data",
  "Patient Data",
  "Drug",
  "ICD 10 Code",
  "CPT Code",
  "HCPCS Code",
];

export const MasterHeaders = [
  {
    label: "Data Import",
  },
  {
    label: "Diagnosis Code Catalog",
  },
  {
    label: "Procedure Code Catalog",
  },
  {
    label: "Drug Catalog",
  },
  {
    label: "Lab Test Catalog",
  },
  {
    label: "Imaging Study Catalog",
  },
  {
    label: "Payer Catalog",
  },
];

export const IS_LOADING = "IS_LOADING";

export const setIsLoading = (payload: boolean) => {
  return {
    type: IS_LOADING,
    payload,
  };
};
