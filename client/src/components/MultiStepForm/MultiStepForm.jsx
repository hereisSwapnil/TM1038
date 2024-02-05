import React, { useState } from "react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-xl">
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
          <Step1 handleChange={handleChange} formData={formData} />
        ) : step === 2 ? (
          <Step2 handleChange={handleChange} formData={formData} />
        ) : (
          <Step3 handleChange={handleChange} formData={formData} />
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
  );
};

const Step1 = ({ handleChange, formData }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Step 1</h3>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-gray-700" htmlFor="name">
        Name
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2"
      />
    </div>
    <div className="mb-4">
      <label className="block font-medium mb-2 text-gray-700" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2"
      />
    </div>
  </div>
);

const Step2 = ({ handleChange, formData }) => {
  const skillsData = [
    { id: 1, label: "JavaScript" },
    { id: 2, label: "React.js" },
    { id: 3, label: "Node.js" },
    { id: 4, label: "CSS" },
    // Add more skills as needed
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

const MultiSelectChips = ({ options, selectedValues, onChange }) => {
  const handleToggle = (value) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((val) => val !== value)
      : [...selectedValues, value];

    onChange(newSelectedValues);
  };

  return (
    <div className="flex flex-wrap">
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

const Step3 = ({ handleChange, formData }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Step 3</h3>
    {/* Add additional form fields for Step 3 as needed */}
    <div className="mb-4">
      <label
        className="block font-medium mb-2 text-gray-700"
        htmlFor="additionalField"
      >
        Additional Field
      </label>
      <input
        type="text"
        id="additionalField"
        name="additionalField"
        value={formData.additionalField}
        onChange={handleChange}
        className="w-full border border-gray-400 p-2"
      />
    </div>
  </div>
);

export default MultiStepForm;
