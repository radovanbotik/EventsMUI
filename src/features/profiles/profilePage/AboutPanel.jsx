import { AccountCircle, ModeEdit } from "@mui/icons-material";
import { Box, AppBar, Button, Toolbar, Typography, Stack } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import AboutProfileForm from "./AboutProfileForm";

const AboutPanel = ({ props }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>About User</Typography>
          {props.owner && (
            <Button
              variant="contained"
              size="small"
              sx={{ bgcolor: "primary.light" }}
              // endIcon={<ModeEdit sx={{ width: 16, height: 16 }} />}
              onClick={() => setEditing((prev) => !prev)}
            >
              {editing ? "Cancel" : "Edit"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {editing ? (
        <AboutProfileForm {...props} />
      ) : (
        <Box>
          <Toolbar disableGutters>
            <Stack>
              <Typography>
                Member since:{dayjs(props.creationTime).format("DD/MM/YYYY")}
              </Typography>
              <Typography>
                {props.description || "No info to display"}{" "}
              </Typography>
            </Stack>
          </Toolbar>
        </Box>
      )}
    </>
  );
};

export default AboutPanel;
