import { useState } from "react";
import { useMediaQuery, ImageList, ImageListItem, ImageListItemBar, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DeleteRounded } from "@mui/icons-material";
import Confirmation from "../../../common/dialogs/Confirmation";

export default function PhotosImageList({ photos }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const setProfilePicture = () => {
    console.log("profile picture set");
    handleClose();
  };

  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.up("xl"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const xs = useMediaQuery(theme.breakpoints.up("xs"));

  const cols = () => {
    if (xs && !sm && !md && !lg && !xl) return 2;
    if (xs && sm && !md && !lg && !xl) return 3;
    if (xs && sm && md && !lg && !xl) return 4;
    if (xs && sm && md && lg && !xl) return 5;
    if (xs && sm && md && lg && xl) return 6;
  };

  return (
    <>
      <Confirmation
        open={open}
        title={"Update profile picture"}
        content={"Do you wish to set this picture as your profile picture?"}
        handleClose={handleClose}
        onSubmit={setProfilePicture}
      />
      <ImageList cols={cols()}>
        {photos?.map(item => (
          <ImageListItem key={item.name} onClick={() => setOpen(true)} sx={{ cursor: "pointer" }}>
            <img src={item.url} alt={item.name} loading="lazy" />
            <ImageListItemBar
              // actionIcon={<DeleteRounded fontSize="small" />}
              actionIcon={
                <IconButton color="inherit" onClick={() => console.log("delete")}>
                  <DeleteRounded fontSize="small" />
                </IconButton>
              }
              title={item.name}
              // subtitle={<span>by: {item.author}</span>}
              position="top"
              sx={{
                alignItems: "end",
                "& .MuiImageListItemBar-actionIcon": { color: "white" },
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
