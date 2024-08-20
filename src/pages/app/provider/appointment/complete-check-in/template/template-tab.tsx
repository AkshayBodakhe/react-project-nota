import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMacrosControllerServiceGetAllMacros } from "../../../../../../sdk/thinkemr-core-0.0.1/queries";
import { useSelector } from "react-redux";
import { toCamelCase } from "../../../../../../components/core/add-edit-staff-user/add-edit-staff-user";
import Loading from "../../../../../../components/common/spinner/loading";

export const parentContainer = {
  border: "1px solid #c5c5c5",
  borderRadius: "5px",
  padding: "10px",
};

export const childContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const titleStyle = {
  color: "black",
  textDecoration: "underline",
  cursor: "pointer",
};

function TemplateTab() {
  const [macrosList, setMacrosList] = useState<any[]>();
  const [isDescription, setIsDescription] = useState(false);
  const [descriptionCopied, setDescriptionCopied] = useState(false);
  const [macrosTitle, setMacrosTitle] = useState("");
  const handleVisbleMacros = () => {
    setIsDescription(true);
  };
  const handleBackMacros = () => {
    setIsDescription(false);
  };
  const userDetails = useSelector(
    (state: any) => state.commonReducer.userDetail
  );

  const divRef = useRef<HTMLDivElement>(null);

  const copyToClipBoard = () => {
    if (divRef.current) {
      const range = document.createRange();
      range.selectNode(divRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
      window.getSelection()?.removeAllRanges();
    }
  };

  const { data: macrosData } = useMacrosControllerServiceGetAllMacros({
    providerGroupUuid: userDetails?.data?.providerGroup,
    page: 0,
    size: 500,
    sort: ["created,desc"],
  });

  useEffect(() => {
    if (macrosData) {
      setMacrosList(macrosData?.data?.content);
    }
  }, [macrosData]);

  return (
    <>
      <Box>
        <Grid container gap={1}>
          {isDescription && (
            <ArrowBackIcon
              sx={{ cursor: "pointer" }}
              onClick={handleBackMacros}
            />
          )}
          <Typography variant="h2">{"Macros"}</Typography>
        </Grid>
        {!isDescription ? (
          <Grid sx={parentContainer} my={2}>
            <Grid sx={childContainer}>
              <Typography sx={{ color: "#2c57b3" }}>{"Title Names"}</Typography>
            </Grid>
            {macrosList?.length === 0 && <Loading />}
            {macrosList?.map((item) => {
              return (
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  rowGap={0.5}
                  mt={1.5}
                >
                  <Grid
                    onClick={() => {
                      handleVisbleMacros(), setMacrosTitle(item?.templateName);
                    }}
                    container
                    gap={1.2}
                    alignItems={"center"}
                  >
                    <Typography variant="h5" sx={titleStyle}>
                      {toCamelCase(item?.templateName)}
                    </Typography>
                  </Grid>
                </Box>
              );
            })}
          </Grid>
        ) : (
          <Box py={2}>
            {macrosList?.map((item) => {
              if (item.templateName === macrosTitle) {
                return (
                  <Grid
                    sx={{
                      border: "1px solid #c5c5c5",
                      borderRadius: "5px",
                      padding: "10px",
                    }}
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography sx={{ color: "#2c57b3" }}>
                        {item?.templateName}
                      </Typography>
                      <Box
                        onClick={() => {
                          copyToClipBoard();
                          setDescriptionCopied((item) => !item);
                        }}
                        sx={{ display: "flex", gap: "3px", cursor: "pointer" }}
                      >
                        {!descriptionCopied ? (
                          <>
                            <ContentCopyOutlinedIcon
                              sx={{ color: "#2c57b3" }}
                            />
                            <Typography sx={{ color: "#2c57b3" }}>
                              {"Copy"}
                            </Typography>
                          </>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              background: "#e1effb",
                              borderRadius: "10px",
                              padding: "0px 5px",
                            }}
                          >
                            <ContentCopyOutlinedIcon
                              sx={{ color: "#2c57b3" }}
                            />
                            <Typography sx={{ color: "#2c57b3" }}>
                              {"Copied"}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    </Grid>
                    <Grid>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        rowGap={0.5}
                        mt={1.5}
                      >
                        <Grid
                          ref={divRef}
                          container
                          gap={1.2}
                          alignItems={"center"}
                        >
                          <Typography variant="h6" sx={{ color: "black" }}>
                            {item?.description}
                          </Typography>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                );
              } else {
                <Typography>{"No macros found!"}</Typography>;
              }
            })}
          </Box>
        )}
      </Box>
    </>
  );
}
export default TemplateTab;
