import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router";
import { Loader } from "../components/Loader/Loader";

export const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  if (loading) {
    return <Loader />;
  }

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

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
            animi, explicabo obcaecati eveniet rerum repudiandae alias eaque
            totam dolor facilis.
          </p>
        </div>
      </div>
    </>
  );
};
