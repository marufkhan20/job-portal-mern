import React from "react";

const ContactArea = () => {
  return (
    <section id="contact" className="contact-area">
      <img className="contact-bg" src="./img/contact-bg.png" alt="contact" />
      <div className="px-5 md:px-0 container mx-auto">
        <div className="contact-wrapper">
          <div className="contact-form">
            <div className="contact-title">
              <h4>CONTACT US</h4>
              <h2>
                Then book your trip from our <br />
                exclusive offers.
              </h2>
            </div>
            <form action="">
              <input type="text" placeholder="Name" />
              <div className="contact-info">
                <input type="email" placeholder="Email*" />
                <input type="number" placeholder="Phone" />
              </div>
              <textarea
                placeholder="Please describe what you need. *"
                cols="30"
                rows="10"
              ></textarea>
              <input type="submit" value="Send Now" />
            </form>
          </div>
          <div className="contact-details">
            <div className="single-contact">
              <img src="./img/icons/location.png" alt="location" />
              <div>
                <h4>Email</h4>
                <span>info@trustedtool.com</span>
                <span>support@trustedtool.com</span>
              </div>
            </div>
            <div className="single-contact">
              <img src="./img/icons/location.png" alt="location" />
              <div>
                <h4>Whatsapp</h4>
                <span>+1 (951) 330-5839</span>
              </div>
            </div>
            <div className="single-contact">
              <img src="./img/icons/location.png" alt="location" />
              <div>
                <h4>Location</h4>
                <span>Dhaka Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactArea;
