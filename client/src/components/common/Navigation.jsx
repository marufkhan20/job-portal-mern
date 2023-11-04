/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FiMail } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { userLoggedOut } from "../../features/auth/authSlice";

const Navigation = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth) || {};
  const [profileView, setProfileView] = useState(false);

  const dispatch = useDispatch();

  // logout
  const logout = () => {
    dispatch(userLoggedOut());
  };

  useEffect(() => {
    setProfileView(false);
  }, [pathname]);
  return (
    <section className="bg-white border-b-2 py-5">
      <div
        className={`px-5 md:px-0 ${
          pathname.includes("/admin") ? "w-[98%]" : "md:w-[80%]"
        } mx-auto`}
      >
        <div className="flex justify-between items-center">
          <div className="logo">
            <Link to="/">
              <img className="h-12" src="/img/logo.png" alt="logo" />
            </Link>
          </div>

          {!pathname.includes("/admin") && (
            <div className="hidden md:block">
              <ul className="flex gap-8">
                <li>
                  <a
                    href="#home"
                    className="text-secondary transition hover:text-[#f35a38] text-[13px] font-bold"
                    to="#"
                  >
                    HOME
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-secondary transition hover:text-[#f35a38] text-[13px] font-bold"
                    to="#about"
                  >
                    ABOUT
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-secondary transition hover:text-[#f35a38] text-[13px] font-bold"
                    to="#services"
                  >
                    SERVICES
                  </a>
                </li>
                <li>
                  <a
                    href="#reviews"
                    className="text-secondary transition hover:text-[#f35a38] text-[13px] font-bold"
                    to="#projects"
                  >
                    REVIEWS
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-secondary transition hover:text-[#f35a38] text-[13px] font-bold"
                    to="#contact"
                  >
                    CONTACT
                  </a>
                </li>
              </ul>
            </div>
          )}

          {user?.userId ? (
            <div className="flex items-center gap-2 relative">
              {user?.role === "admin" && (
                <Link to="/admin/inbox">
                  <div className="cursor-pointer py-2 px-3 rounded transition hover:bg-light block">
                    <FiMail className="font-bold text-xl text-gray-600 " />
                  </div>
                </Link>
              )}
              <div
                onClick={() => setProfileView(!profileView)}
                className="w-10 h-10 rounded-full ml-3 p-[2px] border-2 cursor-pointer border-primary"
              >
                <img
                  className="rounded-full h-full w-full"
                  src={
                    user?.profilePic
                      ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                      : "/img/users/img-13.jpg"
                  }
                  alt="user"
                />
              </div>

              {profileView && (
                <div className="absolute top-[180%] right-0 min-w-[250px] text-center z-50">
                  <div className="border shadow-md bg-white py-5 rounded-md">
                    <div className="w-12 h-12 rounded-full p-[2px] border-2 border-primary mx-auto">
                      <img
                        className="rounded-full h-full w-full"
                        src={
                          user?.profilePic
                            ? `${process.env.REACT_APP_SERVER_URL}${user?.profilePic}`
                            : "/img/users/img-13.jpg"
                        }
                        alt="user"
                      />
                    </div>
                    <div className="pb-6 border-b">
                      <h3 className="mt-2">
                        {user?.firstName + " " + user?.lastName}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500 font-semibold">
                        {user?.email}
                      </p>
                    </div>
                    <div className="text-left mt-2">
                      <ul>
                        {user?.role === "admin" && (
                          <li className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer">
                            <Link to="/admin" className="block">
                              Admin Panel
                            </Link>
                          </li>
                        )}
                        <li className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer">
                          <Link
                            to={`/profile/${user?.userId}`}
                            className="block"
                          >
                            My Profile
                          </Link>
                        </li>
                        <li
                          className="py-2 px-5 text-sm font-medium transition hover:bg-light hover:text-primary cursor-pointer"
                          onClick={logout}
                        >
                          Sign out
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link
                className="bg-primary text-white py-[10px] px-7 inline-block uppercase text-[13px] font-semibold mt-4 transition border border-transparent hover:border-light hover:bg-white hover:text-secondary rounded-md"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="bg-primary text-white py-[10px] px-7 inline-block uppercase text-[13px] font-semibold mt-4 transition border border-transparent hover:border-light hover:bg-white hover:text-secondary rounded-md"
                to="/register"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navigation;
