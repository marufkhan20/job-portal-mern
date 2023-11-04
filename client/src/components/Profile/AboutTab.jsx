import React, { useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { ImFacebook } from "react-icons/im";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

const AboutTab = ({ userInfo }) => {
  const [editable, setEditable] = useState(false);
  const { user } = useSelector((state) => state.auth || {});
  const { userId } = useParams();

  const {
    firstName,
    lastName,
    bio,
    facebook,
    instagram,
    twitter,
    linkedin,
    address,
    address2,
  } = userInfo?.profile || {};
  return (
    <>
      <div className="bg-white border rounded-md mt-6">
        <div className="flex items-center justify-between px-6 py-2 border-b">
          <h3 className="text-lg font-semibold">About</h3>
          {userId === user?.userId && (
            <button
              className="flex items-center text-white bg-primary px-4 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70"
              onClick={() => setEditable(true)}
            >
              <TbEdit />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="px-7">
          <div className="py-7 border-b">
            <h4 className="text-base font-semibold mb-3">Name</h4>
            <span className="text-lg text-[#717171] font-semibold">
              {`${firstName} ${lastName}`}
            </span>
          </div>
          <div className="py-7 border-b">
            <h4 className="text-base font-semibold mb-3">
              Tell us about yourself and let people know who you are
            </h4>
            <p className="text-[#717171]">{bio}</p>
          </div>
          <div className="py-7 border-b">
            <h4 className="text-base font-semibold mb-3">Find me on</h4>
            <ul className="flex items-center gap-3 mt-3">
              {facebook && (
                <li className="text-xl w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center transition hover:text-white hover:bg-primary cursor-pointer">
                  <Link to={facebook}>
                    <ImFacebook />
                  </Link>
                </li>
              )}

              {instagram && (
                <li className="text-xl w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center transition hover:text-white hover:bg-primary cursor-pointer">
                  <Link to={instagram}>
                    <FiInstagram />
                  </Link>
                </li>
              )}

              {twitter && (
                <li className="text-xl w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center transition hover:text-white hover:bg-primary cursor-pointer">
                  <Link to={twitter}>
                    <BsTwitter />
                  </Link>
                </li>
              )}

              {linkedin && (
                <li className="text-xl w-10 h-10 rounded-full border-2 border-primary text-primary flex items-center justify-center transition hover:text-white hover:bg-primary cursor-pointer">
                  <Link to={linkedin}>
                    <FaLinkedinIn />
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="py-7">
            <h4 className="text-base font-semibold mb-3">Address</h4>
            {address && (
              <p className="text-[#717171]">{`${address && address}, ${
                address2 && address2
              }`}</p>
            )}
          </div>
        </div>
      </div>

      {/* edit profile modal */}
      <EditProfileModal
        userInfo={userInfo}
        editable={editable}
        setEditable={setEditable}
      />
    </>
  );
};

export default AboutTab;
