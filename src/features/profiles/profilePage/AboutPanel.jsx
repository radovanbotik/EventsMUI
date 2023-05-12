import { AccountCircle, ModeEdit } from "@mui/icons-material";
import { Box, AppBar, Button, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";

const AboutPanel = ({ creationTime }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      <AppBar position="static">
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
        <>form</>
      ) : (
        <Box>
          <Toolbar disableGutters>
            <Typography>Member since:{dayjs(creationTime).format("DD/MM/YYYY")}</Typography>
          </Toolbar>
        </Box>
      )}
    </>
  );
};

export default AboutPanel;
