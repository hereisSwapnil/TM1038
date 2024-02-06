import React, { useContext, useEffect, useState } from "react";
import { LineChart } from "../components/LineChart/LineChart";
import Navbar from "../components/Navbar/Navbar";
import { PieChart } from "../components/PieChart/PieChart";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router";
import { Loader } from "../components/Loader/Loader";

export const Analytics = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
      <Navbar showIcons={true} />
      <div className="m-auto flex justify-center items-center flex-col">
        <h1 className="m-[100px]">Accuracy vs Number of Attempts</h1>
        <LineChart />
      </div>
      <div className="m-auto flex justify-center items-center flex-col">
        <h1 className="m-[100px]">Heading Pie Chart</h1>
        <PieChart />
      </div>
    </>
  );
};
