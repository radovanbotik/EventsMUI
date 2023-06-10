import { Box } from "@mui/material";
import Header from "./Header";
import Content from "./Content";

const Popular = ({ events }) => {
  if (!events || events.length <= 1) {
    return <div>loading..</div>;
  }

  return (
    <Box>
      <Header />
      <Content events={events} />
    </Box>
  );
};

export default Popular;
