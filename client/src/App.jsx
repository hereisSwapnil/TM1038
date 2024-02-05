import { Routes, Route } from "react-router";
import { UserContextProvider } from "./Context/UserContext";
import { Dashboard } from "./pages/Dashboard";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/Signup";
import MultiStepForm from "./components/MultiStepForm/MultiStepForm";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/form" element={<MultiStepForm />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
