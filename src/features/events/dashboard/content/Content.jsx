import { Grid } from "@mui/material";
import Events from "./Events";
import Column from "./column/Column";

const Content = ({ events }) => {
  if (!events) {
    return <div>loading...</div>;
  }
  return (
    <Grid container spacing={10}>
      <Grid item xs={12} md={8}>
        <Events events={events} />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* search */}
        <Column events={events} />
      </Grid>
    </Grid>
  );
};

export default Content;
