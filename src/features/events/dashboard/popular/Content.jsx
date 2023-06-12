import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../../../app/index.css";
// import "swiper/css/navigation";
import { Navigation } from "swiper";
import PostPopular from "./PostPopular";

const Content = ({ events }) => {
  return (
    <Box>
      <Swiper
        navigation={{
          prevEl: ".popular-swiper-prev",
          nextEl: ".popular-swiper-next",
        }}
        spaceBetween={36}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {/* <Swiper className="mySwiper"> */}
        <SwiperSlide>
          <PostPopular event={events[0]} />
        </SwiperSlide>
        <SwiperSlide>
          <PostPopular event={events[1]} />
        </SwiperSlide>
        <SwiperSlide>
          <PostPopular event={events[2]} />
        </SwiperSlide>
        <SwiperSlide>
          <PostPopular event={events[3]} />
        </SwiperSlide>
        <SwiperSlide>
          <PostPopular event={events[2]} />
        </SwiperSlide>
        <SwiperSlide>
          <PostPopular event={events[1]} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default Content;
