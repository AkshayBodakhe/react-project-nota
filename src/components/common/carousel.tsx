import { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import carousel1 from "../../assets/other/carousel1.png";
import carousel2 from "../../assets/other/carousel2.png";
import carousel3 from "../../assets/other/carousel3.png";
import { makeStyles } from "@mui/styles";

export const carouselStyle = makeStyles({
  content: {
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
});

const Carousel = () => {
  const classes = carouselStyle();
  const randomImages = [carousel1, carousel2, carousel3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % randomImages.length
      );
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [randomImages.length]);

  const selectImage = randomImages[currentImageIndex];

  return (
    <Grid
      item
      xs={6}
      sm={12}
      md={5}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "column" },
      }}
      style={{
        backgroundImage: `url(${selectImage})`,
      }}
      className={classes.content}
    ></Grid>
  );
};

export default Carousel;
