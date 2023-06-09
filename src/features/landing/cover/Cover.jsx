import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectCreative } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import trnava from "../../../common/images/trnava.webp";
import szeged from "../../../common/images/szeged.webp";
import Slide from "./Slide";

const cities = [
  {
    city: "trnava",
    photo: trnava,
  },
  {
    city: "szeged",
    photo: szeged,
  },
];

const Cover = () => {
  return (
    <Box sx={{ flex: 1, width: "100%", maxWidth: "100%", maxHeight: "100vh", minHeight: 0, minWidth: 0 }}>
      <Swiper
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -50],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        slidesPerView={1}
        onSlideChange={() => console.log("slide has changed")}
        onSwiper={() => console.log("swiper")}
        speed={800}
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
        modules={[Autoplay, Navigation, Pagination, EffectCreative]}
        className="mySwiper"
      >
        {cities.map((city) => (
          <SwiperSlide key={city.city}>
            <Slide {...city} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Cover;
