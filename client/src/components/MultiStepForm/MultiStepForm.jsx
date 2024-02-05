import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interest: "",
    skills: [],
    github: "",
    linkedin: "",
    twitter: "",
    file: null,
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
    // Perform additional actions on form submission
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

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-medium mb-4">Step {step} of 3</h2>
          <div className="flex mb-4">
            <div
              className={`w-1/3 border-r border-gray-400 ${
                step === 1 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(1)}
            >
              Step 1
            </div>
            <div
              className={`w-1/3 border-r border-gray-400 ${
                step === 2 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(2)}
            >
              Step 2
            </div>
            <div
              className={`w-1/3 ${
                step === 3 ? "bg-blue-500 text-white" : "bg-gray-200"
              } p-2 text-center cursor-pointer`}
              onClick={() => setStep(3)}
            >
              Step 3
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

const Step1 = ({ handleChange, formData, onChangeStep }) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Step 1</h3>
      <Field
        handleChange={handleChange}
        formData={formData}
        onChangeStep={onChangeStep}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            selectedInterest === "Web Development and App Development"
              ? "bg-blue-200"
              : "bg-B2D5E8 hover:bg-blue-200"
          }`}
          onClick={() =>
            setSelectedInterest("Web Development and App Development")
          }
        >
          Web Development and App Development
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

const Step2 = ({ handleChange, formData }) => {
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

const Step3 = ({ handleChange, formData, onChangeStep }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setIsFileSelected(true);
    // You can implement your file upload logic here
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
      </div>
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
              ? "bg-blue-500 text-white"
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
