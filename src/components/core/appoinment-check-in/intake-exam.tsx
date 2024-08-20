import React, { useState } from "react";
import { TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function IntakeExam() {
  const [inputs, setInputs] = useState({ firstInput: [], secondInput: [] });
  const [currentInputs, setCurrentInputs] = useState<any>({
    firstInput: "",
    secondInput: "",
  });
  const [currentSection, setCurrentSection] = useState("firstInput");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCurrentInputs((prevInputs: any) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentInputs[currentSection].trim() !== "") {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        [currentSection]: [
          ...prevInputs[currentSection],
          currentInputs[currentSection].trim(),
        ],
      }));
      setCurrentInputs((prevInputs: any) => ({
        ...prevInputs,
        [currentSection]: "",
      }));
    }
  };

  const handleDelete = (section: string, index: number) => {
    setInputs((prevInputs: any) => ({
      ...prevInputs,
      [section]: prevInputs[section].filter(
        (_item: any, i: number) => i !== index
      ),
    }));
  };

  return (
    <div>
      <div>
        {inputs.firstInput.map((inputText, index) => (
          <div key={index}>
            <Typography variant="body1">{inputText}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete("firstInput", index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <TextField
          name="firstInput"
          value={currentInputs.firstInput}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setCurrentSection("firstInput")}
        />
      </div>
      <div>
        {inputs.secondInput.map((inputText, index) => (
          <div key={index}>
            <Typography variant="body1">{inputText}</Typography>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete("secondInput", index)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
        <TextField
          name="secondInput"
          value={currentInputs.secondInput}
          onChange={handleTextChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setCurrentSection("secondInput")}
        />
      </div>
    </div>
  );
}

export default IntakeExam;
