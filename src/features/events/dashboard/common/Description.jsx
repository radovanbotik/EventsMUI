import { Typography } from "@mui/material";

const Description = ({ description }) => {
  // const capitalizeFirstLetter = description
  //   ?.split(".")
  //   ?.map((sentence) => sentence.charAt(0).toUppercase())
  //   ?.join(".");
  return <Typography gutterBottom={true}>{description}</Typography>;
};

export default Description;
