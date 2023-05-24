import { useSelector } from "react-redux";
import CardSkeleton from "./CardSkeleton";
import { Card, Divider } from "@mui/material";
import CardHead from "./CardHead";
import CardImage from "./CardImage";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";

const EventCard = ({ event }) => {
  const { status } = useSelector(store => store.eventReducer);
  if (status === "loading") return <CardSkeleton />;

  return (
    <Card variant="outlined">
      <CardHead {...event} />
      <Divider />
      <CardImage {...event} />
      <Divider />
      <CardBody {...event} />
      <Divider />
      <CardFooter {...event} />
    </Card>
  );
};

export default EventCard;