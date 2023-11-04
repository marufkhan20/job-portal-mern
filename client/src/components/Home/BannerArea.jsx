import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const BannerArea = () => {
  const { user } = useSelector((state) => state.auth || {});
  return (
    <section
      className="bg-center text-white"
      style={{ backgroundImage: 'url("/img/bg.jpeg")' }}
      id="home"
    >
      <div className="bg-black/50">
        <div className="px-5 md:px-0 container mx-auto">
          <div className="py-20 flex flex-col lg:flex-row justify-between items-center gap-[150px] min-h-[80vh] z-50">
            <div className="w-full lg:w-3/5 text-center lg:text-left">
              <h4 className="text-lg lg:text-xl">
                Best Digital Marketing provider
              </h4>
              <h2 className="text-4xl sm:text-6xl mt-4 mb-5">
                B2B Lead Generation Expert.
              </h2>
              <p className="text-lg">
                This is Raabib. I am a professional b2b LinkedIn Lead Generation
                & Data Entry Specialist. <br />I am here to provide 100%
                accurate service to my clients & give 100% satisfaction.
              </p>
              <Link
                className="bg-primary text-white py-[14px] px-9 inline-block uppercase text-[13px] font-semibold mt-4 transition hover:bg-white hover:text-secondary rounded-md"
                to="#"
              >
                get details
              </Link>
            </div>
            {!user && (
              <div className="bg-white text-[#0e2b3d] py-[60px] px-9 z-40 relative rounded-xl form w-full lg:w-2/5">
                <h3 className="text-2xl text-center mb-5">Register Here</h3>
                <p className="text-[15px] leading-[26px] mx-auto text-[#0e2b3d] mb-14 w-[70%] text-center">
                  Country man his pressed shewing. No gate dare rose he. Eyes
                  year if miss he as upon
                </p>
                <form>
                  <input
                    className="block w-full border-b border-[#e6e6e6] pb-4 outline-none text-[15px] mb-7"
                    type="text"
                    placeholder="Name"
                  />
                  <input
                    className="block w-full border-b border-[#e6e6e6] pb-4 outline-none text-[15px] mb-7"
                    type="email"
                    placeholder="Email*"
                  />
                  <input
                    className="block w-full border-b border-[#e6e6e6] pb-4 outline-none text-[15px] mb-7"
                    type="password"
                    placeholder="Password*"
                  />
                  <input
                    className="block w-full border border-transparent outline-none text-[15px] bg-primary py-3 text-white font-bold cursor-pointer transition rounded-full hover:bg-white hover:text-[#0e2b3d] hover:border-[#e6e6e6]"
                    type="submit"
                    value="Register"
                  />
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerArea;
