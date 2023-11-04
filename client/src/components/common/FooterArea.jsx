import React from "react";
import { Link } from "react-router-dom";

const FooterArea = () => {
  return (
    <footer className="bg-[#0e2258] text-white">
      <div className="px-5 md:px-0 container mx-auto">
        {/* <!-- footer top start --> */}
        <div className="py-[120px] flex flex-col sm:flex-row gap-[60px]">
          <div className="w-full sm:w-2/5">
            <h4 className="capitalize font-semibold mb-8 text-xl">
              About Trusted Tool
            </h4>
            <p className="text-[#ccc] text-[15px] leading-6">
              My Experience Area: Lead Generation, B2B Lead Generation, LinkedIn
              Research, Email list building, Data entry, Prospect Development,
              Email Research, Company Research, Market Research, Data Research,
              Internet Research, Web Research. I am ready to do your job with
              great confidence and always try my level best to produce
              high-quality work for my clients.
            </p>
            <ul className="flex gap-5 mt-10">
              <li>
                <img
                  className="w-4 cursor-pointer opacity-70 transition img-white hover:opacity-100"
                  src="/img/icons/facebook.png"
                  alt="facebook"
                />
              </li>
              <li>
                <img
                  className="w-4 cursor-pointer opacity-70 transition img-white hover:opacity-100"
                  src="/img/icons/twitter.png"
                  alt="facebook"
                />
              </li>
              <li>
                <img
                  className="w-4 cursor-pointer opacity-70 transition img-white hover:opacity-100"
                  src="/img/icons/github.png"
                  alt="facebook"
                />
              </li>
              <li>
                <img
                  className="w-4 cursor-pointer opacity-70 transition img-white hover:opacity-100"
                  src="/img/icons/facebook.png"
                  alt="facebook"
                />
              </li>
              <li>
                <img
                  className="w-4 cursor-pointer opacity-70 transition img-white hover:opacity-100"
                  src="/img/icons/twitter.png"
                  alt="facebook"
                />
              </li>
            </ul>
          </div>
          <div className="w-full sm:w-3/5 grid sm:grid-cols-2 md:grid-cols-3 gap-7">
            <div>
              <h4 className="capitalize font-semibold mb-8 text-xl">
                Services
              </h4>
              <ul>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Linkedin premium Tools
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Lead generation all premium tools
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Social Media Marketing
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Virtual card
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="capitalize font-semibold mb-8 text-xl">
                Services
              </h4>
              <ul>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Gmail ACC Any Country Available
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    RDP & VPS ANY IP ALL Country
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Website Google reviews
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Lead generation Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="capitalize font-semibold mb-8 text-xl">
                Services
              </h4>
              <ul>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Google Voice
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[#ccc] font-medium text-[15px] mb-4 leading-[26px] block"
                    to="#"
                  >
                    Usa Virtual Phone Number
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- footer top end --> */}

        {/* <!-- footer bottom start --> */}
        <div className="py-8 border-t border-white/10 flex items-center justify-between flex-wrap gap-10">
          <p className="text-[#ccc] text-[15px]">
            © Copyright 2023 Trusted Tool
          </p>
          <img className="w-[100px]" src="/img/logo.png" alt="logo" />
          <div className="flex items-center border border-white/20">
            <input
              className="bg-transparent border-none outline-none pl-5 font-regular text-white text-base w-[260px] border-r broder-white/20 h-[50px] placeholder:text-white placeholder:font-regular"
              type="email"
              placeholder="Enter your e-mail"
            />
            <div className="w-[38px] h-[38px] bg-white rounded-md flex justify-center items-center mx-[10px] cursor-pointer">
              <img className="w-5" src="/img/icons/send.png" alt="send" />
            </div>
          </div>
        </div>
        {/* <!-- footer bottom end --> */}
      </div>
    </footer>
  );
};

export default FooterArea;
