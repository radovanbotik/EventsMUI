import { useEffect, useState } from "react";
import { Stack, Typography, Button } from "@mui/material";
import BasicRating from "../BasicRating";
import Author from "../../dashboard/common/Author";
import { grey, pink } from "@mui/material/colors";
import { readUser } from "../../../../firestore/profileActions";
import { DeleteOutlined, FavoriteBorder, RemoveCircleOutlineOutlined, Share } from "@mui/icons-material";

const Summary = ({ event }) => {
  const [host, setHost] = useState(null);

  useEffect(() => {
    readUser({ id: event.hostId, action: (host) => setHost(host) });
  }, [event]);

  if (!host) {
    return <div>loading...</div>;
  }

  return (
    <Stack direction="column" spacing={2}>
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
          {event.cancelled ? "join event" : "leave event"}
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap", justifyContent: "space-between" }}>
        <Button size="small" startIcon={<RemoveCircleOutlineOutlined />} sx={{ color: "text.primary" }}>
          Cancel
        </Button>
        <Button size="small" startIcon={<DeleteOutlined />} sx={{ color: "text.primary" }}>
          Delete
        </Button>

        <Button size="small" startIcon={<FavoriteBorder />} sx={{ color: pink[400] }}>
          Favourite
        </Button>
        <Button size="small" startIcon={<Share />} sx={{ color: "text.primary" }}>
          Share
        </Button>
      </Stack>
    </Stack>
  );
};

export default Summary;
