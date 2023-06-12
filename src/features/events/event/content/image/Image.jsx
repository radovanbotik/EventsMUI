import Image from "mui-image";
import trnava from "../../../../../common/images/szeged.webp";

const BgImage = ({ image }) => {
  return <Image src={image || trnava} fit="cover" height={500} style={{ borderRadius: "10px" }} />;
};

export default BgImage;
