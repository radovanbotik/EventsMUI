import { AccountCircle, EditOutlined } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Stack, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { openModal } from "../../../store/modalSlice";
import formatDates from "../../../common/util/formatDates";

const AboutPanel = (props) => {
  const { owner, createdAt, description } = props;
  const dispatch = useDispatch();
  return (
    <>
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar variant="dense" sx={{ display: "flex" }}>
          <AccountCircle sx={{ mr: 2 }} />
          <Typography sx={{ mr: "auto" }}>About User</Typography>
          {owner && (
            <Tooltip sx={{ color: "inherit" }} title="Edit this section">
              <IconButton
                onClick={() => {
                  dispatch(openModal({ modalType: "about", modalProps: { content: description } }));
                }}
              >
                <EditOutlined />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Toolbar disableGutters>
          <Stack>
            <Toolbar disableGutters variant="dense" sx={{ color: "text.secondary" }}>
              <Typography>Member since:{formatDates({ date: createdAt, format: "DD/MM/YYYY" })}</Typography>
            </Toolbar>
            <Typography>{description || "No info to display"} </Typography>
          </Stack>
        </Toolbar>
      </Box>
    </>
  );
};

export default AboutPanel;
