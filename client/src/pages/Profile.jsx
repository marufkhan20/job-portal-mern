import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AboutTab from "../components/Profile/AboutTab";
import HomeTab from "../components/Profile/HomeTab";
import ProfileInfo from "../components/Profile/ProfileInfo";
import SettingTab from "../components/Profile/SettingTab";
import Tab from "../components/Profile/Tab";
import { useGetUserByIdQuery } from "../features/user/userApi";

const tabs = {
  1: HomeTab,
  2: AboutTab,
  3: SettingTab,
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState(1);
  const TabComponent = tabs[activeTab];

  const { userId } = useParams();

  // get user details
  const { data: userInfo } = useGetUserByIdQuery(userId);
  return (
    <main>
      <header
        className="h-[270px] bg-center"
        style={{ backgroundImage: "url('/img/hero-cover-01.jpg')" }}
      ></header>

      <section className="pb-[60px] bg-[#F5F7F9]">
        <div className="container mx-auto">
          <div className="flex justify-between gap-5">
            <div className="w-[30%]">
              <ProfileInfo userInfo={userInfo} />
            </div>
            <div className="w-[70%]">
              <Tab activeTab={activeTab} tabControl={setActiveTab} />
              <TabComponent userInfo={userInfo} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
