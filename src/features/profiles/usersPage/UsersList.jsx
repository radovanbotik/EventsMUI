import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

export default function UsersList({ users }) {
  console.log(users);
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const navigate = useNavigate();

  return (
    <List dense sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {users?.map(value => {
        // const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value.id}
            // secondaryAction={
            //   <Checkbox
            //     edge="end"
            //     onChange={handleToggle(value)}
            //     checked={checked.indexOf(value) !== -1}
            //     inputProps={{ "aria-labelledby": labelId }}
            //   />
            // }
            disablePadding
          >
            <ListItemButton onClick={() => navigate(`profile/${value.id}`)}>
              <ListItemAvatar>
                <Avatar src={value.photoURL} />
              </ListItemAvatar>
              <ListItemText id={value.id} primary={value.displayName} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
