import { Box, Stack, Button, Link, Typography } from "@mui/material";
import Image from "mui-image";
import trnava from "../../../../../common/images/trnava.webp";

const Ad = () => {
  return (
    <Stack direction="column" spacing={2}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
        Sponsored by:
      </Typography>
      <Box sx={{ maxHeight: "400px", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
        <Image src={trnava} style={{ aspectRatio: 1 / 1 }} fit="cover" />
        <Box
          className="shade-gradient-overlay"
          sx={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}
        />
        <Stack
          spacing={1}
          useFlexGap
          alignItems="center"
          sx={{ position: "absolute", bottom: 0, width: "100%", padding: { xs: 2, lg: 4 }, color: "white" }}
        >
          <Typography gutterBottom variant="h6">
            This is an ad.
          </Typography>
          <Button
            component={Link}
            variant="contained"
            href="#"
            sx={{
              width: "fit-content",
              zIndex: 10,
              textDecoration: "none",
              textTransform: "capitalize",
              color: "inherit",
              ":first-letter": { textTransform: "capitalize" },
            }}
          >
            See more
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Ad;
