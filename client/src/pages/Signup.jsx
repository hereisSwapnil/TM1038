import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaKey } from "react-icons/fa";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { Loader } from "../components/Loader/Loader";
import Navbar from "../components/Navbar/Navbar";
import validate from "../common/validation";

const SignUp = () => {
  const [error, setError] = useState({});
  const [passwordType, setPasswordType] = useState("password");
  const [signUpInfo, setSignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUpInfo = (e) => {
    const { name, value } = e.target;
    setSignUpInfo((prev) => ({ ...prev, [name]: value }));
    let errObj = validate[name](value);
    if (name === "password") {
      errObj = validate.loginPassword(value);
    }
    setError((prev) => ({ ...prev, ...errObj }));
  };

  const passwordToggle = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleSignUp = async () => {
    // try {
    console.log(signUpInfo);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/register`,
      signUpInfo,
      {
        withCredentials: true,
      }
    );

    if (res.data.message === "register success") {
      setError({});
      toast.success("Sign up successful! Please login.", {
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
      navigate("/login");
    } else {
      setError({ signUpError: res.data.message });
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
    // } catch (error) {
    //   console.error(error);
    // }
  };

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
                backgroundColor: "#ffffff",
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
              ></h1>
              <div
                style={{
                  fontSize: "30px",
                  textAlign: "center",
                  fontWeight: "bolder",
                  marginBottom: "10%",
                  marginTop: "30px",
                  fontFamily: "Quattrocento Sans, sans-serif",
                }}
              >
                Sign Up to your account
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
                  <label
                    htmlFor="name"
                    style={{ fontFamily: "Quattrocento Sans, sans-serif" }}
                  >
                    Name
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      textAlign: "start",
                    }}
                  >
                    <input
                      id="name"
                      type="text"
                      name="name"
                      onChange={handleSignUpInfo}
                      value={signUpInfo.name}
                      placeholder="Name"
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
                      }}
                    />
                    <FaEnvelope
                      style={{
                        position: "absolute",
                        top: "20px",
                        left: "10px",
                        color: "#66bb6a",
                        fontSize: "16px",
                      }}
                    />
                  </div>
                </div>
                <div style={{ width: "100%", textAlign: "start" }}>
                  <label
                    htmlFor="email"
                    style={{ fontFamily: "Quattrocento Sans, sans-serif" }}
                  >
                    Email
                  </label>
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
                      onChange={handleSignUpInfo}
                      value={signUpInfo.email}
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
                        color: "#66bb6a",
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
                  <label
                    htmlFor="password"
                    style={{ fontFamily: "Quattrocento Sans, sans-serif" }}
                  >
                    Password
                  </label>
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
                        onChange={handleSignUpInfo}
                        value={signUpInfo.password}
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
                          color: "#66bb6a",
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
                  className="hover:bg-[#66bb6a]/90"
                  style={{
                    width: "100%",
                    padding: "16px",
                    margin: "7px 0",
                    fontSize: "16px",
                    backgroundColor: "#66bb6a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginBottom: "10px",
                    fontFamily: "Quattrocento Sans, sans-serif",
                  }}
                  onClick={handleSignUp}
                >
                  Sign Up
                </button>
              </div>
              <div
                style={{ textAlign: "center", marginBottom: "15px" }}
                className="dont-have-account hover:underline"
              >
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "16px",
                    fontFamily: "Quattrocento Sans, sans-serif",
                  }}
                  className="forgot-password"
                >
                  Already have an account? <b>Sign In</b>
                </Link>
              </div>
            </div>
            {/* Left side of the login page */}
            <div style={{ backgroundColor: "#ffffff", width: "50%" }}>
              <img
                className="anim"
                src="https://i.postimg.cc/fLdzKL5K/55-Flat-City6-removebg-preview.png"
                alt="meeting"
              />
              {/* <h1
                style={{
                  textAlign: "center",
                  fontFamily: "Quattrocento Sans, sans-serif",
                  fontSize: "25px",
                }}
                className="left-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
              >
                Smart Gardening, Smarter Living...
              </h1> */}
              <h1
                className="text-transparent bg-clip-text bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-[80px] leading-tight anim"
                style={{
                  fontWeight: "bolder",
                  fontFamily: "Quattrocento Sans, sans-serif",
                  fontSize: "25px",
                  textAlign: "center",
                }}
              >
                Smart Gardening, Smarter Living...
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default SignUp;
