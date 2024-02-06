import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../Context/UserContext";
import { Loader } from "../components/Loader/Loader";
import validate from "../common/validation";
import Navbar from "../components/Navbar/Navbar";

const Login = () => {
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleLoginInfo = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
    let errObj = validate[name](value);
    if (name === "password") {
      errObj = validate.loginPassword(value);
    }
    setError((prev) => ({ ...prev, ...errObj }));
  };

  const passwordToggle = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  console.log(loginInfo);

  const handleLogin = async (data) => {
    console.log("Data before axios request:", data);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        data,
        {
          withCredentials: true,
        }
      );

      if (res.data.message === "login success") {
        setUser(res.data.user);
        setError({});
        toast.success("Logged in successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      } else {
        setError({ loginError: res.data.message });
        toast.error("An error occurred!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      <div style={{ marginBottom: "50px" }}></div>
      <main style={{ height: "70vh", display: "flex" }}>
        <div
          style={{
            fontFamily: "ABeeZee",
            width: "100vw",
            overflowX: "hidden",
            margin: "auto",
          }}
        >
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  fontWeight: "bolder",
                  marginTop: "30px",
                }}
              >
                {/* <img
                  src="https://i.postimg.cc/sfGY7Q5S/Screenshot-2024-01-23-at-9-49-57-PM.png"
                  alt=""
                  style={{ width: "260px" }}
                /> */}
              </h1>
              <div
                className="text-transparent bg-clip-text bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-[80px] leading-tight anim"
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  fontWeight: "bolder",
                  marginBottom: "10%",
                  marginTop: "30px",
                  fontFamily: "Quattrocento Sans, sans-serif",
                }}
              >
                Log in to your account
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "0 20%",
                }}
              >
                <div style={{ width: "100%", textAlign: "start" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    <input
                      id="email"
                      type="text"
                      name="email"
                      onChange={handleLoginInfo}
                      value={loginInfo.email}
                      placeholder="Email"
                      required
                      style={{
                        width: "400px",
                        padding: "12px",
                        margin: "5px 0 10px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        border: "2px solid #d8d8d8",
                        outline: "none",
                        boxSizing: "border-box",
                        paddingLeft: "35px",
                        borderColor:
                          error.email && error.emailError ? "red" : "#d8d8d8",
                      }}
                    />
                    <FaEnvelope
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "10px",
                        color: "blue",
                        fontSize: "16px",
                      }}
                    />
                  </div>

                  {error.email && error.emailError && (
                    <p
                      style={{
                        color: "red",
                        textAlign: "center",
                        fontSize: "12px",
                        width: "90%",
                        margin: "auto",
                      }}
                    >
                      {error.emailError}
                    </p>
                  )}
                </div>
                <div style={{ width: "100%", textAlign: "start" }}>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        textAlign: "start",
                      }}
                    >
                      <input
                        id="password"
                        name="password"
                        type={passwordType}
                        onChange={handleLoginInfo}
                        value={loginInfo.password}
                        required
                        placeholder="Password"
                        style={{
                          width: "400px",
                          padding: "12px",
                          margin: "5px 0 10px",
                          borderRadius: "6px",
                          fontSize: "16px",
                          border: "2px solid #d8d8d8",
                          outline: "none",
                          boxSizing: "border-box",
                          paddingLeft: "35px",
                          borderColor:
                            error.password && error.passwordError
                              ? "red"
                              : "#d8d8d8",
                        }}
                      />
                      <FaKey
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: "10px",
                          color: "blue",
                          fontSize: "16px",
                        }}
                      />
                      <div
                        onClick={passwordToggle}
                        style={{
                          position: "absolute",
                          width: "fit-content",
                          top: "30px",
                          right: "4%",
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {passwordType === "password" ? (
                          <FaEyeSlash />
                        ) : (
                          <FaEye />
                        )}
                      </div>
                      {error.password && error.passwordError && (
                        <p
                          style={{
                            color: "red",
                            textAlign: "center",
                            fontSize: "12px",
                            width: "90%",
                            margin: "auto",
                          }}
                        >
                          {error.passwordError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="hover:bg-[#66bb6a]/90 bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-[80px] leading-tight anim"
                  style={{
                    width: "100%",
                    padding: "16px",
                    margin: "7px 0",
                    fontSize: "16px",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    fontFamily: "Quattrocento Sans, sans-serif",
                  }}
                  onClick={() => handleLogin(loginInfo)}
                >
                  Login
                </button>
              </div>
              <div
                style={{ textAlign: "center", marginBottom: "15px" }}
                className="dont-have-account hover:underline"
              >
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "16px",
                    fontFamily: "Quattrocento Sans, sans-serif",
                  }}
                  className="forgot-password"
                >
                  Don't have an account? <b>Sign Up</b>
                </Link>
              </div>
            </div>
            {/* Left side of the login page */}
            <div
              style={{
                backgroundColor: "#ffffff",
                width: "50%",
                margin: "0 100px 0 0",
              }}
            >
              <img className="anim" src="./recruitMe.Ai.png" alt="meeting" />
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-[80px] leading-tight anim"
                style={{
                  fontWeight: "bolder",
                  fontFamily: "Quattrocento Sans, sans-serif",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",
                  }}
                >
                  <div style={{ fontSize: "70px" }}>Smart</div>
                  <div
                    style={{
                      margin: "0 0 0 10px",
                      display: "flex",
                      fontSize: "24.5px",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <span>Assessment</span>
                    <span>Analysis</span>
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Login;
