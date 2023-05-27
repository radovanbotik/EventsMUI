import { Card, CardHeader, Skeleton, Divider, Avatar } from "@mui/material";

const CardSkeleton = () => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Skeleton animation="wave" variant="circular">
            <Avatar />
          </Skeleton>
        }
      />
      <Divider />
      <Skeleton animation="wave" width="100%" variant="rectangular" height={240} />
      <Divider />
      <Skeleton animation="wave" height={20} style={{ marginBottom: 6 }} />
      <Skeleton animation="wave" height={20} width="80%" />
    </Card>
  );
};

export default CardSkeleton;
