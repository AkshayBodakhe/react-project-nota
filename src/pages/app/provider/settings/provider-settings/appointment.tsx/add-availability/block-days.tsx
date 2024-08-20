import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { FormHelperText, Grid, Typography } from "@mui/material";
import { patientStyle } from "../../../../patient/style/commonStyle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Props } from "./appointment-time";
import FormInput from "../../../../../../../components/common/atom/FormInput";
import { useEffect, useState } from "react";

function BlockDays(props: Props) {
  const { formik, blocks, setBlocks } = props;
  const [error, setError] = useState([]);
  const classes = patientStyle();

  const addBlock = () => {
    setBlocks((prevBlocks: any) => [
      ...prevBlocks,
      {
        id: (blocks?.length || 0) + 1,
        fromDate: "",
        toDate: "",
      },
    ]);
  };

  const handleChange = (event: any, index: number) => {
    const { name, value } = event.target;

    const updatedBlocks = blocks?.map((day, i) => {
      if (index === i) {
        return {
          ...day,
          [name]: value,
        };
      }
      return day;
    });

    const fromDateStr = updatedBlocks?.[index]?.fromDate;
    const toDateStr = updatedBlocks?.[index]?.toDate;

    const fromDate = new Date(fromDateStr);
    const toDate = new Date(toDateStr);

    let error = "";
    if (fromDateStr && toDateStr && fromDate > toDate) {
      error = "End Date should be grater than Start Date.";
    }

    setError((prevErrors: any) => ({ ...prevErrors, [index]: error }));
    setBlocks(updatedBlocks);
  };

  const deleteBlock = (id: any) => {
    setBlocks((prevBlocks: any) => {
      const indexToRemove = prevBlocks.findIndex(
        (block: any) => block.id === id
      );
      const updatedBlocks = prevBlocks.filter((block: any) => block.id !== id);

      setError((preError: any) => {
        const updatedError = { ...preError };
        delete updatedError[indexToRemove];
        return updatedError;
      });

      return updatedBlocks;
    });
  };

  useEffect(() => {}, [blocks]);

  return (
    <Grid
      item
      xs={12}
      mt={2}
      sx={{
        background: "#FFFFFF 0% 0% no-repeat padding-box",
        border: "1px solid #1A1A1A1A",
        borderRadius: "5px",
        opacity: 1,
        padding: "10px",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Typography variant="h5" sx={{ color: "#1A1A1A" }}>
          Block Days
        </Typography>
        <Grid item sx={{ display: "flex" }}>
          <AddOutlinedIcon sx={{ fontSize: "18px", color: "#1B5984" }} />
          <Typography
            variant="h5"
            sx={{ color: "#1B5984", cursor: "pointer" }}
            onClick={addBlock}
          >
            Add Block Days
          </Typography>
        </Grid>
      </Grid>
      {blocks?.length !== 0 &&
        blocks?.map((block: any, index: number) => (
          <Grid item xs={12} mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={5.8}>
                <FormInput
                  control="calendar"
                  height="42px"
                  name={"fromDate"}
                  label="Start Date"
                  value={block.fromDate}
                  disablePast={true}
                  onChange={(event: any) => handleChange(event, index)}
                  error={!!error[index]}
                  isError={!!error[index]}
                />
              </Grid>
              <Grid item xs={5.8}>
                <FormInput
                  control="calendar"
                  height="42px"
                  name={"toDate"}
                  label="End Date"
                  disablePast={true}
                  value={block.toDate}
                  onChange={(event: any) => handleChange(event, index)}
                  error={!!error[index]}
                  isError={!!error[index]}
                />
                {error[index] && (
                  <FormHelperText error>{error[index]}</FormHelperText>
                )}
              </Grid>
              <Grid
                item
                xs={0.4}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "end",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h5" className={classes.label}>
                  {"\uFEFF"}
                </Typography>
                <DeleteOutlineOutlinedIcon
                  onClick={() => deleteBlock(block.id)}
                  sx={{
                    color: "#1A1A1ACC",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
}

export default BlockDays;
