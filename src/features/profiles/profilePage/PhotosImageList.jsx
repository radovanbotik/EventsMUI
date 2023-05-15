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

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    author: "@bkristastucchio",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    author: "@arwinneil",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    author: "@southside_customs",
  },
];
