import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/Signup";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";
import { AssessMe } from "./pages/AssessMe";
import { Analytics } from "./pages/Analytics";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/form" element={<MultiStepForm />} />
          <Route path="/assess" element={<AssessMe />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
