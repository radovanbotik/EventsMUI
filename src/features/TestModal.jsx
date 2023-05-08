import DialogWrap from "./DialogWrap";
import Typography from "@mui/material/Typography";

const TestModal = () => {
  return (
    <DialogWrap title={"test modal"}>
      <Typography> My name is poopy pants </Typography>
    </DialogWrap>
  );
};

export default TestModal;
