import { useMediaQuery, ImageList, ImageListItem, ImageListItemBar, Button, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { deleteImage, updateUser } from "../../../store/profileSlice";
import { useDispatch } from "react-redux";
import Permission from "../../../common/dialogs/Permission";

export default function PhotosImageList({ photos, owner }) {
  const dispatch = useDispatch();

  const setProfilePicture = (photo) => {
    dispatch(updateUser({ photoURL: photo }));
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
      <ImageList cols={cols()}>
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
                  onSubmit={() => setProfilePicture(photo.url)}
                />
                <Button
                  size="small"
                  sx={{ textTransform: "capitalize" }}
                  onClick={() => dispatch(deleteImage(photo.name))}
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
