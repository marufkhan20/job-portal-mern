import React from "react";
import BannerArea from "../components/Home/BannerArea";
import CallToActionArea from "../components/Home/CallToActionArea";
import ContactArea from "../components/Home/ContactArea";
import ExperienceArea from "../components/Home/ExperienceArea";
import ProjectsArea from "../components/Home/ProjectsArea";
import ReviewsArea from "../components/Home/ReviewsArea";

const Home = () => {
  return (
    <div>
      <BannerArea />
      <ProjectsArea />
      <CallToActionArea />
      <ExperienceArea />
      <ReviewsArea />
      <ContactArea />
    </div>
  );
};

export default Home;
