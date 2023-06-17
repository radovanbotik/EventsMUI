import { Typography } from "@mui/material";

const Title = ({ title }) => {
  return (
    <>
      <Typography
        variant="caption"
        color="primary"
        sx={{ mixBlendMode: "difference", fontWeight: 600, textTransform: "uppercase" }}
      >
        Event Title
      </Typography>
      <Typography variant="h3" sx={{ ":first-letter": { textTransform: "capitalize" } }}>
        {title}
      </Typography>
    </>
  );
};

export default Title;
