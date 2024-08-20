import { Box, Grid, Typography } from "@mui/material";
import { useIntakeFormControllerServiceGetAllQuestionnaire } from "../../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { toCamelCase } from "../../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import Loading from "../../../../../../../components/common/spinner/loading";
interface questionarriesProps {
  patientData: any;
}

const QuestionnairesTab = (props: questionarriesProps) => {
  const { patientData } = props;
  const [qPayload, setQPayload] = useState<any | undefined[]>();
  const { data: questionarriesData } =
    useIntakeFormControllerServiceGetAllQuestionnaire({
      patientUuid: patientData?.uuid,
      size: 200,
    });
  const [rowInfo, setRowInfo] = useState<any>();
  const [formId, setFormId] = useState<any>();

  useEffect(() => {
    setQPayload(questionarriesData && questionarriesData?.data?.content);
  }, [questionarriesData]);

  // const filledForm = qPayload && qPayload.map((item: any) => item.content);
  // const convert = JSON.stringify(filledForm && filledForm[0]);
  // const parseStr = JSON.parse(convert);
  // console.log("filledForm", filledForm && filledForm[0].components);

  const payL = [
    {
      label: "First Name",
      placeholder: "Enter first name",
      isRequired: true,
      defaultValue: "Akshay",
      type: "textfield",
    },
    {
      label: "Submit",
      placeholder: "",
      isRequired: false,
      defaultValue: "Submit",
      type: "button",
    },
    {
      label: "Second Name",
      placeholder: "Enter second name",
      isRequired: false,
      defaultValue: "Jalindar",
      type: "textfield",
    },
    {
      label: "Third name",
      placeholder: "Enter third name",
      isRequired: true,
      defaultValue: "Bodakhe",
      type: "textfield",
    },
    {
      label: "Have fever",
      placeholder: "",
      isRequired: true,
      defaultValue: "option1",
      type: "radio",
      values: [
        {
          label: "Yes",
          value: "option1",
          shortcut: "",
        },
        {
          label: "No",
          value: "option2",
          shortcut: "",
        },
      ],
    },
    {
      label: "Gender",
      placeholder: "Select gender",
      isRequired: false,
      defaultValue: "male",
      type: "select",
      values: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female2",
        },
      ],
    },
    {
      label: "Languages",
      placeholder: "",
      isRequired: true,
      defaultValue: "OptionB",
      type: "selectboxes",
      values: [
        {
          label: "English",
          value: "OptionA",
          shortcut: "",
        },
        {
          label: "Hindi",
          value: "OptionB",
          shortcut: "",
        },
        {
          label: "Other",
          value: "OptionC",
          shortcut: "",
        },
      ],
    },
    {
      label:
        "Doctors are the only people who have a thorough understanding of all diseases, their symptoms, and their remedies.",
      placeholder: "",
      isRequired: false,
      defaultValue: true,
      type: "checkbox",
    },
    {
      label: "About ",
      placeholder: "",
      isRequired: true,
      defaultValue: "This is all about me",
      type: "textarea",
    },
  ];

  // console.log("payL :", payL);

  const formPayload = {
    display: "form",
    components: payL,
  };

  const handleSelectRow = (row: any) => {
    setRowInfo(row);
    return "";
  };

  const getFormDetails = (info: any) => {
    const convertedString = JSON.parse(info && info?.content);
    const newConst = convertedString
      ?.filter((item: any) => item.label !== "Submit")
      .map((_item: any) => {
        return (
          <Box py={1}>
            {/* <Typography variant="h5" fontWeight={"bold"}>
              {key?.label}
            </Typography>
            <Typography>{key?.defaultValue}</Typography> */}
          </Box>
        );
      });

    return newConst;
  };
  const getQuestionAnwser = (item: any) => {
    const questionAnwser = item?.map((item: any) => {
      return (
        <Box>
          <Typography>{item?.label}</Typography>
          <Typography>{item?.defaultValue}</Typography>
        </Box>
      );
    });

    return questionAnwser;
  };

  return (
    <>
      {qPayload?.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pt: "10px",
          }}
        >
          <Typography>{"No data available"}</Typography>
        </Box>
      ) : (
        <Grid
          sx={{
            display: "grid",
            gridTemplateColumns: "25% 1fr",
            columnGap: "10px",
          }}
          my={3}
          mx={2}
        >
          <Box>
            {!qPayload && <Loading />}
            {qPayload &&
              qPayload?.map((item: any) => {
                return (
                  <Box
                    px={1}
                    py={1}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "2% 1fr",
                      border: "1px solid #c8c8c8",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }}
                    mb={1}
                    onClick={() => handleSelectRow(item)}
                  >
                    <Box
                      sx={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        // width: "100%",
                        background: "#2C57B3",
                        // my: "3px",
                      }}
                    ></Box>
                    <Box
                      px={1}
                      sx={{
                        background: "#F1F1F1 ",
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                      }}
                    >
                      <Grid>
                        <Typography
                          sx={{ fontSize: "18px", fontWeight: "500" }}
                        >
                          {"History Form"}
                        </Typography>
                      </Grid>
                      <Grid container justifyContent={"space-between"} mt={1}>
                        <Typography color={"gray"}>{item?.sendDate}</Typography>
                        <Typography
                          sx={{
                            color:
                              item?.intakeFormStatus === "COMPLETED"
                                ? "#00B917"
                                : "red",
                          }}
                        >
                          {toCamelCase(item?.intakeFormStatus)}
                        </Typography>
                      </Grid>
                    </Box>
                  </Box>
                );
              })}
          </Box>

          <Box
            border={"1px solid #c8c8c8"}
            borderRadius={"10px"}
            p={2}
            sx={{
              position: "absolute",
              right: "4%",
              width: "60%",
              overflowY: "scroll",
              height: "60vh",
            }}
          >
            {qPayload &&
              qPayload
                ?.filter((row: any) => row?.id === rowInfo?.id)
                .map((item: any) => {
                  const qAnswer =
                    item &&
                    item?.content?.components
                      ?.filter((val: any) => val.label !== "Submit")
                      .map((item: any) => {
                        return (
                          <Box>
                            <Typography mb={1} variant="h5" fontWeight={"bold"}>
                              {item.label}
                            </Typography>
                            <Typography mb={2} variant="h5">
                              {item.defaultValue === true
                                ? "Yes"
                                : item.defaultValue}
                            </Typography>
                          </Box>
                        );
                      });
                  return qAnswer;
                })}
          </Box>
        </Grid>
      )}
      {/* <Form form={formPayload} /> */}
    </>
  );
};

export default QuestionnairesTab;
