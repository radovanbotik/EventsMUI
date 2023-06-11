import { Grid } from "@mui/material";
import List from "./list/List";
import Aside from "./aside/Aside";

const Content = ({ events }) => {
  if (!events || events.length <= 1) {
    return <div>loading...</div>;
  }
  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={8}>
        <List events={events} />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* search */}
        <Aside events={events} />
      </Grid>
    </Grid>
  );
};

export default Content;
