import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import BasicRating from "../BasicRating";
import Author from "../../dashboard/common/Author";
import { grey } from "@mui/material/colors";
import { readUser } from "../../../../firestore/profileActions";

const Summary = ({ event }) => {
  const [host, setHost] = useState(null);

  useEffect(() => {
    readUser({ id: event.hostId, action: (host) => setHost(host) });
  }, [event]);

  if (!host) {
    return <div>loading...</div>;
  }

  return (
    <Stack direction="column" spacing={4}>
      <Stack direction="column" spacing={2}>
        <Typography
          variant="overline"
          fontWeight={600}
          fontSize="body2.fontSize"
          color="text.secondary"
          sx={{ textTransform: "uppercase" }}
        >
          hosted by
        </Typography>
        <Author hostedBy={event.hostedBy} hostId={event.hostId} hostPhotoURL={event.hostPhotoURL} />
        <Typography color="text.secondary">{host.description}</Typography>
      </Stack>

      <Stack direction="column" spacing={2} sx={{ flexWrap: "wrap" }}>
        <BasicRating />
        <Button
          type="submit"
          size="large"
          variant="contained"
          disableElevation
          sx={{
            backgroundColor: grey[900],
            flex: 1,
            "&:hover": { backgroundColor: grey[800] },
          }}
        >
          join event
        </Button>
      </Stack>
      <Stack direction="row">edit cancel share</Stack>
    </Stack>
  );
};

export default Summary;
