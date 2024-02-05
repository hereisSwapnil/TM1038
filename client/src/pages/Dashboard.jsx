import React, { useRef } from "react";
import Navbar from "../components/Navbar/Navbar";

export const Dashboard = () => {
  const about = useRef(null);
  return (
    <>
      <Navbar />
      <div className="main">
        <div className="details">
          <video autoPlay muted loop>
            <source src="./backdrop1.mp4" type="video/mp4" />
          </video>
          <div className="heroHeading">
            <h1>
              RecruitMe.<span>AI</span>
            </h1>
          </div>
        </div>
      </div>
      <div className="arrowDown">
        <button
          class="btnBottom"
          onClick={() => {
            about.current.scrollIntoView({ behavior: "smooth" });
          }}
          type="button"
        >
          <strong>Get Started</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>

          <div id="glow">
            <div class="circle"></div>
            <div class="circle"></div>
          </div>
        </button>
      </div>
      <div ref={about} id="about">
        <div className="abtHeading">
          <p>OUR MISSION</p>
          <h1>The ultimate method to achieve your goals </h1>
        </div>
      </div>
    </>
  );
};
