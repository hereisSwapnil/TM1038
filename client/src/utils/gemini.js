import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyC-SeB-LsJ6WubIJ2fwG-IVizyRShDpLh8");

export async function get100Questions({ interest, skills }) {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Generate a list of technical assessment questions related to the domain - ${interest}, focusing on skills such as ${skills}. Each question should be designed to assess the proficiency of the respondent in the specified skills.

    Here's the format for each question:
    [
      {
      "id": 1,
      "question": "?",
      "options": [],
      "correctAnswer": ""
    },
    {
      "id": 2,
      "question": "?",
      "options": [],
      "correctAnswer": ""
    }
    ]
    Ensure that each question is clear, relevant to the technical domain and skills provided, and has multiple choice options. Let the correct answer be indicated with the correctAnswer field.
    and strickly follow the format.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    console.log(text);
    const json = JSON.parse(text); // Parse the generated content as JSON
    return json;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}
