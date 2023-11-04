import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { ImFacebook } from "react-icons/im";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useUpdateProfilePicMutation } from "../../features/user/userApi";
import useUpdateUser from "../../hooks/useUpdateUser";

const ProfileInfo = ({ userInfo }) => {
  const { user } = useSelector((state) => state.auth || {});

  const [newProfilePic, setNewProfilePic] = useState();
  const { profile, email } = userInfo || {};
  const { firstName, lastName, facebook, instagram, twitter, linkedin } =
    profile || {};

  const { userId } = useParams();

  const updateUser = useUpdateUser();

  useEffect(() => {
    if (profile?.profilePic) {
      setNewProfilePic(
        `${process.env.REACT_APP_SERVER_URL}${profile?.profilePic}`
      );
    }
  }, [profile]);

  // update profile pic
  const [updateProfilePic, { data }] = useUpdateProfilePicMutation();

  // capture profile image funciton
  const captureImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setNewProfilePic(reader.result);

      if (reader.result) {
        updateProfilePic({ userId: userInfo?._id, profilePic: reader.result });
      }
    };
  };

  // update aler
  useEffect(() => {
    if (data?._id) {
      updateUser(data);
      toast.success("Profile Updated Successfully");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  return (
    <div className="bg-white py-10 text-center rounded-md shadow-sm -mt-14">
      <div className="w-32 h-32 rounded-full p-[2px] mx-auto border-2 border-primary relative">
        <img
          className="w-full h-full rounded-full"
          src={newProfilePic || "/img/users/img-13.jpg"}
          alt="user"
        />
        {userId === user?.userId && (
          <>
            <label
              for="profile-pic"
              className="w-10 h-10 rounded-full bg-white border absolute right-0 bottom-0 flex items-center justify-center cursor-pointer"
            >
              <img className="w-4" src="/img/icons/camera.png" alt="camera" />
            </label>
            <input
              onChange={captureImage}
              className="hidden"
              id="profile-pic"
              type="file"
            />
          </>
        )}
      </div>
      <h3 className="text-lg font-bold mt-4">{`${firstName} ${lastName}`}</h3>
      <p className="mt-2">{email}</p>

      {/* orders area start */}
      <div className="flex items-center justify-between text-center w-4/6 mx-auto mt-8">
        <div className="border-r w-full">
          <h4 className="text-lg font-medium">0</h4>
          <p className="text-sm text-black">Accept Orders</p>
        </div>
        <div className="w-full">
          <h4 className="text-lg font-medium">0</h4>
          <p className="text-sm text-black">Active Orders</p>
        </div>
      </div>
      {/* orders area end */}

      {/* social icons start */}
      <div>
        <h3 className="text-base mt-10">Find me on</h3>
        <ul className="flex items-center justify-center gap-3 mt-6">
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
      {/* social icons end */}
    </div>
  );
};

export default ProfileInfo;
