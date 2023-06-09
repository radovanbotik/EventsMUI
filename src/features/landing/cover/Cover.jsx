import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import trnava from "../../../common/images/trnava.webp";
import szeged from "../../../common/images/szeged.webp";

const Cover = () => {
  return (
    <Box sx={{ flex: 1, width: "100%", maxWidth: "100%", maxHeight: "100vh", minHeight: 0, minWidth: 0 }}>
      <Swiper
        slidesPerView={1}
        onSlideChange={() => console.log("slide has changed")}
        onSwiper={() => console.log("swiper")}
        speed={500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        pagination={{
          clickable: "true",
          dynamicBullets: true,
        }}
        modules={[Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={trnava} alt="trnava" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={szeged} alt="szeged" />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Cover;
