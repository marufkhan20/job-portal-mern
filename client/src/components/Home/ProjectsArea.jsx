import React from "react";
import { Link } from "react-router-dom";
import { useGetAllServicesQuery } from "../../features/service/serviceApi";

const ProjectsArea = () => {
  const { data: services } = useGetAllServicesQuery();
  return (
    <section id="services" className="py-[130px] projects-area">
      <div className="px-5 md:px-0 container mx-auto">
        <div className="section-title">
          <h5>SERVICES</h5>
          <h2>
            Our Recent popular <br />
            awesome services
          </h2>
        </div>

        {/* <!-- projects wrapper start --> */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services?.map((service) => (
            <div class="single-project">
              <img
                src={`${process.env.REACT_APP_SERVER_URL}${service?.serviceImages[0]}`}
                alt="project"
              />
              <div class="project-details">
                <h4 className="font-semibold">${service?.basicPrice}</h4>
                <h3>
                  <Link to={`/services/${service?._id}`}>{service?.title}</Link>
                </h3>
              </div>
              <div class="see-project">
                <span>+</span>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- projects wrapper end --> */}
      </div>
    </section>
  );
};

export default ProjectsArea;
