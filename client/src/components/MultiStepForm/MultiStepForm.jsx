import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./index.css";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { UserContext } from "../../Context/UserContext";
import { useNavigate } from "react-router";
import { Loader } from "../Loader/Loader";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState("Web Developer");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    skills: [],
    github: "",
    linkedin: "",
    twitter: "",
    file: null,
    interest: "", // Add interest field to formData
    userId: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log(user);
    // try {
    // Update formData with the current interest
    const updatedFormData = {
      ...formData,
      interest: interest,
      userId: user.id,
    };

    // Make API request to update user
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/update`,
      updatedFormData
    ); // Adjust the endpoint as per your backend setup

    // If the request is successful, display a toast
    if (response.status === 200) {
      toast.success("User updated successfully!", {
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
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } else {
      toast.error("Failed to update user!", {
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

    console.log("Submitted Data:", updatedFormData);

    // Perform additional actions on form submission
    // } catch (error) {
    //   console.error("Error updating user:", error.message);
    //   toast.error("Failed to update user!", {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: false,
    //     pauseOnHover: false,
    //     draggable: false,
    //     progress: undefined,
    //     theme: "light",
    //     transition: Bounce,
    //   });
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeStep1 = (selectedInterest) => {
    setFormData((prevData) => ({
      ...prevData,
      interest: selectedInterest,
    }));
    handleNext();
  };

  const handleChangeStep3 = (links) => {
    setFormData((prevData) => ({
      ...prevData,
      github: links.github,
      linkedin: links.linkedin,
      twitter: links.twitter,
    }));
    handleNext();
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
      <Navbar showIcons={true} />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md form">
          <h2 className="text-lg font-medium mb-4">Step {step} of 3</h2>
          <div className="flex items-center justify-center mb-4">
            <div
              className={`steps w-1/3 border-r border-gray-400 ${
                step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(1)}
            >
              1
            </div>
            <span className="line" />
            <div
              className={`steps w-1/3 border-r border-gray-400 ${
                step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(2)}
            >
              2
            </div>
            <span className="line" />
            <div
              className={`steps w-1/3 ${
                step === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(3)}
            >
              3
            </div>
          </div>
          {step === 1 ? (
            <Step1
              handleChange={handleChange}
              formData={formData}
              onChangeStep={handleChangeStep1} // <-- Update this line
            />
          ) : step === 2 ? (
            <Step2
              handleChange={handleChange}
              formData={formData}
              onChangeStep={handleChangeStep1}
              interest={interest}
              setInterest={handleChangeStep1}
            />
          ) : (
            <Step3
              handleChange={handleChange}
              formData={formData}
              onChangeStep={handleChangeStep3}
            />
          )}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button
                className="bg-gray-300 px-6 py-1.5 rounded-lg text-gray-700 hover:bg-gray-400"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {step < 3 && (
              <button
                className="bg-blue-500 px-6 py-1.5 rounded-lg text-white hover:bg-blue-600"
                onClick={handleNext}
              >
                Next
              </button>
            )}
            {step === 3 && (
              <button
                className="bg-green-500 px-6 py-1.5 rounded-lg text-white hover:bg-green-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Step1 = ({ handleChange, formData, onChangeStep, setInterest }) => {
  const handleChangeStep1 = (selectedInterest) => {
    // console.log(selectedInterest);
    // setInterest(selectedInterest); // Update interest state
    // onChangeStep(selectedInterest); // Proceed to the next step
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Step 1</h3>
      <Field
        handleChange={handleChange}
        formData={formData}
        onChangeStep={handleChangeStep1}
      />
    </div>
  );
};

function Field({ handleChange, formData, onChangeStep }) {
  const [selectedInterest, setSelectedInterest] = useState("");

  const handleNextStep = () => {
    // Create a shallow copy of the existing formData
    const updatedFormData = { ...formData };

    // Update the interest field with the selected interest
    updatedFormData.interest = selectedInterest;

    // Call the handleChange function to update the form state
    handleChange({ target: { name: "interest", value: selectedInterest } });

    // Proceed to the next step
    onChangeStep(selectedInterest); // <-- Make sure this matches the prop name in Step1
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="mb-4 text-2xl">Select Your Field of Interest</h1>
      <div className="">
        {/* ... (rest of your code remains unchanged) */}
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Programming"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("Programming")}
        >
          Programming
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Data Science and Machine learning"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() =>
            setSelectedInterest("Data Science and Machine learning")
          }
        >
          Data Science and Machine learning
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Web Development"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("Web Development")}
        >
          Web Development
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "App Development"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("App Development")}
        >
          App Development
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Marketing"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("Marketing")}
        >
          Marketing
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Design"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("Design")}
        >
          Design
        </div>
        <div
          className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${
            selectedInterest === "Cyber Security"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() => setSelectedInterest("Cyber Security")}
        >
          Cyber Security
        </div>
      </div>
    </div>
  );
}

const Step2 = ({ handleChange, formData, interest, setInterest }) => {
  const skillsData = [
    { id: 1, label: "JavaScript" },
    { id: 2, label: "React.js" },
    { id: 3, label: "Node.js" },
    { id: 4, label: "CSS" },
  ];

  const handleSkillChange = (selectedSkills) => {
    handleChange({ target: { name: "skills", value: selectedSkills } });
  };

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Step 2</h3>
      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="skills"
        >
          Skills
        </label>
        <MultiSelectChips
          options={skillsData}
          selectedValues={formData.skills || []}
          onChange={handleSkillChange}
        />
      </div>
    </div>
  );
};

// const { BlobServiceClient } = require("@azure/storage-blob");
import { BlobServiceClient } from "@azure/storage-blob";

const Step3 = ({ handleChange, formData, onChangeStep }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
    setFileUploadProgress(0);
    setUploadComplete(false);

    const blobSasUrl =
      "https://hackerhaibhai.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2024-02-06T07:35:29Z&st=2024-02-05T23:35:29Z&spr=https&sig=ezJ3a6%2Fh%2FKI1z3FTDPT%2FLUL%2B2%2BeQOBGRtbFU7UAzYzY%3D";

    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    const containerName = "hackerfiles";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(
      selectedFile.name
    );

    try {
      const response = await blockBlobClient.uploadBrowserData(selectedFile, {
        onProgress: (ev) => {
          const totalBytes = ev.totalBytes || selectedFile.size; // Use selectedFile.size as a fallback
          const percentCompleted = (ev.loadedBytes / totalBytes) * 100;
          setFileUploadProgress(percentCompleted);

          if (percentCompleted === 100) {
            // File upload is complete
            setUploadComplete(true);
          }
        },
      });

      console.log("File uploaded successfully:", response);

      // Handle any additional logic or state updates here
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle the error and update state accordingly
    }
  };

  return (
    <>
      <div className="mb-6 pt-4 cursor-pointer">
        {/* ... (Previous file upload code remains unchanged) */}
      </div>

      {/* New inputs for LinkedIn, GitHub, and Twitter */}
      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="linkedin"
        >
          LinkedIn
        </label>
        <input
          type="text"
          id="linkedin"
          name="linkedin"
          value={formData.linkedin || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="github"
        >
          GitHub
        </label>
        <input
          type="text"
          id="github"
          name="github"
          value={formData.github || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 p-2"
        />
      </div>

      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="twitter"
        >
          Twitter
        </label>
        <input
          type="text"
          id="twitter"
          name="twitter"
          value={formData.twitter || ""}
          onChange={handleChange}
          className="w-full border border-gray-400 p-2"
        />
      </div>
      <div className="mb-4">
        <label
          className="block font-medium mb-2 text-gray-700"
          htmlFor="resume"
        >
          Resume (PDF only)
        </label>
        <input
          type="file"
          accept=".pdf"
          id="resume"
          name="resume"
          onChange={handleFileChange}
          className="w-full border border-gray-400 p-2"
        />
        <button
          onClick={uploadFile}
          className="mt-1 bg-blue-400 px-1 py-1 rounded-lg text-white hover:bg-blue-600 text-xs"
        >
          Upload Resume
        </button>
      </div>
      {/* Progress Bar */}
      {isFileSelected && !uploadComplete && (
        <div className="mt-4">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                  In Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-teal-600">
                  {`${fileUploadProgress.toFixed(2)}%`}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative pt-1">
                {/* <div className="flex mb-2 items-center justify-between">
                  <div className="flex-1 flex">
                    <div
                      className="w-full bg-gray-300 rounded-full"
                      style={{ height: "0.5rem" }}
                    ></div>
                  </div>
                </div> */}
                <div
                  className="flex flex-col"
                  style={{ width: `${fileUploadProgress}%` }}
                >
                  <div
                    className="w-full bg-teal-500 rounded-full"
                    style={{ height: "0.5rem" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkmark Icon */}
      {uploadComplete && uploadComplete && (
        <div className="mt-4">
          <svg
            className="text-green-500 w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          <p className="text-green-500 text-center mt-2">Upload Complete</p>
        </div>
      )}
    </>
  );
};

const MultiSelectChips = ({ options, selectedValues, onChange }) => {
  const handleToggle = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  return (
    <div className="flex flex-wrap">
      {/* ... (rest of your MultiSelectChips component remains unchanged) */}
      {options.map((option) => (
        <div
          key={option.id}
          className={`bg-gray-300 px-4 py-2 rounded-lg mr-2 mb-2 cursor-pointer ${
            selectedValues.includes(option.label)
              ? "bg-blue-500 text-blue-600"
              : ""
          }`}
          onClick={() => handleToggle(option.label)}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default MultiStepForm;
