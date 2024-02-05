import React, { useContext, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router";

export const AssessMe = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.dataFilled == false) {
      navigate("/form");
    }
  });

  return (
    <>
      <div>AssessMe</div>
    </>
  );
};
