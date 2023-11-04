import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";
import { useUpdateProfileMutation } from "../../features/user/userApi";
import useUpdateUser from "../../hooks/useUpdateUser";

const EditProfileModal = ({ editable, setEditable, userInfo }) => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [website, setWebsite] = useState();
  const [facebook, setFacebook] = useState();
  const [instagram, setInstagram] = useState();
  const [twitter, setTwitter] = useState();
  const [youtube, setYoutube] = useState();
  const [linkedin, setLinkedin] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zipCode, setZipCode] = useState();
  const [country, setCountry] = useState();

  const updateUser = useUpdateUser();

  const { profile } = userInfo || {};

  useEffect(() => {
    if (profile) {
      setFirstName(profile?.firstName);
      setLastName(profile?.lastName);
      setBio(profile?.bio);
      setWebsite(profile?.website);
      setFacebook(profile?.facebook);
      setInstagram(profile?.instagram);
      setTwitter(profile?.twitter);
      setYoutube(profile?.youtube);
      setLinkedin(profile?.linkedin);
      setAddress(profile?.address);
      setAddress2(profile?.address2);
      setCity(profile?.city);
      setCountry(profile?.country);
      setZipCode(profile?.zipCode);
      setCountry(profile?.country);
      setState(profile?.state);
      setEmail(userInfo?.email);
      setPhone(profile?.phone);
    }
  }, [profile, userInfo]);

  // udpate profile
  const [updateProfile, { data: updatedProfile }] = useUpdateProfileMutation();

  // get update profile
  useEffect(() => {
    if (updatedProfile?._id) {
      updateUser(updatedProfile);
      toast.success(`Profile Update Successfully`);
      setEditable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedProfile, setEditable]);

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // update profile
    updateProfile({
      userId: userInfo?._id,
      data: {
        firstName,
        lastName,
        bio,
        email,
        phone,
        website,
        facebook,
        instagram,
        twitter,
        youtube,
        linkedin,
        address,
        address2,
        city,
        state,
        zipCode,
        country,
      },
    });
  };
  return (
    <div
      className={`bg-black/50 absolute top-0 left-0 right-0 bottom-0 w-full h-fit transition-all duration-500 pb-6 ${
        editable ? "scale-100" : "scale-0"
      }`}
    >
      <div className="w-2/5 mx-auto bg-white mt-5 rounded-md">
        <div className="flex items-center justify-between px-3 py-5 border-b">
          <h3 className="text-base">Edit Details</h3>
          <button
            className="bg-[#F0F0F0] py-2 px-2 rounded-sm cursor-pointer"
            onClick={() => setEditable(false)}
          >
            <AiOutlineClose className="text-xs" />
          </button>
        </div>

        {/* edit form */}
        <div className="py-6 px-5">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="firstName" className="font-bold text-sm">
                  First Name*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="firstName"
                  type="text"
                  placeholder="John"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="font-bold text-sm">
                  Last Name*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="lastName"
                  type="text"
                  required
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="font-bold text-sm">
                Bio
              </label>
              <textarea
                className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3 h-24"
                id="bio"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="email" className="font-bold text-sm">
                  Email*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="email"
                  type="email"
                  disabled
                  placeholder="email"
                  value={email}
                />
              </div>
              <div className="w-full">
                <label htmlFor="phone" className="font-bold text-sm">
                  Phone*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="facebook" className="font-bold text-sm">
                  Facebook*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="facebook"
                  type="url"
                  placeholder="facebook"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="website" className="font-bold text-sm">
                  Website*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="website"
                  type="url"
                  placeholder="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="instagram" className="font-bold text-sm">
                  Instagram*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="instagram"
                  type="url"
                  placeholder="instagram"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="twitter" className="font-bold text-sm">
                  Twitter*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="twitter"
                  type="url"
                  placeholder="twitter"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="linkedin" className="font-bold text-sm">
                  Linkedin*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="linkedin"
                  type="url"
                  placeholder="linkedin"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="youtube" className="font-bold text-sm">
                  Youtube*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="youtube"
                  type="url"
                  placeholder="youtube"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                />
              </div>
            </div>

            <h3 className="text-xl pb-3 border-b">Address</h3>

            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="address1" className="font-bold text-sm">
                  Address 1*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="address1"
                  type="text"
                  placeholder="Address 1"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="address2" className="font-bold text-sm">
                  Address 2*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="address2"
                  type="text"
                  placeholder="Address 2"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="Country" className="font-bold text-sm">
                  Country*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="Country"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="State" className="font-bold text-sm">
                  State*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="State"
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="w-full">
                <label htmlFor="City" className="font-bold text-sm">
                  City*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="City"
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="ZipCode" className="font-bold text-sm">
                  Zip Code*
                </label>
                <input
                  className="block w-full bg-[#F9F9F9] py-[10px] px-3 border rounded-[4px] font-regular text-sm text-[#717171] outline-none focus:ring-1 mt-3"
                  id="ZipCode"
                  type="text"
                  placeholder="Zip Code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <div
                className="flex items-center hover:bg-light px-8 py-2 rounded-[4px] gap-[5px] font-medium transition cursor-pointer border"
                onClick={() => setEditable(false)}
              >
                <span>Cancel</span>
              </div>
              <button
                type="submit"
                className="flex items-center text-white bg-primary px-8 py-2 rounded-[4px] gap-[5px] font-medium transition hover:bg-primary/70 border border-primary"
              >
                <span>Update</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
