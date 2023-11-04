import parse from "html-react-parser";
import React, { useState } from "react";
import { BiTime } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import AddReview from "../components/Reviews/AddReview";
import Reviews from "../components/Reviews/Reviews";
import { useGetServiceQuery } from "../features/service/serviceApi";
// import required modules
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const ServiceDetails = () => {
  const [packageName, setPackage] = useState("basic");
  const { user } = useSelector((state) => state.auth);
  const { serviceId } = useParams();

  const { data: service } = useGetServiceQuery(`${serviceId}`);

  return (
    <section className="py-[60px] bg-[#f5f7f9]">
      <div className="px-5 md:px-0 mx-auto container">
        {/* <!-- event title start --> */}
        <div className="flex items-center gap-6">
          <div>
            <h2 className="mb-[15px] text-2xl font-semibold">
              {service?.title}
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-base text-body">
                Starts on Wed, Jun 01, 2022 5:30 AM
              </span>
            </div>
          </div>
        </div>
        {/* <!-- event title end --> */}

        {/* <!-- event information start --> */}

        <div className="flex flex-col md:flex-row gap-5 mt-10 border-b pb-14">
          {/* <!-- event description start --> */}
          <div className="w-full md:w-[60%] xl:w-[70%] overflow-hidden rounded-md">
            <Swiper
              navigation={true}
              modules={[Navigation, Autoplay]}
              className="mySwiper"
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
            >
              {service?.serviceImages?.map((image) => (
                <SwiperSlide>
                  <img
                    className={`w-full rounded-md transition`}
                    src={`${process.env.REACT_APP_SERVER_URL}${image}`}
                    alt="service"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-10">
              <h3 className="mb-5 text-lg">Description</h3>
              {service?.fullDescription && parse(service?.fullDescription)}
            </div>
          </div>
          {/* <!-- event description end --> */}

          {/* <!-- event details start --> */}
          <div className="w-full md:w-[40%] xl:w-[30%] py-4 rounded-md border bg-white h-fit">
            <h3 className="text-lg pb-5 px-5 border-b">Service Details</h3>
            <div className="px-5">
              {/* <!-- package name start --> */}
              <div className="flex mt-5 gap-1">
                {service?.basicName && (
                  <div
                    className="rounded-sm text-center w-full border cursor-pointer"
                    onClick={() => setPackage("basic")}
                  >
                    <h3
                      className={`py-3 border-b-2 text-1xl  font-bold ${
                        packageName === "basic"
                          ? "text-primary border-primary"
                          : "text-gray-500 border-transparent"
                      }`}
                    >
                      Basic
                    </h3>
                  </div>
                )}

                {service?.standardName && (
                  <div
                    className="rounded-sm text-center w-full border cursor-pointer"
                    onClick={() => setPackage("standard")}
                  >
                    <h3
                      className={`py-3 border-b-2 text-1xl font-bold ${
                        packageName === "standard"
                          ? "text-primary border-primary"
                          : "text-gray-500 border-transparent"
                      }`}
                    >
                      Standard
                    </h3>
                  </div>
                )}

                {service?.premiumName && (
                  <div
                    className="rounded-sm text-center w-full border cursor-pointer"
                    onClick={() => setPackage("premium")}
                  >
                    <h3
                      className={`py-3 border-b-2 text-1xl ${
                        packageName === "premium"
                          ? "text-primary border-primary"
                          : "border-transparent text-gray-500"
                      } font-bold`}
                    >
                      Premium
                    </h3>
                  </div>
                )}
              </div>
              {/* <!-- package name end --> */}

              {/* <!-- package details start --> */}
              <div className="mt-10">
                {packageName === "basic" && (
                  <div>
                    <div className="flex items-center justify-between mb-7">
                      <h3 className="text-gray-700 text-lg">
                        {service?.basicName}
                      </h3>
                      <h3 className="text-gray-700 text-lg">
                        ${service?.basicPrice}
                      </h3>
                    </div>
                    <p className="font-semibold text-sm text-gray-600 mb-8">
                      {service?.basicDescription}
                    </p>

                    <div className="flex items-center gap-5 mb-6">
                      {service?.basicDelivery && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <BiTime />
                          <span>{service?.basicDelivery} Days Delivery</span>
                        </h4>
                      )}
                      {service?.basicRevision && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <TfiReload />
                          <span>{service?.basicRevision} Revisions</span>
                        </h4>
                      )}
                    </div>
                  </div>
                )}

                {packageName === "standard" && (
                  <div>
                    <div className="flex items-center justify-between mb-7">
                      <h3 className="text-gray-700 text-lg">
                        {service?.standardName}
                      </h3>
                      <h3 className="text-gray-700 text-lg">
                        ${service?.standardPrice}
                      </h3>
                    </div>
                    <p className="font-semibold text-sm text-gray-600 mb-8">
                      {service?.standardDescription}
                    </p>

                    <div className="flex items-center gap-5 mb-6">
                      {service?.standardDelivery && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <BiTime />
                          <span>{service?.standardDelivery} Days Delivery</span>
                        </h4>
                      )}
                      {service?.standardRevision && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <TfiReload />
                          <span>{service?.standardRevision} Revisions</span>
                        </h4>
                      )}
                    </div>
                  </div>
                )}

                {packageName === "premium" && (
                  <div>
                    <div className="flex items-center justify-between mb-7">
                      <h3 className="text-gray-700 text-lg">
                        {service?.premiumName}
                      </h3>
                      <h3 className="text-gray-700 text-lg">
                        ${service?.premiumPrice}
                      </h3>
                    </div>
                    <p className="font-semibold text-sm text-gray-600 mb-8">
                      {service?.premiumDescription}
                    </p>

                    <div className="flex items-center gap-5 mb-6">
                      {service?.premiumDelivery && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <BiTime />
                          <span>{service?.premiumDelivery} Days Delivery</span>
                        </h4>
                      )}
                      {service?.premiumRevision && (
                        <h4 className="flex items-center gap-1 text-gray-700">
                          <TfiReload />
                          <span>{service?.premiumRevision} Revisions</span>
                        </h4>
                      )}
                    </div>
                  </div>
                )}

                <Link
                  to={`/checkout/${service?._id}?package=${packageName}`}
                  className="text-base text-white py-[10px] block bg-primary hover:bg-primary/70 transition text-center rounded-md font-medium"
                >
                  Order Now
                </Link>
              </div>
              {/* <!-- list end --> */}
            </div>
          </div>
          {/* <!-- event details end --> */}
        </div>
        {/* <!-- event information end --> */}

        {/* reviews */}
        <div className="w-3/6">
          <h3 className="mt-8 text-xl mb-8">Service Reviews</h3>
          {user?.role === "admin" && (
            <div className="mb-8">
              <AddReview />
            </div>
          )}
          <Reviews serviceId={serviceId} />
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
