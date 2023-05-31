import { ImageList, ImageListItem, ImageListItemBar, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { deleteImage } from "../../../firestore/profileActions";
import { useSelector } from "react-redux";
import Permission from "../../../common/dialogs/Permission";
import { addProfileImage } from "../../../firestore/profileActions";

export default function PhotosImageList({ photos, owner }) {
  const { user } = useSelector((store) => store.profileReducer);
  const theme = useTheme();

  return (
    <>
      <ImageList
        // cols={cols()}
        sx={{
          [theme.breakpoints.up("xs")]: {
            gridTemplateColumns: "repeat(2, 1fr) !important",
          },
          [theme.breakpoints.up("sm")]: {
            gridTemplateColumns: "repeat(3, 1fr) !important",
          },
          [theme.breakpoints.up("md")]: {
            gridTemplateColumns: "repeat(4, 1fr) !important",
          },
          [theme.breakpoints.up("lg")]: {
            gridTemplateColumns: "repeat(5, 1fr) !important",
          },
          [theme.breakpoints.up("xl")]: {
            gridTemplateColumns: "repeat(6, 1fr) !important",
          },
        }}
      >
        {photos?.map((photo) => (
          <ImageListItem key={photo.name}>
            <img src={photo.url} alt={photo.name} loading="lazy" />
            <ImageListItemBar
              title={photo.name}
              position="top"
              sx={{
                alignItems: "end",
                "& .MuiImageListItemBar-actionIcon": { color: "white" },
              }}
            ></ImageListItemBar>
            {owner && (
              <Stack>
                <Permission
                  title="set profile picture"
                  content="do you want to set this image as your profile picture"
                  openText="set profile picture"
                  onSubmit={() => addProfileImage({ photoURL: photo.url, userId: user.id })}
                />
                <Button
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => deleteImage({ imageName: photo.name, userId: user.id })}
                >
                  delete
                </Button>
              </Stack>
            )}
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
