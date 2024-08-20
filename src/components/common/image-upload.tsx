import { useState, ChangeEvent, useEffect } from "react";
import Photo from "../../assets/other/imageSelector.svg";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { alertAction } from "../../store/features/common-actions/snackbar/alertSlice";
import { ErrorResponseEntity } from "./enums-and-interfaces/interfaces";

interface ImageInterface {
  setProfileImage?: any;
  existingProfileImage?: any;
}
const ImageSelector = (props: ImageInterface) => {
  const { setProfileImage, existingProfileImage } = props;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (existingProfileImage) {
      setSelectedImage(existingProfileImage);
    }
  }, [existingProfileImage]);

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (file && allowedFormats.includes(file?.type)) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        let encoded_data = e.target?.result as string;
        // let encodedCode = encoded_data.split(",")[1];

        const response = await fetch(encoded_data);
        const blob = await response.blob();
        const sizeInBytes = blob.size;
        const maxSize = 1024 * 512;

        if (sizeInBytes > maxSize) {
          const errMsg = "The image size exceeds 512 KB.";
          dispatch(
            alertAction.setAlert({
              open: true,
              message: errMsg,
              severity: "error",
            })
          );
          // Display your validation message here
        } else {
          setSelectedImage(encoded_data);
          setProfileImage(encoded_data);
        }

        setError("");
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage("");
      setProfileImage("");
      setError("Please select a JPEG, PNG file.");
      console.error("Invalid file format. Please choose a valid image file.");
    }
  };

  const handleClick = () => {
    const inputElement = document.getElementById(
      "imageInput"
    ) as HTMLInputElement | null;
    if (inputElement) {
      inputElement.click();
    }
  };

  return (
    <div>
      <input
        id="imageInput"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleImageSelect}
        style={{ display: "none" }}
      />
      <div
        onClick={handleClick}
        style={{
          cursor: "pointer",
          width: "180px",
          height: "140px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "70%",
              height: "auto",
              position: "absolute",
              top: "50%",
              left: "35%",
              transform: "translate(-55%, -55%)",
            }}
          />
        ) : (
          <img
            src={Photo}
            alt="Select"
            style={{
              width: "70%",
              height: "auto",
              position: "absolute",
              // top: "55%",
              // left: "51%",
              // transform: "translate(-55%, -55%)",
            }}
          />
        )}
      </div>
      <Typography variant="h5" component="h2" sx={{ color: "red" }}>
        {error ?? error}
      </Typography>
    </div>
  );
};

export default ImageSelector;
