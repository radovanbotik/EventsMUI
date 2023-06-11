import { Box, Stack, Button, Link, Typography } from "@mui/material";
import BgImageWithOverlay from "../../common/BgImageWithOverlay";
import HeadingH6 from "../../common/headingH6";

const Ad = () => {
  return (
    <Stack direction="column" spacing={2}>
      <HeadingH6>Sponsored by:</HeadingH6>
      <Box sx={{ maxHeight: "400px", borderRadius: "10px", overflow: "hidden", position: "relative" }}>
        <BgImageWithOverlay />
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
