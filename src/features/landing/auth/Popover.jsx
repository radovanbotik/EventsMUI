import { useState } from "react";
import { Link, Button, Typography, Popover } from "@mui/material";

export default function BasicPopover({ content, children }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Link
        variant="contained"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        underline="always"
        sx={{ cursor: "pointer" }}
      >
        {children}
      </Link>
      <Popover
        PaperProps={{ style: { maxWidth: "300px" } }}
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>{content}</Typography>
      </Popover>
    </>
  );
}
