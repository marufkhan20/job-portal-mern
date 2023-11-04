import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useGetReviewsQuery } from "../../features/review/reviewApi";

const ReviewsArea = () => {
  const { data: reviews } = useGetReviewsQuery();
  return (
    <section id="reviews" className="py-[130px] reviews-area bg-slate-100">
      <div className="container mx-auto">
        <div className="section-title">
          <h5>REVIEW</h5>
          <h2>{reviews?.length} Happy Customers</h2>
        </div>

        <Swiper
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
        >
          {reviews?.map((review) => (
            <SwiperSlide key={review?._id}>
              <div className="text-center w-[90%] sm:w-[60%] mx-auto mt-[70px]">
                <div className="single-review">
                  <ul className="flex items-center gap-1 justify-center">
                    <li>
                      <img
                        className="w-4"
                        src="./img/icons/star.png"
                        alt="star"
                      />
                    </li>
                    <li>
                      <img
                        className="w-4"
                        src="./img/icons/star.png"
                        alt="star"
                      />
                    </li>
                    <li>
                      <img
                        className="w-4"
                        src="./img/icons/star.png"
                        alt="star"
                      />
                    </li>
                    <li>
                      <img
                        className="w-4"
                        src="./img/icons/star.png"
                        alt="star"
                      />
                    </li>
                    <li>
                      <img
                        className="w-4"
                        src="./img/icons/star.png"
                        alt="star"
                      />
                    </li>
                  </ul>
                  <p className="italic text-[22px] leading-[38px] font-light text-[#0e2258] my-7">
                    {review?.description}
                  </p>
                  <hr />
                  <div className="relative inline-block">
                    <img
                      className="w-[100px] h-[100px] rounded-full border-4 border-white shadow-lg inline-block"
                      src={
                        review?.profile?.profilePic
                          ? `${process.env.REACT_APP_SERVER_URL}${review?.profile?.profilePic}`
                          : "img/users/1.jpg"
                      }
                      alt="user"
                    />
                    <div
                      className="absolute top-[10px] right-0 h-10 w-10 flex items-center justify-center rounded-full"
                      style={{
                        background: `linear-gradient(
                90deg,
                rgba(5, 84, 242, 1) 35%,
                rgba(144, 0, 254, 1) 100%
              )`,
                      }}
                    >
                      <img
                        className="w-[15px] fill-white"
                        src="./img/icons/quote.png"
                        alt="quote"
                      />
                    </div>
                    <h4 className="uppercase text-[13px] mt-5 mb-1 text-base">
                      {`${review?.profile?.firstName} ${review?.profile?.lastName}`}
                    </h4>
                    <span className="text-base">
                      {review?.profile?.city || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ReviewsArea;
