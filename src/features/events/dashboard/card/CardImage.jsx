import noImage from "../../../../common/images/noImage.avif";
import { CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const CardImage = ({ eventPhotoURL, id }) => {
  return (
    <CardActionArea component={Link} to={`event/${id}`}>
      <CardMedia
        component="img"
        image={eventPhotoURL || noImage}
        loading="lazy"
        alt="event image"
        height={240}
        sx={{ "&.MuiCardMedia-img": { objectFit: "contain" } }}
      />
    </CardActionArea>
  );
};

export default CardImage;
