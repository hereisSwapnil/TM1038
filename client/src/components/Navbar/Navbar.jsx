import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="./recruitMe.Ai.png" alt="logo" />
            </Link>
          </div>

          <ul className="centerConsole">
            <Link to="/">
              <li>Dashboard</li>
            </Link>
            <Link to="/assess">
              <li>Assess Me</li>
            </Link>
            <Link to="/analytics">
              <li>Analytics</li>
            </Link>
          </ul>

          <ul>
            <li>
              <button class="Btn">
                <div class="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div class="text" onClick={handleSignout}>
                  Logout
                </div>
              </button>
            </li>
          </ul>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="navbar">
          <div className="logo">
            <Link to="/">
              <img src="./recruitMe.Ai.png" alt="logo" />
            </Link>
          </div>

          <ul>
            <li>
              <Link to="/login">
                <button class="button">
                  Sign in
                  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                    <path
                      clip-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button class="button">
                  Sign up
                  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                    <path
                      clip-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
};

export default Navbar;
