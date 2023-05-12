import { AccountCircle, ModeEdit } from "@mui/icons-material";
import { Box, AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import AboutProfileForm from "./AboutProfileForm";

const AboutPanel = user => {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>About User</Typography>
          <Button
            variant="contained"
            size="small"
            sx={{ bgcolor: "primary.light" }}
            // endIcon={<ModeEdit sx={{ width: 16, height: 16 }} />}
            onClick={() => setEditing(prev => !prev)}
          >
            {editing ? "Cancel" : "Edit"}
          </Button>
        </Toolbar>
      </AppBar>
      {/* content */}
      {editing ? (
        <AboutProfileForm {...user} />
      ) : (
        <Box>
          <Toolbar disableGutters>
            <Typography>Member since:{dayjs(user.creationTime).format("DD/MM/YYYY")}</Typography>
          </Toolbar>
        </Box>
      )}
    </div>
  );
};

export default AboutPanel;
